import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { fetchAttractionsByType } from 'store/Slices/attractions/thunks';
import { resetState } from 'store/Slices/attractions/slice';

function useInfiniteScroll() {
  const { pagetype, keyword } = useParams<{
    pagetype: string;
    keyword: string;
  }>();
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.attractions.attractions);
  const isLoading = useAppSelector((state) => state.attractions.isLoading);
  const currentPage = useAppSelector((state) => state.attractions.currentPage);
  const hasNextPage = useAppSelector((state) => state.attractions.hasNextPage);
  const err = useAppSelector((state) => state.attractions.error);

  useEffect(() => {
    if (pagetype) {
      dispatch(resetState());
      dispatch(
        fetchAttractionsByType({
          type: pagetype,
          page: 1,
          keyword,
          contentTypeId: 14,
        }),
      );
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
        dispatch(
          fetchAttractionsByType({
            type: 'stay',
            page: currentPage,
            keyword,
            contentTypeId: 14,
          }),
        );
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
