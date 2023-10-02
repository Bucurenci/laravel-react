import {Todo} from "../../index";
import {Button, Stack, Typography} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

interface TaskProps {
  task: Todo,
  onDelete: (taskId: number) => void,
  toggleUpdate: (taskId: number) => void
}

export default function Task({task, onDelete, toggleUpdate}: TaskProps) {

  return (
    <h2>
      <Stack direction="row" spacing={1} justifyContent="right" alignItems="center">
        <Typography variant="h5">
          {task.isCompleted ? (<s>{task.taskName}</s>) : (task.taskName)}
        </Typography>
        <Button onClick={() => toggleUpdate(task.id)} variant="contained" color="success">
          {task.isCompleted ? (<CheckBoxIcon/>) : (<CheckBoxOutlineBlankIcon/>)}
        </Button>
        <Button onClick={() => onDelete(task.id)} variant="contained" color="error"><DeleteIcon/></Button>
      </Stack>
    </h2>
  );
}
