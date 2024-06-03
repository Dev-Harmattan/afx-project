'use client';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../../../components/ui/dialog';
import { Label } from '../../../components/ui/label';
import { Input } from '../../../components/ui/input';
import { Button } from '../../../components/ui/button';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRef } from 'react';
import { userCreationAction } from '@/lib/actions/userCreationAction';
import { toast } from 'react-toastify';

interface AddUserModalProps {
  showModal: boolean;
  handleModalClose: () => void;
  isDisable: boolean;
}

const FormSchema = z.object({
  firstName: z
    .string()
    .min(2, 'First name must be at least 2 characters.')
    .max(45, 'First must less than 45 characters.')
    .regex(new RegExp('^[a-zA-Z]+$')),
  lastName: z
    .string()
    .min(2, 'Last name must be at least 2 characters.')
    .max(45, 'Last must less than 45 characters.')
    .regex(new RegExp('^[a-zA-Z]+$')),
  email: z.string().email('Please enter a valid email address.'),
  eventId: z.string().uuid('Please enter a valid event id.'),
});

type InputType = z.infer<typeof FormSchema>;

const AddUserModal = ({
  showModal,
  handleModalClose,
  isDisable,
}: AddUserModalProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InputType>({
    resolver: zodResolver(FormSchema),
  });

  const formRef = useRef<HTMLFormElement>(null);

  const closeResetHandler = () => {
    reset();
    handleModalClose();
  };

  const onSubmit = async (userData: InputType) => {
    try {
      await userCreationAction(userData);
      toast.success('Event created successfully.');
      closeResetHandler();
      window.location.reload();
    } catch (error) {
      toast.error('Something went wrong while saving the event');
    }
  };

  return (
    <Dialog open={showModal} onOpenChange={handleModalClose}>
      <DialogContent className="max-w-full md:max-w-[700px] bg-white text-bgSoft">
        <DialogHeader>
          <DialogTitle className="">Add User</DialogTitle>
        </DialogHeader>
        <form
          ref={formRef}
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-5"
        >
          <div className="flex flex-col md:flex-row gap-3">
            <div className="w-full md:w-1/2">
              <Input
                {...register('firstName')}
                placeholder="First Name"
                type="text"
                className="bg-textSoft w-full"
              />
              {errors.firstName && (
                <div className="text-red-500">{errors.firstName.message}</div>
              )}
            </div>
            <div className="w-full md:w-1/2">
              <Input
                {...register('lastName')}
                placeholder="Last Name"
                type="text"
                className="bg-textSoft w-full"
              />
              {errors.lastName && (
                <div className="text-red-500">{errors.lastName.message}</div>
              )}
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-3">
            <div className="w-full md:w-1/2">
              <Input
                {...register('email')}
                placeholder="Email"
                type="email"
                className="bg-textSoft w-full"
              />
              {errors.email && (
                <div className="text-red-500">{errors.email.message}</div>
              )}
            </div>
            <div className="w-full md:w-1/2">
              <Input
                {...register('eventId')}
                placeholder="Event ID"
                type="text"
                className="bg-textSoft w-full"
              />
              {errors.eventId && (
                <div className="text-red-500">{errors.eventId.message}</div>
              )}
            </div>
          </div>
        </form>
        <DialogFooter>
          <Button
            disabled={isDisable}
            onClick={() => formRef.current?.requestSubmit()} // Trigger the form submission
          >
            Add User
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddUserModal;
