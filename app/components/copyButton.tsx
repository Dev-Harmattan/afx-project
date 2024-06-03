'use client';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/app/ui/tooltip';
import { toast } from 'react-toastify';

interface CopyButtonProps {
  value: string | number;
  originalValue: string | number;
}

const CopyButton = ({ value, originalValue }: CopyButtonProps) => {
  const handleCopy = () => {
    toast.success(`Copied ${originalValue}`);
    navigator.clipboard.writeText(originalValue.toString());
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger onClick={handleCopy}>{value}</TooltipTrigger>
        <TooltipContent className="bg-slate-400 px-2 py-1 text-center rounded-sm font-normal text-bgSoft cursor-pointer">
          <p>Copy</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default CopyButton;
