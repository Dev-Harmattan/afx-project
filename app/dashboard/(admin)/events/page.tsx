import EventCard from '@/app/components/EvenCard';
import Card from '@/app/components/card';
import EventTable from '@/app/components/events/table';
import { fetchAllEvents } from '@/lib/actions/fetchAllEventsAction';
import React from 'react';

const EventPage = async () => {
  const events = await fetchAllEvents();
  return (
    <div>
      <div className="grid grid-cols-1">
        <EventCard eventsData={events} />
      </div>
      <div className="events">
        <EventTable eventsData={events} />
      </div>
    </div>
  );
};

export default EventPage;
