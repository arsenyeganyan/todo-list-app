import { useStore } from "./store";
import "./Todos.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faCheckSquare } from "@fortawesome/free-solid-svg-icons";

function Todo({ id }) {
    const tasks = useStore();
    const deleteTask = tasks.deleteTask;
    const moveTask = tasks.moveTask;
    const task = tasks.tasks.find(task => task.id === id);
    
    return (
        <div className="todo">
            <div className="todo--title">{task.title}</div>
            <button
                className="move--btn"
                onClick={(e) => {
                    e.preventDefault();
                    moveTask(task.title, id, "done");
                }}
            >
                <FontAwesomeIcon icon={faCheckSquare}/>
            </button>
            <button 
                className="delete--btn"
                onClick={(e) => {
                    e.preventDefault();
                    deleteTask(id);
                }}
            >
                <FontAwesomeIcon icon={faTrash}/>
            </button>
        </div>
    )
}

export default function Todos({ state, id }) {
    const tasks = useStore((store) => store.tasks.filter(task =>
        task.state === state));
    
    return(
        <div>
            <div className="task--container">
                <span>{state}</span>
                {tasks.map(task => (
                    <Todo key={task.id} id={task.id}/>
                ))}
            </div>
        </div>
    )
}