'use server';

import { User } from '@prisma/client';
import { db } from '../db';
import * as bcrypt from 'bcrypt';

export async function registerUser(
  user: Omit<User, 'role' | 'emailVerified' | 'role' | 'id' | 'image'>
) {
  const result = await db.user.create({
    data: {
      ...user,
      password: await bcrypt.hash(user.password, 10),
    },
  });

  return result;
}
