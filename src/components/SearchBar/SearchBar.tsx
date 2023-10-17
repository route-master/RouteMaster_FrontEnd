import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SearchBar.module.css';

function SearchBar(): JSX.Element {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    const keyword = inputRef.current?.value;
    if (keyword) {
      navigate(`/attractions/keyword/${keyword}`);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleClick();
    }
  };

  return (
    <Paper component="form" className={styles.paper}>
      <InputBase
        sx={{ flex: 1 }}
        placeholder="Search"
        inputProps={{ 'aria-label': 'search google maps' }}
        inputRef={inputRef}
        onKeyDown={handleKeyDown}
        className={styles.input}
      />
      <IconButton
        type="button"
        sx={{ p: '10px' }}
        aria-label="search"
        onClick={handleClick}
        className={styles.search_btn}
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}

export default SearchBar;
