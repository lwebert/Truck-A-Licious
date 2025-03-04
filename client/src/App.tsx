// import { Outlet, useLocation } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

import Navbar from './components/Navbar';

function App() {
  // const location = useLocation();
  // const hideNavbarPaths = ['/login', '/signup'];

  return (
    <div>
      <Navbar/>
      <main className='container'>
        <Outlet />
      </main>
    </div>
  );
}

export default App;
