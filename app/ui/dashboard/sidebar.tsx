'use client';
import React from 'react';
import {
  MdDashboard,
  MdHelpCenter,
  MdLogout,
  MdOutlineSettings,
  MdShoppingBag,
  MdSupervisedUserCircle,
} from 'react-icons/md';
import MenuLink from './menuLink';
import Image from 'next/image';
import UserProfile from '@/app/components/userProfile';
import Link from 'next/link';

const menuItems = [
  {
    title: 'Pages',
    list: [
      {
        title: 'Dashboard',
        path: '/dashboard',
        icon: <MdDashboard />,
      },
      // {
      //   title: 'Users',
      //   path: '/dashboard/users',
      //   icon: <MdSupervisedUserCircle />,
      // },
      {
        title: 'Events',
        path: '/dashboard/events',
        icon: <MdShoppingBag />,
      },
    ],
  },
  // {
  // title: 'User',
  // list: [
  //   {
  //     title: 'Settings',
  //     path: '/dashboard/settings',
  //     icon: <MdOutlineSettings />,
  //   },
  //   {
  //     title: 'Help',
  //     path: '/dashboard/help',
  //     icon: <MdHelpCenter />,
  //   },
  // ],
  // },
];

const Sidebar = () => {
  return (
    <div className="sticky top-[40px] h-screen mb-5">
      <UserProfile />
      <ul className="list-none">
        {menuItems.map((cat) => (
          <li key={cat.title}>
            <div className="font-medium text-sm text-textSoft my-3 ">
              {cat.title}
            </div>
            {cat.list.map((item) => (
              <MenuLink
                icon={item.icon}
                path={item.path}
                title={item.title}
                key={item.title}
              />
            ))}
          </li>
        ))}
      </ul>
      <Link
        href={'/api/auth/signout'}
        className="p-2 my-1 flex items-center gap-3 cursor-pointer rounded-none bg-none w-full hover:hover:bg-[#2e374a] hover:rounded-[10px]"
      >
        <MdLogout />
        Logout
      </Link>
    </div>
  );
};

export default Sidebar;
