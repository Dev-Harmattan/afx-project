// 'use server';

// import { db } from '../db';
// import generator from 'generate-password';
// import * as bcrypt from 'bcrypt';
// import { compileUserNotificationEmail } from '../emailUtils';
// import { sendMail } from './sendMailAction';
// import { format } from 'date-fns';

// interface userCreationActionProps {
//   firstName: string;
//   lastName: string;
//   email: string;
//   eventId: string;
// }

// export const userCreationAction = async ({
//   email,
//   firstName,
//   lastName,
//   eventId,
// }: userCreationActionProps) => {
//   const event = await db.event.findUnique({
//     where: { id: eventId },
//     include: { attendees: true },
//   });

//   if (!event) throw Error('Event does not exist.');

//   // Check if there are available seats
//   const totalSeats = event.total_seat;
//   if (event.attendees.length >= totalSeats) {
//     throw Error('No seats available');
//   }

//   // Check if the user already exists
//   let user = await db.user.findUnique({
//     where: { email: email },
//   });

//   if (!user) {
//     // Generate password
//     const password = generator.generate({
//       length: 10,
//       numbers: true,
//     });

//     // Hash the password
//     const hashPassword = await bcrypt.hash(password, 10);

//     user = await db.user.create({
//       data: {
//         email,
//         first_name: firstName,
//         last_name: lastName,
//         password: hashPassword,
//       },
//     });

//     // Calculate seat number
//     const seatNumber = event.attendees.length + 1;

//     await db.eventAttendee.create({
//       data: {
//         event_id: eventId,
//         user_id: user.id,
//         seat_number: seatNumber,
//       },
//     });

//     // Prepare email data for new user
//     const data = {
//       userName: `${user.first_name} ${user.last_name}`,
//       userPassword: password,
//       email: email,
//       home_url: process.env.NEXT_PUBLIC_BASE_URL as string,
//       login_url: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/signin`,
//       date: format(new Date(event.start_date), 'dd-MM-yyyy'),
//       location: event.location,
//       eventName: event.event_name,
//       agenda: event.description,
//       startTime: format(event.time, 'hh:mm a'),
//       seatNumber: seatNumber,
//       roomNumber: event.room_number,
//       lunchTime: format(event.lunch_time, 'hh:mm a'),
//     };

//     console.log(data);

//     const body = compileUserNotificationEmail(data);

//     // Send email
//     const emailData = {
//       to: user.email,
//       subject: 'TotalEnergies Event Email Notification Service',
//       body,
//       userName: `${user.first_name} ${user.last_name}`,
//     };
//     await sendMail(emailData);
//   } else {
//     const existingAttendee = await db.eventAttendee.findUnique({
//       where: {
//         event_id_user_id: {
//           event_id: eventId,
//           user_id: user.id,
//         },
//       },
//     });

//     if (!existingAttendee) {
//       const seatNumber = event.attendees.length + 1;

//       await db.eventAttendee.create({
//         data: {
//           event_id: eventId,
//           user_id: user.id,
//           seat_number: seatNumber,
//         },
//       });

//       const data = {
//         userName: `${user.first_name} ${user.last_name}`,
//         email: user.email,
//         userPassword: 'Your existing password',
//         home_url: process.env.NEXT_PUBLIC_BASE_URL as string,
//         login_url: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/signin`,
//         date: format(event.start_date, 'dd-MM-yyyy'),
//         location: event.location,
//         eventName: event.event_name,
//         agenda: event.description,
//         startTime: format(event.time, 'hh:mm a'),
//         seatNumber: seatNumber,
//         roomNumber: event.room_number,
//         lunchTime: event.lunch_time,
//       };

//       const body = compileUserNotificationEmail(data);

//       const emailData = {
//         to: user.email,
//         subject: 'TotalEnergies Event Email Notification Service',
//         body,
//         userName: `${user.first_name} ${user.last_name}`,
//       };
//       await sendMail(emailData);
//     }
//   }

//   return user;
// };

'use server';

import { db } from '../db';
import generator from 'generate-password';
import * as bcrypt from 'bcrypt';
import { compileUserNotificationEmail } from '../emailUtils';
import { sendMail } from './sendMailAction';
import { format } from 'date-fns';

interface userCreationActionProps {
  firstName: string;
  lastName: string;
  email: string;
  eventId: string;
}

export const userCreationAction = async ({
  email,
  firstName,
  lastName,
  eventId,
}: userCreationActionProps) => {
  // Start a transaction
  const result = await db.$transaction(async (transaction) => {
    const event = await transaction.event.findUnique({
      where: { id: eventId },
      include: { attendees: true },
    });

    if (!event) throw Error('Event does not exist.');

    // Check if there are available seats
    const totalSeats = event.total_seat;
    if (event.attendees.length >= totalSeats) {
      throw Error('No seats available');
    }

    // Check if the user already exists
    let user = await transaction.user.findUnique({
      where: { email: email },
    });

    let password;
    let seatNumber;
    if (!user) {
      // Generate password
      password = generator.generate({
        length: 10,
        numbers: true,
      });

      // Hash the password
      const hashPassword = await bcrypt.hash(password, 10);

      user = await transaction.user.create({
        data: {
          email,
          first_name: firstName,
          last_name: lastName,
          password: hashPassword,
        },
      });

      // Calculate seat number
      seatNumber = event.attendees.length + 1;

      await transaction.eventAttendee.create({
        data: {
          event_id: eventId,
          user_id: user.id,
          seat_number: seatNumber,
        },
      });
    } else {
      const existingAttendee = await transaction.eventAttendee.findUnique({
        where: {
          event_id_user_id: {
            event_id: eventId,
            user_id: user.id,
          },
        },
      });

      if (!existingAttendee) {
        seatNumber = event.attendees.length + 1;

        await transaction.eventAttendee.create({
          data: {
            event_id: eventId,
            user_id: user.id,
            seat_number: seatNumber,
          },
        });
      }
    }

    // Prepare email data
    const data = {
      userName: `${user.first_name} ${user.last_name}`,
      userPassword: password || 'Your existing password',
      email: email,
      home_url: process.env.NEXT_PUBLIC_BASE_URL as string,
      login_url: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/signin`,
      date: format(new Date(event.start_date), 'dd-MM-yyyy'),
      location: event.location,
      eventName: event.event_name,
      agenda: event.description,
      startTime: format(event.time, 'hh:mm a'),
      seatNumber: seatNumber || event.attendees.length + 1,
      roomNumber: event.room_number,
      lunchTime: format(event.lunch_time, 'hh:mm a'),
    };

    const body = compileUserNotificationEmail(data);

    // Send email
    const emailData = {
      to: user.email,
      subject: 'TotalEnergies Event Email Notification Service',
      body,
      userName: `${user.first_name} ${user.last_name}`,
    };
    await sendMail(emailData);

    return user;
  });

  return result;
};
