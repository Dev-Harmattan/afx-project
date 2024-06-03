'use client';
import { useFeedbackQuery } from '@/hooks/useFeedbackQuery';
import React, { ElementRef, Fragment, useRef } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { LuServerCrash } from 'react-icons/lu';

const CommentView = ({ eventId }: { eventId: string }) => {
  const chatRef = useRef<ElementRef<'div'>>(null);
  const bottomRef = useRef<ElementRef<'div'>>(null);

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useFeedbackQuery({ eventId });
  console.log(status, data, error);

  if (status === 'pending') {
    return (
      <div className="flex flex-col flex-1 justify-center items-center">
        <AiOutlineLoading3Quarters className="h-7 w-7 text-zinc-500 animate-spin my-4" />
        <p className="text-xs text-textSoft">Loading messages...</p>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="flex flex-col flex-1 justify-center items-center">
        <LuServerCrash className="h-7 w-7 text-textSoft my-4" />
        <p className="text-xs text-textSoft">Something went wrong!</p>
      </div>
    );
  }

  return (
    <div ref={chatRef} className="flex flex-col py-4 overflow-y-auto">
      {!hasNextPage && <div className="flex-1" />}
      {hasNextPage && (
        <div className="flex justify-center">
          {isFetchingNextPage ? (
            <AiOutlineLoading3Quarters className="h-6 w-6 text-textSoft animate-spin my-4" />
          ) : (
            <button
              onClick={() => fetchNextPage()}
              className="text-textSoft hover:text-zinc-500 transition"
            >
              Load previous messages
            </button>
          )}
        </div>
      )}
      <div className="flex flex-col-reverse mt-auto w-full">
        {data?.pages?.map((page, i) => (
          <Fragment key={i}>
            {page.items.map((message) => (
              <div key={message.id} className="mt-1 border-b border-bgSoft">
                <div className="italic font-bold">{`${message.attendee.first_name} ${message.attendee.last_name}`}</div>
                <div className="text-left text-sm">{message.comment}</div>
              </div>
            ))}
          </Fragment>
        ))}
      </div>
      <div ref={bottomRef} />
    </div>
  );
};

export default CommentView;
