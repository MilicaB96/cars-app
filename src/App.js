import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import AddCar from "./pages/AddCar";
import AppCars from "./pages/AppCars";
import Login from "./pages/Login";
import { useState } from "react";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    Boolean(localStorage.getItem("token"))
  );
  const handleLogout = () => {};
  return (
    <div className='App'>
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link style={{ textDecoration: "none" }} to='/cars'>
                  Cars
                </Link>
              </li>
              <li>
                <Link style={{ textDecoration: "none" }} to='/add'>
                  Add Car
                </Link>
              </li>
              <li>
                {!isAuthenticated ? (
                  <Link to='/login'>Login</Link>
                ) : (
                  <span onClick={handleLogout} style={{ color: "blue" }}>
                    {"Logout"}
                  </span>
                )}
              </li>
            </ul>
          </nav>
          <hr />
          <Switch>
            <Route path='/cars'>
              <AppCars />
            </Route>
            <Route path='/add'>
              <AddCar />
            </Route>
            <Route exact path='/edit/:id'>
              <AddCar />
            </Route>
            <Route exact path='/login'>
              <Login
                onLogin={() => {
                  setIsAuthenticated(true);
                }}
              />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
