'use server';

import { db } from '../db';

const combineDateTime = (dateTime: Date, time: string) => {
  const datePart = dateTime.toISOString().split('T')[0];
  const combinedDateTimeString = `${datePart}T${time}:00.000Z`;
  return new Date(combinedDateTimeString);
};

interface EventCreationProps {
  eventName: string;
  agenda: string;
  location: string;
  startDate: Date;
  time: string;
  roomNumber: string;
  lunchTime: string;
  totalSeat: number; // updated to match the new schema
}

export const eventCreationAction = async ({
  agenda,
  eventName,
  location,
  lunchTime,
  roomNumber,
  startDate,
  time,
  totalSeat, // ensure this is a number
}: EventCreationProps) => {
  const event = await db.event.create({
    data: {
      event_name: eventName,
      description: agenda,
      lunch_time: combineDateTime(startDate, lunchTime),
      room_number: roomNumber,
      total_seat: Number(totalSeat), // must be an integer now
      location,
      time: combineDateTime(startDate, time),
      start_date: new Date(startDate),
    },
  });
  return event;
};

export const deleteEventByIdAction = async ({ id }: { id: string }) => {
  await db.event.delete({
    where: { id: id },
  });
};

export const fetchEventByIdAction = async ({ id }: { id: string }) => {
  const event = await db.event.findUnique({
    where: {
      id: id,
    },
  });
  return event; // ensure the function returns the event
};
