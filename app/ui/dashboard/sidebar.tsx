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

const menuItems = [
  {
    title: 'Pages',
    list: [
      {
        title: 'Dashboard',
        path: '/dashboard',
        icon: <MdDashboard />,
      },
      {
        title: 'Users',
        path: '/dashboard/users',
        icon: <MdSupervisedUserCircle />,
      },
      {
        title: 'Events',
        path: '/dashboard/events',
        icon: <MdShoppingBag />,
      },
    ],
  },
  {
    title: 'User',
    list: [
      {
        title: 'Settings',
        path: '/dashboard/settings',
        icon: <MdOutlineSettings />,
      },
      {
        title: 'Help',
        path: '/dashboard/help',
        icon: <MdHelpCenter />,
      },
    ],
  },
];

const Sidebar = () => {
  return (
    <div className="sticky top-3 mb-5">
      <div className="flex items-center gap-5">
        <Image
          className="rounded-full object-cover"
          src="/avatar.webp"
          alt=""
          height="50"
          width="50"
        />
        <div className="flex flex-col">
          <span className="font-medium">Afeez Adeyemo</span>
          <span className="text-[#b7bac1] text-sm">Admin</span>
        </div>
      </div>
      <ul className="list-none">
        {menuItems.map((cat) => (
          <li key={cat.title}>
            <div className="font-medium text-sm text-[#b7bac1] my-3 ">
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
      <button className="p-2 my-1 flex items-center gap-3 cursor-pointer rounded-none bg-none w-full hover:hover:bg-[#2e374a] hover:rounded-[10px]">
        <MdLogout />
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
