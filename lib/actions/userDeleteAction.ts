'use server';

import { db } from '../db';

export const userDeleteAction = async (userId: string) => {
  const deletedUser = await db.user.delete({
    where: { id: userId },
  });
  return deletedUser;
};
