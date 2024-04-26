'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface MenuLinkProps {
  title: string;
  path: string;
  icon: React.ReactElement;
}

const MenuLink = ({ title, icon, path }: MenuLinkProps) => {
  const pathname = usePathname();
  return (
    <Link
      className={`flex gap-2 p-2 items-center hover:bg-[#2e374a] my-3 rounded-[10px] ${
        pathname === path ? 'bg-[#2e374a]' : ''
      }`}
      href={path}
    >
      {icon}
      {title}
    </Link>
  );
};

export default MenuLink;
