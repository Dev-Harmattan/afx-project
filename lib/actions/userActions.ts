'use server';

import { db } from '../db';

export const fetchAllUsers = async () => {
  const users = await db.user.findMany();
  return users;
};
