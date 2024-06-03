'use client';
import { HiUserAdd } from 'react-icons/hi';

interface AddUserButtonProps {
  handleClick: () => void;
}

const AddUserButton = ({ handleClick }: AddUserButtonProps) => {
  return (
    <div
      onClick={handleClick}
      className="bg-textSoft rounded-full text-center text-bgSoft p-5 hover:bg-slate-400"
    >
      <HiUserAdd size={30} />
    </div>
  );
};

export default AddUserButton;
