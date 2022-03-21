import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
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
            </ul>
          </nav>
          <hr />
          <Switch>
            <Route path='/cars'>
              <AppCars />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
