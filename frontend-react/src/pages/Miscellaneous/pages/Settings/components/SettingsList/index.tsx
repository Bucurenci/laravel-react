import SettingsItem from "../SettingsItem";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {SettingItem} from "../../index";

interface SettingsListProps {
  settings: SettingItem[],
  onSettingDelete: (userId: number) => void
}

export default function SettingsList({settings, onSettingDelete}: SettingsListProps) {

  return (
    <TableContainer>
      <Table sx={{minWidth: 650}} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Value</TableCell>
            <TableCell align="right" width={140}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>

          {settings.map((settingData) => (
            <SettingsItem key={settingData.id} setting={settingData} onDelete={onSettingDelete}/>
          ))}

        </TableBody>
      </Table>
    </TableContainer>
  );
}
