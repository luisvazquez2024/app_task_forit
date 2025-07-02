import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Link } from 'react-router-dom';


const TaskItem = ({ task, onDelete, onToggleComplete }) => {
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A'; 
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    try {
      return new Date(dateString).toLocaleDateString(undefined, options);
    } catch (e) {
      console.error("Error parsing date:", dateString, e);
      return dateString; 
    }
  };

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''} Todo`}>
      <section className='d-flex flex-row justify-content-evenly mt-3 align-items-center form-control'>

        <h3 className='w-25'>{task.title}</h3>
        <p className='w-25'>{task.description}</p>
        <section className='d-none'>  
        {task.createdAt && <p className="task-date">Created: {formatDate(task.createdAt)}</p>}
        </section>
        <div className="w-25">
            <button className={`btn ${task.completed ? 'btn-success':'btn-warning'}`} onClick={() => onToggleComplete(task.id, !task.completed)}>
              {task.completed ? 'Tarea completa' : ' tarea incompleta'}
            </button>
        </div> 

     <div className='d-flex flex-column gap-1'> 
        <Link to={`/edit/${task.id}`} type='button' className="btn btn-warning w-100">Edit</Link>
        <button onClick={() => onDelete(task.id)} className="btn btn-danger w-100">Delete</button>
     </div>
      </section>
    </div>
  );
};

export default TaskItem;