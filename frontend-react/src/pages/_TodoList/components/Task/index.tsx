import {Todo} from "../../index";
import {Button, Stack} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';

interface TaskProps {
  task: Todo,
  onDelete: (taskId: number) => void,
  onUpdate: (taskId: number) => void
}

export default function Task({task, onDelete, onUpdate}: TaskProps) {

  return (
    <h2>
      <Stack direction="row" spacing={1}>
        <span className={task.isCompleted ? "text-success" : ""}>{task.taskName}</span>
        <Button onClick={() => onUpdate(task.id)} variant="contained" color="success"><CheckIcon/></Button>
        <Button onClick={() => onDelete(task.id)} variant="contained" color="error"><DeleteIcon/></Button>
      </Stack>
    </h2>
  );
}
