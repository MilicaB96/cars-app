import { BrowserRouter as Router, Switch, Link } from "react-router-dom";
import "./App.css";
import AddCar from "./pages/AddCar";
import AppCars from "./pages/AppCars";
import AppLogin from "./pages/AppLogin";
import { useState } from "react";
import AuthService from "./services/AuthService";
import AppRegister from "./pages/AppRegister";
import SingleCar from "./components/SingleCar";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    Boolean(localStorage.getItem("token"))
  );
  const handleLogout = async () => {
    try {
      await AuthService.logout();
      setIsAuthenticated(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className='App'>
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to='/cars'>Cars</Link>
              </li>
              <li>
                <Link to='/add'>Add Car</Link>
              </li>
              <li>
                {!isAuthenticated ? (
                  <Link to='/login'>Login</Link>
                ) : (
                  <button
                    type='button'
                    className='btn'
                    onClick={handleLogout}
                    style={{ color: "blue" }}
                  >
                    {"Logout"}
                  </button>
                )}
              </li>
              {!isAuthenticated && (
                <li>{<Link to='/register'>Register</Link>}</li>
              )}
            </ul>
          </nav>
          <hr />
          <Switch>
            <PrivateRoute exact path='/cars/:id'>
              <SingleCar />
            </PrivateRoute>
            <PrivateRoute exact path='/cars'>
              <AppCars />
            </PrivateRoute>
            <PrivateRoute path='/add'>
              <AddCar />
            </PrivateRoute>
            <PrivateRoute exact path='/edit/:id'>
              <AddCar />
            </PrivateRoute>
            <PublicRoute exact path='/login'>
              <AppLogin
                onLogin={() => {
                  setIsAuthenticated(true);
                }}
              />
            </PublicRoute>
            <PublicRoute exact path='/register'>
              <AppRegister />
            </PublicRoute>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
