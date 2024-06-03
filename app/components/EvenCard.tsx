'use client';
import { fetchAllUsers } from '@/lib/actions/userActions';
import { User, Event } from '@prisma/client';
import React, { useEffect, useState } from 'react';
import { MdSupervisedUserCircle } from 'react-icons/md';
import { toast } from 'react-toastify';

interface CardProps {
  eventsData: Event | any;
}

const EventCard = ({ eventsData }: CardProps) => {
  return (
    <div className="bg-bgSoft flex justify-between p-5 hover:bg-[#2e374a] rounded-md cursor-pointer m-3">
      <div className="flex flex-col justify-center gap-3">
        <MdSupervisedUserCircle />
        <div>
          <span className="text-lime-500">100%</span> Account of total events
        </div>
      </div>
      <div className="flex flex-col justify-center gap-3">
        <div>Total Event</div>
        <div className="bg-textSoft text-bgOriginal text-center p-2 rounded-md font-semibold">
          {eventsData?.length ? eventsData.length : 0}
        </div>
      </div>
    </div>
  );
};
export default EventCard;
