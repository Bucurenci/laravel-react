import {useState} from "react";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TableCell,
  TableRow,
  TextField,
  Tooltip
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {SettingItem} from "../../SettingsList";

interface SettingsItemProps {
  setting: SettingItem,
  onDelete: (settingId: number) => void
}

export default function SettingsItem({setting, onDelete}: SettingsItemProps) {
  const settingValue = JSON.parse(setting.value);
  const [editable, setEditable] = useState<boolean>(false);
  // const [newSettingValue, setNewSettingValue] = useState<SettingItem>(settingValue);

  const handleSave = () => {
    setEditable(false);
  }

  const handleDelete = () => {
    onDelete(setting.id);
  }

  const onSettingChange = (/*ev: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>*/) => {
    // setNewSettingValue(ev.target.value);
  }

  const renderInputType = () => {

    switch (setting.type) {

      case "text":
        return <TextField onChange={onSettingChange} value={settingValue?.value} autoFocus label="Value"
                          variant="outlined"/>;
      case "email":
        return <TextField onChange={onSettingChange} value={settingValue?.value} autoFocus label="Value"
                          variant="outlined"/>;
      case "select":
        return (
          <FormControl fullWidth>
            <InputLabel>Value</InputLabel>
            <Select label="Age">
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        );

      default:
        return <h1>No match</h1>
    }
  }

  return (
    <TableRow hover sx={{'&:last-child td, &:last-child th': {border: 0}}}>
      <TableCell>{setting.name}</TableCell>
      <TableCell>{editable ?
        renderInputType()
        :
        setting.value ? JSON.stringify(setting.value) : ''
      }
      </TableCell>

      <TableCell align="right">

        <Stack direction="row" spacing={2}>

          {editable ? (
            <Button onClick={handleSave} variant="contained">
              Save
            </Button>
          ) : (
            <Tooltip title="Edit Setting" placement="top">
              <Button onClick={() => setEditable(true)} variant="contained" sx={{minWidth: 45, px: 0}}>
                <EditIcon/>
              </Button>
            </Tooltip>
          )}

          <Tooltip title="Delete Setting" placement="top">
            <Button onClick={handleDelete} variant="contained" color="error" sx={{minWidth: 45, px: 0}}>
              <DeleteIcon/>
            </Button>
          </Tooltip>

        </Stack>

      </TableCell>
    </TableRow>
  );
}
