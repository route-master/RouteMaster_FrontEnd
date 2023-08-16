import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

function SearchBar(): JSX.Element {
  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={top100Films}
      sx={{ width: '500px', backgroundColor: 'white' }}
      renderInput={(params) => (
        <TextField {...params} label="어디를 정복하고 싶나요?" />
      )}
    />
  );
}

const top100Films = [
  { label: '서울', year: 1994 },
  { label: '경기', year: 1972 },
  { label: '부산', year: 1974 },
  { label: '일본', year: 2008 },
  { label: '중국', year: 1957 },
  { label: '미국', year: 1993 },
];

export default SearchBar;
