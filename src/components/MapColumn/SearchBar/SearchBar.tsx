/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, forwardRef } from 'react';
import styles from './SearchBar.module.css';

interface Props {
  inputRef: React.RefObject<HTMLInputElement>;
  placeListRef: React.RefObject<HTMLUListElement>;
  paginationRef: React.RefObject<HTMLDivElement>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setKeyword: React.Dispatch<React.SetStateAction<any>>;
}

function MapColumnSearchBar({
  inputRef,
  placeListRef,
  paginationRef,
  setKeyword,
}: Props): JSX.Element {
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setKeyword(inputRef.current?.value);
  };

  useEffect(() => {
    if (inputRef.current) {
      // eslint-disable-next-line no-param-reassign
      inputRef.current.value = '';
    }
  }, []);

  return (
    <div className={styles.container}>
      <div id="option">
        <form onSubmit={onSubmit}>
          <input
            id="keyword"
            className={styles.input}
            type="text"
            placeholder="어디를 체험해볼까요?"
            ref={inputRef}
          />
        </form>
      </div>
      {/* <hr />
      <ul id="placeList" ref={placeListRef}> </ul>
      <div id="pagination" ref={paginationRef}> </div> */}
    </div>
  );
}

export default forwardRef(MapColumnSearchBar);
