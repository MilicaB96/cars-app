import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import AddCar from "./pages/AddCar";
import AppCars from "./pages/AppCars";
import AppLogin from "./pages/AppLogin";
import { useState } from "react";
import AuthService from "./services/AuthService";
import AppRegister from "./pages/AppRegister";
import SingleCar from "./components/SingleCar";
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
            <Route exact path='/cars/:id'>
              <SingleCar />
            </Route>
            <Route exact path='/cars'>
              <AppCars />
            </Route>
            <Route path='/add'>
              <AddCar />
            </Route>
            <Route exact path='/edit/:id'>
              <AddCar />
            </Route>
            <Route exact path='/login'>
              <AppLogin
                onLogin={() => {
                  setIsAuthenticated(true);
                }}
              />
            </Route>
            <Route exact path='/register'>
              <AppRegister />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
