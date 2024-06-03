import { fetchUserFeedbackAction } from '@/lib/actions/feedbackActions';
import { useInfiniteQuery } from '@tanstack/react-query';

export const useFeedbackQuery = ({ eventId }: { eventId: string }) => {
  const fetchFeedback = async ({
    pageParam = null,
  }: {
    pageParam?: string | null;
  }) => {
    const cursor = pageParam;
    const feedback = await fetchUserFeedbackAction({ cursor, eventId });
    return feedback;
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    error,
  } = useInfiniteQuery({
    queryKey: ['feedback', eventId],
    queryFn: fetchFeedback,
    getNextPageParam: (lastPage) => lastPage?.cursorPointer,
    initialPageParam: null,
  });

  return {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    error,
  };
};
