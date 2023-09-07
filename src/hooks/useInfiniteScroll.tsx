import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { fetchAttractionsByType } from 'store/Slices/attractions/thunks';
import { resetState } from 'store/Slices/attractions/slice';

function useInfiniteScroll() {
  const { pagetype } = useParams<string>();
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.attractionsThunk.attractions);
  const isLoading = useAppSelector((state) => state.attractionsThunk.isLoading);
  const currentPage = useAppSelector(
    (state) => state.attractionsThunk.currentPage,
  );
  const hasNextPage = useAppSelector(
    (state) => state.attractionsThunk.hasNextPage,
  );
  const err = useAppSelector((state) => state.attractionsThunk.error);

  useEffect(() => {
    if (pagetype) {
      dispatch(resetState());
      dispatch(fetchAttractionsByType({ type: pagetype, page: 1 }));
    }
  }, [pagetype]);

  useEffect(() => {
    const scrollEvent = () => {
      const { innerHeight } = window;
      const { scrollHeight } = document.body;
      const scrollTop =
        (document.documentElement && document.documentElement.scrollTop) ||
        document.body.scrollTop;
      if (
        !isLoading &&
        scrollHeight - innerHeight - scrollTop < 10 &&
        hasNextPage
      ) {
        dispatch(fetchAttractionsByType({ type: 'stay', page: currentPage }));
      }
      if (err) {
        // eslint-disable-next-line no-alert
        alert(err);
      }
    };
    window.addEventListener('scroll', scrollEvent);
    return () => {
      window.removeEventListener('scroll', scrollEvent);
    };
  }, [dispatch, isLoading, hasNextPage, currentPage]);

  return { data, isLoading };
}

export default useInfiniteScroll;
