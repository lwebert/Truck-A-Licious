import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import auth from '../utils/auth';

const Navbar = () => {
  const [loginCheck, setLoginCheck] = useState(false);
  const location = useLocation();

  const checkLogin = () => {
    if (auth.loggedIn()) {
      setLoginCheck(true);
    }
  };

  useEffect(() => {
    checkLogin();
  }, [loginCheck]);

  const showLinksOnPaths = ['/']; // Only show links on the home page

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light navbar-rounded">
      {/* <div className="container-fluid navbar-nav"> */}
        <Link className="navbar-brand" to="/">Truck-A-Licious</Link>
        {/* <div className="collapse navbar-collapse"> */}
        <div>
          <ul className="navbar-nav ms-auto d-flex align-items-center">
            {showLinksOnPaths.includes(location.pathname) && !loginCheck && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/signup">Sign Up</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
              </>
            )}
            {loginCheck && (
              <li className="nav-item">
                <button
                  className="btn btn-outline-danger"
                  type="button"
                  onClick={() => {
                    auth.logout();
                  }}
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      {/* </div> */}
    </nav>
  );
};

export default Navbar;