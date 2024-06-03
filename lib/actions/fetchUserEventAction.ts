'use server';

import { db } from '../db';

export const fetchUserEvents = async (userId: string) => {
  const user = await db.user.findUnique({
    where: { id: userId },
    include: {
      events: {
        select: {
          event: {
            select: {
              event_name: true,
              location: true,
              room_number: true,
              start_date: true,
              time: true,
              description: true,
              id: true,
            },
          },
        },
      },
    },
  });

  return user;
};
