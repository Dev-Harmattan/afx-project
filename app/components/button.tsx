import React from 'react';

interface ButtonProps {
  title: string;
  disabled: boolean;
  handleClick: () => void;
}

const Button = ({ title, disabled, handleClick }: ButtonProps) => {
  return (
    <button
      disabled={disabled}
      onClick={handleClick}
      className="border-none rounded-md bg-textSoft text-bgSoft font-medium px-3 py-2 mr-3 cursor-pointer hover:bg-slate-400 w-32"
    >
      {title}
    </button>
  );
};

export default Button;
