import {Button, Divider, Grid, IconButton, Stack, Typography} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import {Todo} from "../../TaskList";

interface TaskProps {
  task: Todo,
  onDelete: (taskId: number) => void,
  toggleUpdate: (taskId: number) => void
}

export default function Task({task, onDelete, toggleUpdate}: TaskProps) {

  return (
    <>
      <h2>
        <Grid container alignItems="center">
          <Grid item>
            <IconButton onClick={() => toggleUpdate(task.id)} color="success">
              {task.isCompleted ? (<CheckBoxIcon/>) : (<CheckBoxOutlineBlankIcon/>)}
            </IconButton>
          </Grid>
          <Grid item xs>
            <Typography variant="h5">
              {task.isCompleted ? (<s>{task.taskName}</s>) : (task.taskName)}
            </Typography>
          </Grid>
          <Grid item align="right" xs={3}>
            <Button onClick={() => onDelete(task.id)} color="error" variant="contained"><DeleteIcon/></Button>
          </Grid>
        </Grid>
      </h2>
      <Divider/>
    </>
  );
}
