'use server';

import { db } from '../db';

export const postFeedbackAction = async ({
  eventId,
  comment,
  userId,
}: {
  eventId: string;
  comment: string;
  userId: string;
}) => {
  if (!userId || !eventId || !comment) {
    throw new Error('User ID, Event ID, and Comment are required.');
  }
  console.log(eventId, comment, userId);

  const feedback = await db.feedback.create({
    data: {
      user_id: userId,
      event_id: eventId,
      comment: comment,
    },
  });

  console.log('Hey');
};
