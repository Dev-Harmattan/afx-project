'use client';

import { fetchUserEvents } from '@/lib/actions/fetchUserEventAction';
import { useEffect, useState } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { LuServerCrash } from 'react-icons/lu';
import CommentModal from './CommentModal';

interface Event {
  id: string;
  event_name: string;
  location: string;
  room_number: string;
  start_date: Date;
  time: Date;
  description: string | null;
}

interface EventAttendee {
  event: Event;
  seat_number: number; // Include seat number
}

interface UserWithEvents {
  id: string;
  email: string | null;
  password: string;
  emailVerified: Date | null;
  image: string | null;
  first_name: string;
  last_name: string;
  role: string | null;
  created_at: Date;
  updated_at: Date;
  events: EventAttendee[];
}

const UserEvent = ({ userId }: { userId: string }) => {
  const [userWithEvents, setUserWithEvents] = useState<UserWithEvents | null>(
    null
  );
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [eventId, setEventId] = useState<string>('');

  const handleSubmit = (comment: string) => {};

  useEffect(() => {
    (async () => {
      const result = await fetchUserEvents(userId);
      //@ts-ignore
      setUserWithEvents(result);
    })();
  }, [userId]);

  return (
    <>
      <CommentModal
        showModal={openModal}
        isDisable={false}
        handleModalClose={() => setOpenModal(false)}
        handleSubmitForm={handleSubmit}
        eventId={eventId}
        userId={userWithEvents?.id}
      />
      <div className="w-full p-4 md:w-[90%] lg:w-[70%] xl:w-[60%] mx-auto rounded-md">
        <div className="capitalize text-lg md:text-xl lg:text-2xl text-center self-center font-bold text-textSoft mb-1">
          You are welcome
        </div>
        <p className="text-sm md:text-base lg:text-lg text-textSoft text-center mb-10">
          You can click your preference event to add feedback
        </p>

        {userWithEvents === null && (
          <div className="flex flex-col flex-1 justify-center items-center">
            <AiOutlineLoading3Quarters className="h-7 w-7 text-zinc-500 animate-spin my-4" />
            <p className="text-xs text-textSoft">Loading messages...</p>
          </div>
        )}
        {userWithEvents?.events.length === 0 && (
          <div className="flex flex-col flex-1 justify-center items-center">
            <LuServerCrash className="h-7 w-7 text-textSoft my-4" />
            <p className="text-xs text-textSoft">Sorry! No Comment</p>
          </div>
        )}
        <div className="flex flex-col lg:flex-row lg:flex-wrap gap-4">
          {userWithEvents?.events.map((item, index) => (
            <div
              key={index}
              className="flex flex-col justify-evenly bg-bgSoft p-3 rounded cursor-pointer w-full lg:w-1/3"
              onClick={() => {
                setOpenModal(true);
                setEventId(item.event.id);
              }}
            >
              <div className="text-textSoft font-semibold">
                {item.event.event_name}
              </div>
              <div className="text-textSoft font-semibold">
                {item.event.location}
              </div>
              <div className="text-textSoft font-semibold">
                {item.event.room_number}
              </div>
              <div className="text-textSoft font-semibold">
                {new Date(item.event.start_date).toLocaleDateString()}
              </div>
              <div className="text-textSoft font-semibold">
                {new Date(item.event.time).toLocaleTimeString()}
              </div>
              <div className="text-textSoft font-semibold">
                {item.event.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default UserEvent;
