import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import AddCar from "./pages/AddCar";
import AppCars from "./pages/AppCars";

function App() {
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
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
