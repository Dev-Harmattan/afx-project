'use client';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../../../components/ui/dialog';
import { Input } from '../../../components/ui/input';
import { Button } from '../../../components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRef } from 'react';
import { toast } from 'react-toastify';
import { eventCreationAction } from '@/lib/actions/eventCreationAction';

interface AddUserModalProps {
  showModal: boolean;
  handleModalClose: () => void;
  content: string;
}

const FormSchema = z.object({
  eventName: z.string().min(4, 'Please enter a valid event name.'),
  agenda: z.string().min(4, 'Please enter agenda for the event.'),
  location: z.string().min(4, 'Please enter address event.'),
  roomNumber: z.string().min(1, 'Please enter a valid room number.'),
  totalSeat: z.string().min(1, 'Please enter a valid seat number.'),
  eventDate: z.string().refine((date) => date != null, {
    message: 'Please enter a valid date.',
    path: ['eventDate'],
  }),
  time: z.string().refine((time) => time !== '', {
    message: 'Please enter a valid event time.',
    path: ['breakTime'],
  }),
  lunchTime: z.string().refine((time) => time, {
    message: 'Please enter a valid lunch time.',
    path: ['lunchTime'],
  }),
});

type InputType = z.infer<typeof FormSchema>;

const AddEventModal = ({
  showModal,
  handleModalClose,
  content,
}: AddUserModalProps) => {
  const formRef = useRef<HTMLFormElement>(null);
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<InputType>({
    resolver: zodResolver(FormSchema),
  });

  const modalCloseHandler = () => {
    handleModalClose();
    reset();
  };

  const saveEvent = async (eventData: InputType) => {
    try {
      const {
        agenda,
        eventName,
        location,
        lunchTime,
        roomNumber,
        eventDate,
        totalSeat,
        time,
      } = eventData;
      const event = await eventCreationAction({
        agenda,
        eventName,
        location,
        roomNumber,
        totalSeat,
        startDate: new Date(eventDate),
        time,
        lunchTime,
      });
      toast.success('Event created successfully.');
      modalCloseHandler();
      window.location.reload();
    } catch (error) {
      toast.error('Something went wrong while saving the event');
    }
  };

  return (
    <Dialog open={showModal} onOpenChange={modalCloseHandler}>
      <DialogContent className="max-w-[500px] md:max-w-[700px] bg-white text-bgSoft">
        <DialogHeader>
          <DialogTitle className="">{content}</DialogTitle>
        </DialogHeader>
        <form
          ref={formRef}
          onSubmit={handleSubmit(saveEvent)}
          className="flex flex-col gap-5"
        >
          <div className="flex flex-col md:flex-row md:justify-around gap-3">
            <div className="flex-1">
              <label className="text-bgSoft">Event Name</label>
              <Input
                placeholder="Event name"
                type="text"
                className="bg-textSoft my-1"
                {...register('eventName')}
              />
              {errors.eventName && (
                <div className="text-red-500">{errors.eventName.message}</div>
              )}
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:justify-around gap-3">
            <div className="flex-1">
              <label className="text-bgSoft">Meeting Agenda</label>
              <Textarea
                placeholder="Meeting Agenda"
                className="bg-textSoft my-1"
                {...register('agenda')}
              />
              {errors.agenda && (
                <div className="text-red-500">{errors.agenda.message}</div>
              )}
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:justify-around gap-3">
            <div className="flex-1">
              <label className="text-bgSoft">Address / Location</label>
              <Input
                placeholder="Location"
                type="text"
                className="bg-textSoft my-1"
                {...register('location')}
              />
              {errors.location && (
                <div className="text-red-500">{errors.location.message}</div>
              )}
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:justify-around gap-3">
            <div className="flex-1">
              <label className="text-bgSoft">Room Number</label>
              <Input
                placeholder="Room number"
                type="number"
                className="bg-textSoft my-1"
                {...register('roomNumber')}
              />
              {errors.roomNumber && (
                <div className="text-red-500">{errors.roomNumber.message}</div>
              )}
            </div>
            <div className="flex-1">
              <label className="text-bgSoft">Total Event Seat</label>
              <Input
                placeholder="Total Seat"
                type="text"
                className="bg-textSoft my-1"
                {...register('totalSeat')}
              />
              {errors.totalSeat && (
                <div className="text-red-500">{errors.totalSeat.message}</div>
              )}
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:justify-around gap-3">
            <div className="flex-1">
              <label className="text-">Event date</label>
              <Input
                placeholder="Date"
                type="Date"
                className="bg-textSoft my-1"
                {...register('eventDate')}
              />
              {errors.eventDate && (
                <div className="text-red-500">{errors.eventDate.message}</div>
              )}
            </div>
            <div className="flex-1">
              <label className="text-bgSoft">Break time</label>
              <Input
                placeholder="Event time"
                type="time"
                className="bg-textSoft my-1"
                {...register('time')}
              />
              {errors.time && (
                <div className="text-red-500">{errors.time.message}</div>
              )}
            </div>
            <div className="flex-1">
              <label className="text-bgSoft">Lunch time</label>
              <Input
                placeholder="Lunch time"
                type="time"
                className="bg-textSoft my-1"
                {...register('lunchTime')}
              />
              {errors.lunchTime && (
                <div className="text-red-500">{errors.lunchTime.message}</div>
              )}
            </div>
          </div>
        </form>
        <DialogFooter className="mt-5">
          <Button
            onClick={() => formRef?.current?.requestSubmit()}
            type="submit"
          >
            Add Event
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default AddEventModal;
