'use client';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
} from '@/components/ui/dialog';

interface ConfirmDeleteUserProps {
  confirm: () => void;
  isOpen: boolean;
  handleClose: () => void;
  content: string;
}

const ConfirmDelete = ({
  confirm,
  isOpen,
  handleClose,
  content,
}: ConfirmDeleteUserProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={handleClose.bind(null)}>
      <DialogContent onClick={handleClose} className="sm:max-w-md text-bgSoft">
        <DialogHeader>
          <DialogDescription className="text-lg">{content}</DialogDescription>
        </DialogHeader>
        <DialogFooter className="">
          <Button onClick={confirm}>Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmDelete;
