import { getServerSession } from 'next-auth';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const ClientNavbar = () => {
  return (
    <div className="flex justify-between items-center p-4 rounded-sm bg-bgSoft w-full mb-10">
      <div className="flex items-center gap-3">
        <Image
          src="/total.jpeg"
          alt="total logo"
          width="50"
          height="50"
          className="rounded-md"
        />
        <div className="font-semibold text-textSoft">Totalenergies</div>
      </div>
      <div className="bg-textSoft py-3 px-2 text-bgSoft rounded">
        <Link href={'/api/auth/signout'}>Signout</Link>
      </div>
    </div>
  );
};

export default ClientNavbar;
