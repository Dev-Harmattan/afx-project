'use client';
import { Event } from '@prisma/client';
import { format } from 'date-fns';
import React from 'react';
import { FcAlarmClock, FcCalendar } from 'react-icons/fc';

interface EventAttendee {
  id: string;
  event_id: string;
  user_id: string;
  seat_number: number;
}

interface EventDetails {
  id: string;
  event_name: string;
  start_date: Date;
  time: Date;
  location: string;
  room_number: string;
  total_seat: number;
  lunch_time: Date;
  description: string;
  created_at: Date;
  updated_at: Date;
  attendees: EventAttendee[];
  totalAttendees: number;
}

const EventDetailView = ({
  eventDetails,
}: {
  eventDetails: EventDetails | undefined;
}) => {
  return (
    <>
      <h1 className="font-bold text-xl italic my-2 text-center">
        {eventDetails?.event_name}
      </h1>
      <div className="w-full md:w-[800px] bg-bgSoft md:mx-auto p-5 rounded-md">
        <h2 className="font-bold text-xl italic text-center">Agenda</h2>
        <div className="text-center text-textSoft">
          {eventDetails?.description}
        </div>
        <div className="flex items-center justify-center gap-10 mt-6">
          <div>
            <FcCalendar size={50} />
            <div className="text-center">
              <div className="text-textSoft ">
                {format(new Date(eventDetails?.start_date as Date), 'EEE MMM')}
              </div>
              <div className="text-textSoft">
                {format(new Date(eventDetails?.start_date as Date), 'yyyy')}
              </div>
            </div>
          </div>
          <div className="items-center text-center">
            <FcAlarmClock size={50} />
            <div className="text-textSoft ">
              {format(new Date(eventDetails?.time as Date), 'HH:mm a')}
            </div>
          </div>
        </div>
        <h2 className="font-bold italic mt-2">Other Details</h2>
        <div className="grid grid-cols-1 w-full p-2 gap-1">
          <div>
            <span className="text-lg mr-3 text-textSoft font-semibold">
              Location:
            </span>
            <span className="text-textSoft">{eventDetails?.location}</span>
          </div>
          <div>
            <span className="text-lg mr-3 text-textSoft font-semibold">
              Total Attendees Registered:
            </span>
            <span className="text-textSoft">
              {eventDetails?.totalAttendees}
            </span>
          </div>
          <div>
            <span className="text-lg mr-3 text-textSoft font-semibold">
              Lunch Time:
            </span>
            <span className="text-textSoft text-sm">
              {' '}
              {format(new Date(eventDetails?.lunch_time as Date), 'HH:mm a')}
            </span>
          </div>
          <div>
            <span className="text-lg mr-3 text-textSoft font-semibold">
              Room Number:
            </span>
            <span className="text-textSoft text-sm">
              {' '}
              {eventDetails?.room_number}
            </span>
          </div>
          <div>
            <span className="text-lg mr-3 text-textSoft font-semibold">
              Total Seat:
            </span>
            <span className="text-textSoft text-sm">
              {' '}
              {eventDetails?.total_seat}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventDetailView;
