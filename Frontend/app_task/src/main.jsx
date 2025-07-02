import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import TaskList from './pages/TaskList.jsx';
import TaskForm from './components/TaskForm.jsx';

import 'bootstrap/dist/css/bootstrap.min.css';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<TaskList />} />
          <Route path="add" element={<TaskForm />} />
          <Route path="edit/:id" element={<TaskForm />} />
        </Route>
      </Routes>
    </Router>
  </React.StrictMode>
)
