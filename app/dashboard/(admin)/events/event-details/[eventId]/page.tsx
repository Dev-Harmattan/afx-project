import CommentView from '@/app/components/events/commentView';
import EventDetailView from '@/app/components/events/eventDetailView';
import { db } from '@/lib/db';
import { format } from 'date-fns';
import { FcCalendar } from 'react-icons/fc';
import { FcAlarmClock } from 'react-icons/fc';

interface Details {
  date: string;
  breakTime: string;
  id: string;
  agenda: string;
  roomNumber: number;
}

type Attendee = {
  id: string;
  event_id: string;
  user_id: string;
  seat_number: number;
};

type EventDetails = {
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
  attendees: Attendee[];
  totalAttendees: number;
};

const EventDetails = async ({ params }: { params: { eventId: string } }) => {
  const fetchEventDetails = async () => {
    const eventDetail = await db.event.findUnique({
      where: {
        id: params?.eventId,
      },
      include: {
        attendees: true,
      },
    });

    const totalAttendees = eventDetail!.attendees.length || 0;

    const eventWithAttendeeCount = {
      ...eventDetail,
      totalAttendees: totalAttendees,
    };

    return eventWithAttendeeCount;
  };
  //@ts-ignore
  const eventDetails: EventDetails = await fetchEventDetails();

  return (
    <div className="p-5">
      <EventDetailView eventDetails={eventDetails} />
      <div className="w-full md:w-[800px] md:mx-auto p-5 rounded-md">
        <CommentView eventId={eventDetails!.id} />
      </div>
    </div>
  );
};

export default EventDetails;
