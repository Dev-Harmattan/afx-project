'use server';
import { db } from '../db';

export const fetchUserFeedbackAction = async ({
  cursor,
  eventId,
}: {
  cursor?: string | null;
  eventId: string;
}) => {
  const FEEDBACK_BATCH = 10;
  console.log(cursor, eventId);

  if (!eventId) throw new Error('Event id is missing');

  const skipCount = cursor ? 1 : 0;

  const feedbacks = await db.feedback.findMany({
    take: FEEDBACK_BATCH,
    skip: skipCount,
    cursor: cursor ? { id: cursor } : undefined,
    where: {
      event_id: eventId,
    },
    include: {
      attendee: {
        select: {
          first_name: true,
          last_name: true,
        },
      },
    },
    orderBy: {
      created_at: 'desc',
    },
  });

  const cursorPointer =
    feedbacks.length === FEEDBACK_BATCH
      ? feedbacks[FEEDBACK_BATCH - 1].id
      : null;

  return {
    items: feedbacks,
    cursorPointer,
  };
};
