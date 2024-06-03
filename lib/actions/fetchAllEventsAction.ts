'use server';

import { db } from '../db';

export const fetchAllEvents = async () => {
  const events = await db.event.findMany();
  return events;
};
