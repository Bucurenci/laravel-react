import {Todo} from "../../index";
import {faCheck, faRemove} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

interface TaskProps {
  task: Todo,
  onDelete: (taskId: number) => void,
  onUpdate: (taskId: number) => void
}

export default function Task({task, onDelete, onUpdate}: TaskProps) {

  return (
    <h2>
      <span className={task.isCompleted ? "text-success" : ""}>{task.taskName}</span>
      <button onClick={() => onUpdate(task.id)} className="btn btn-success mx-2"><FontAwesomeIcon icon={faCheck}/>
      </button>
      <button onClick={() => onDelete(task.id)} className="btn btn-danger"><FontAwesomeIcon icon={faRemove}/></button>
    </h2>
  );
}
