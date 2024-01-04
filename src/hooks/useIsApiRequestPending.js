import { useSelector } from '../providers/store/store';

export const useIsApiRequestPending = () => {
  // check for any pending query or mutation
  const isLoading = useSelector((state) => {
    const isSomeQueryPending = Object.values(state.api.queries).some(
      (query) => query.status === 'pending'
    );
    const isSomeMutationPending = Object.values(state.api.mutations).some(
      (mutation) => mutation.status === 'pending'
    );
    return isSomeQueryPending || isSomeMutationPending;
  });

  return isLoading;
};
