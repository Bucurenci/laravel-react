import {Todo} from "../../index";

interface TaskProps {
  task: Todo,
  onDelete: (taskId: number) => void,
  onUpdate: (taskId: number) => void
}

export default function Task({task, onDelete, onUpdate}: TaskProps) {

  return (
    <h2>
      <span className={task.isCompleted ? "text-success" : ""}>{task.taskName}</span>
      <button onClick={() => onUpdate(task.id)} className="btn btn-success mx-2"><i className="fa fa-check"></i>
      </button>
      <button onClick={() => onDelete(task.id)} className="btn btn-danger"><i className="fa fa-remove"></i></button>
    </h2>
  );
}
