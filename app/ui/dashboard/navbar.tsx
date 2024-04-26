'use client';
import Image from 'next/image';
import React from 'react';
import { MdSearch } from 'react-icons/md';

const Navbar = () => {
  return (
    <div className="flex justify-between items-center p-4 rounded-sm bg-[#182237] w-full">
      <div className="flex items-center gap-3">
        <Image
          src="/total.jpeg"
          alt="total logo"
          width="50"
          height="50"
          className="rounded-md"
        />
        <div className="font-semibold text-[#b7bac1]">Totalenergies</div>
      </div>
      <div className="flex items-center gap-2 bg-[#2e374a] p-2 rounded-md">
        <MdSearch />
        <input
          className="bg-transparent border-none focus:outline-none text-white"
          type="text"
          placeholder="Search...."
        />
      </div>
    </div>
  );
};

export default Navbar;
