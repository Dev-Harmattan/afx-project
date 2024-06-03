'use client';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRef } from 'react';
import { toast } from 'react-toastify';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { postFeedbackAction } from '@/lib/actions/postFeedbackAction';

interface CommentModalProps {
  showModal: boolean;
  handleModalClose: () => void;
  isDisable: boolean;
  handleSubmitForm: (comment: string) => void;
  eventId: string;
  userId: string | undefined;
}

const FormSchema = z.object({
  comment: z.string().min(2, 'Please add your comment.'),
});

type InputType = z.infer<typeof FormSchema>;

const CommentModal = ({
  showModal,
  handleModalClose,
  isDisable,
  handleSubmitForm,
  eventId,
  userId,
}: CommentModalProps) => {
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

  const onSubmit = async (commentData: InputType) => {
    try {
      if (!userId) {
        toast.error('User ID is required');
        return;
      }
      const feedback = await postFeedbackAction({
        userId,
        eventId,
        comment: commentData.comment,
      });
      toast.success('Feedback sent successfully');
    } catch (err) {
      console.log(err);
      toast.error('Error sending feedback');
    } finally {
    }
  };

  return (
    <Dialog open={showModal} onOpenChange={handleModalClose}>
      <DialogContent className="max-w-full md:max-w-[700px] bg-white text-bgSoft">
        <DialogHeader>
          <DialogTitle className="">Comment</DialogTitle>
        </DialogHeader>
        <form
          ref={formRef}
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-5"
        >
          <div className="flex flex-col md:flex-row gap-3">
            <div className="w-full">
              <Textarea
                {...register('comment')}
                placeholder="Comment here..."
                className="bg-textSoft w-full"
              />
              {errors.comment && (
                <div className="text-red-500">{errors.comment.message}</div>
              )}
            </div>
          </div>
        </form>
        <DialogFooter>
          <Button
            disabled={isDisable}
            onClick={() => formRef.current?.requestSubmit()} // Trigger the form submission
          >
            Add Comment
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CommentModal;
