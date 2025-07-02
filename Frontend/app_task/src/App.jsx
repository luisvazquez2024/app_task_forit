import { Outlet, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

function App() {
  return (
    <div className="container">
      <header>
        <h1>Administrador de tareas</h1>
        <nav>
          <ul className='nav gap-1 d-flex flex-row'>  
            <li className='nav-item'><Link to="/" className='btn btn-info'>Lista de Tareas</Link></li>
            <li className='nav-item ' ><Link to="/add" className='btn btn-info'>Nueva tarea</Link></li>
          </ul>
        </nav>
      </header>
      <main >
        <Outlet/>
      </main>
    </div>
  );
}

export default App;
