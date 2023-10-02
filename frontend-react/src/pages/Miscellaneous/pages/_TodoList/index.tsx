import {FormEvent, useRef, useState} from "react";
import Task from "./components/Task";
import {Box, Button, Grid, InputAdornment, Paper, TextField, Typography} from "@mui/material";

export interface Todo {
  id: number,
  taskName: string,
  isCompleted: boolean
}

export default function TodoList() {

  const todoInputRef = useRef<HTMLInputElement>(null!);
  const [todoList, setTodoList] = useState<Todo[]>([]);

  const addNewTask = (e: FormEvent) => {
    e.preventDefault();

    console.log(todoInputRef.current.value);

    if (todoInputRef.current.value) {
      setTodoList([...todoList, {
        id: todoList.length ? todoList.length : 0,
        taskName: todoInputRef.current.value,
        isCompleted: false
      }]);

      todoInputRef.current.value = '';
    }
  }

  const removeTask = (taskId: number) => {
    setTodoList(todoList.filter((task: Todo) => task.id !== taskId));
  }

  const toggleTask = (taskId: number) => {
    setTodoList(todoList.map((task) => {
      if (task.id == taskId) {
        return {...task, isCompleted: !task.isCompleted};
      }
      return task;
    }));
  }

  return (
    <>
      <Typography variant="h4" mb={3} gutterBottom>Add/Remove TODO Tasks</Typography>

      <Paper sx={{p: 2}}>

        <Grid container justifyContent="center">

          <Grid item xs={12} md={10} lg={8} xl={7}>
            <form onSubmit={addNewTask}>
              <Box m={1}>
                <TextField
                  label="Todo Task..."
                  inputRef={todoInputRef}
                  variant="outlined"
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Button type="submit" variant="contained">Add Task</Button>
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
            </form>

            {todoList.length > 0 &&
              <Box m={1} mt={4}>
                {todoList.map((task) => {
                  return <Task key={task.id} task={task} onDelete={removeTask} toggleUpdate={toggleTask}/>;
                })}
              </Box>
            }
          </Grid>

        </Grid>
      </Paper>
    </>
  );
}
