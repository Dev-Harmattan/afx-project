import { AiOutlineLoading3Quarters } from 'react-icons/ai';

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="flex flex-col flex-1 justify-center items-center mt-20">
      <AiOutlineLoading3Quarters className="h-7 w-7 text-zinc-500 animate-spin my-4" />
      <p className="text-xs text-textSoft">Loading messages...</p>
    </div>
  );
}
