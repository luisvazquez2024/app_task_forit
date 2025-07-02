
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const TaskForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [completed, setCompleted] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams(); 

  useEffect(() => {
    if (id) {

      const fetchTask = async () => {
        try {
          const response = await fetch(`${API_BASE_URL}/tasks/${id}`);
          if (!response.ok) {

            const errorData = await response.json();
            throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
          }
          const taskToEdit = await response.json();

          if (taskToEdit) {
            setTitle(taskToEdit.title);
            setDescription(taskToEdit.description);
            setCompleted(taskToEdit.completed);
          } else {
            
            setError('Tarea no encontrada.');
          }
        } catch (err) {
          setError('No se pudo cargar la tarea: ' + err.message);
          console.error('Error loading task:', err);
        }
      };
      fetchTask();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const taskData = { title, description, completed };
    let url = `${API_BASE_URL}/tasks`;
    let method = 'POST';

    if (id) {
      url = `${API_BASE_URL}/tasks/${id}`;
      method = 'PUT';
    }

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      navigate('/'); 
    } catch (err) {
      setError('No se pudo guardar la tarea : ' + err.message);
      console.error('Error al intentar guardar:', err);
    }
  };

  return (
    <div className="container">
      <h2>{id ? 'Editar Tarea' : 'Agrega Nueva Tarea'}</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit} className='TodoForm'>
        <div className="form-group">
          <label className='form-label' htmlFor="title">Titulo:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className='form-control todo-input'
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description">Descripción:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className='form-control todo-input'
          ></textarea>
        </div>
        {id && ( 
          <div className="form-group checkbox-group">
            <input
              type="checkbox"
              id="completed"
              checked={completed}
              onChange={(e) => setCompleted(e.target.checked)}
            />
            <label htmlFor="completed">Completed</label>
          </div>
        )}
        <section className='mb-3'>  
          <button type="submit" className="btn btn-primary pt-2 gap-2">
            {id ? 'Actualiza tarea' : 'Agregar tarea'}
          </button>
        </section>
      </form>
    </div>
  );
};

export default TaskForm;