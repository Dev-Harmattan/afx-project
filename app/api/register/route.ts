// pages/api/register.ts

import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { firstName, lastName, email, password } = await req.json();

  try {
    const user = await db.user.create({
      data: {
        first_name: firstName,
        last_name: lastName,
        email,
        password,
        role: 'admin',
        created_at: new Date(),
        updated_at: new Date(),
      },
    });
    return NextResponse.json({
      success: true,
      redirectUrl: '/dashboard/users',
    });
  } catch (error) {
    console.log(['USER REGISTER POST'], error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
