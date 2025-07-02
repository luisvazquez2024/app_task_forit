
import React, { useState, useEffect } from 'react';
import TaskItem from '../components/TaskItem';
import 'bootstrap/dist/css/bootstrap.min.css';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTasks = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/tasks`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      const sortedTasks = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setTasks(sortedTasks);
    } catch (err) {
      setError('Fallo en la carga de tareas: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Estas seguro que quieres eliminar esta Tarea?')) {
      try {
        const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          const errorData = await response.json(); 
          throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
        }
        setTasks(tasks.filter(task => task.id != id)); 
      } catch (err) {
        setError('No se pudo eliminar: ' + err.message);
        console.error('Error Borrando tarea:', err);
      }
    }
  };

  const handleToggleComplete = async (id, completed) => {
    try {
      const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ completed }), 
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }
      const updatedTask = await response.json();
      setTasks(tasks.map(task => (task.id == Number(id) ? updatedTask : task)));
    } catch (err) {
      setError('No se pudo actualizar la tarea: ' + err.message);
      console.error('Error actualizando la tarea:', err);
    }
  };

  if (loading) return <p className='text-dark fw-2'>cargando tareas...</p>;
  if (error) return <p className="text-danger fw-2 fs-2">{error}</p>;
  if (tasks.length === 0) return <p className='text-dark fw-2 fs-2'> No hay tareas. Agrega una tarea!</p>;

  return (
    <div className="task-list">
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onDelete={handleDelete}
          onToggleComplete={handleToggleComplete}
        />
      ))}
    </div>
  );
};

export default TaskList;