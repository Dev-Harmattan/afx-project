'use client';
import { MdOutlineEventAvailable } from 'react-icons/md';

interface AddUserButtonProps {
  handleClick: () => void;
}

const AddEventButton = ({ handleClick }: AddUserButtonProps) => {
  return (
    <div
      onClick={handleClick}
      className="bg-textSoft rounded-full text-center text-bgSoft p-5 hover:bg-slate-400"
    >
      <MdOutlineEventAvailable size={30} />
    </div>
  );
};

export default AddEventButton;
