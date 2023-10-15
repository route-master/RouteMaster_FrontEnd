import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

interface Props {
  members: string[];
  currentLog: Log;
  handleChange: (updatedLog: Log) => void;
}

interface Log {
  paid: string;
  participants: string[];
  payment: number;
}

function PaidInput({ members, currentLog, handleChange }: Props): JSX.Element {
  const handlePaidChange = (e: React.SyntheticEvent, value: string | null) => {
    const updatedLog: Log = {
      paid: value || '',
      participants: currentLog.participants,
      payment: currentLog.payment,
    };
    handleChange(updatedLog);
  };

  return (
    <Autocomplete
      freeSolo
      limitTags={1}
      value={currentLog.paid}
      id="controlled-demo"
      options={members}
      getOptionLabel={(option) => option}
      onChange={(e, value) => handlePaidChange(e, value)}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder={currentLog.paid === '' ? '누가 지불했나요?' : ''}
        />
      )}
      sx={{ width: '220px' }}
    />
  );
}

export default PaidInput;
