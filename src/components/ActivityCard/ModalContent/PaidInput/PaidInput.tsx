import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

interface Props {
  members: { id: string; nickname: string }[];
  currentLog: Log;
  handleChange: (updatedLog: Log) => void;
}

interface Log {
  paid: string;
  participants: string[];
  payment: number;
}

function PaidInput({ members, currentLog, handleChange }: Props): JSX.Element {
  const defaultValue: string =
    members.find((m) => m.id === currentLog.paid)?.nickname || '';

  const handlePaidChange = (e: React.SyntheticEvent, value: string | null) => {
    const foundPaid = members.find((m) => m.nickname === value);
    const updatedLog: Log = {
      paid: foundPaid?.id || '',
      participants: currentLog.participants,
      payment: currentLog.payment,
    };
    handleChange(updatedLog);
  };

  return (
    <Autocomplete
      freeSolo
      limitTags={1}
      defaultValue={defaultValue || null}
      id="controlled-demo"
      options={members.map((member) => member.nickname)}
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
