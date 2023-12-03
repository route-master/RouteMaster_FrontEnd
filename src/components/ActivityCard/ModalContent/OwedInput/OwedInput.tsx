import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { SyntheticEvent } from 'react';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

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

function OwedInput({ members, currentLog, handleChange }: Props): JSX.Element {
  const defaultValue: string[] = currentLog.participants.map((p) => {
    const foundMember = members.find((m) => m.id === p);
    if (foundMember) return foundMember.nickname;
    return '';
  });

  const handleOwedChange = (e: SyntheticEvent, value: string[] | null) => {
    const foundOwed = members.filter((m) => value?.includes(m.nickname));
    const updatedLog: Log = {
      paid: currentLog.paid,
      participants: foundOwed.map((o) => o.id) || [],
      payment: currentLog.payment,
    };
    handleChange(updatedLog);
  };

  return (
    <Autocomplete
      freeSolo
      multiple
      id="checkboxes-tags-demo"
      options={members.map((member) => member.nickname)}
      defaultValue={defaultValue.filter((d) => d !== '')}
      disableCloseOnSelect
      getOptionLabel={(option) => option}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox icon={icon} checkedIcon={checkedIcon} checked={selected} />
          {option}
        </li>
      )}
      style={{ width: 280 }}
      onChange={(e, value) => handleOwedChange(e, value)}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder={
            currentLog.participants.length > 0 ? '' : '누구를 위해 지불했나요?'
          }
        />
      )}
    />
  );
}

export default OwedInput;
