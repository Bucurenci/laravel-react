import {FormEvent, useRef, useState} from "react";
import Task from "../components/admin/Task";

export default function TodoList() {

  const todoInputRef = useRef<HTMLInputElement>(null!);
  const [todoList, setTodoList] =useState([]);

  const addNewTask = (e: FormEvent) => {
    e.preventDefault();

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
    setTodoList(todoList.filter((task) => task.id !== taskId));
  }

  const completeTask = (taskId: number) => {
    setTodoList(todoList.map((task) => {
      if (task.id == taskId) {
        return {...task, isCompleted: true};
      }
      return task;
    }));
  }

  console.log('TodoList Rendered');

  return (
    <div className="card border-0 shadow-lg">
      <div className="card-header">
        <h1 className="h2">Add/Remove TODO Tasks</h1>
      </div>
      <div className="card-body py-4">
        <div className="row justify-content-center">
          <div className="col col-md-9 col-xl-7">

            <form onSubmit={addNewTask} className="row">

              <div className="col">
                <input ref={todoInputRef}
                       className="form-control form-control-user form-control-lg"
                       id="todoTaskInput"
                       placeholder="Todo Task..." />
              </div>
              <div className="col-auto">
                <button className="btn btn-success btn-lg">Add Task</button>
              </div>
            </form>

            {todoList &&
              <div className="col-12 mt-4">
                {todoList.map((task) => {
                  return <Task key={task.id} task={task} onDelete={removeTask} onUpdate={completeTask}/>;
                })}
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  );
}
