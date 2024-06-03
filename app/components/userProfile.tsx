'use client';
import Image from 'next/image';
import React from 'react';
import { useSession } from 'next-auth/react';

const UserProfile = () => {
  const { data: session, status } = useSession();

  if (!session) return null;

  return (
    <div className="flex items-center gap-5">
      <Image
        className="rounded-full object-cover"
        src="/avatar.webp"
        alt=""
        height="50"
        width="50"
      />
      <div className="flex flex-col">
        <span className="font-medium">
          {session?.user.first_name + ' ' + session?.user.last_name}
        </span>
        <span className="text-textSoft text-sm">{session?.user.role}</span>
      </div>
    </div>
  );
};

export default UserProfile;
