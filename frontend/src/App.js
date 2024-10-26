import Dashboard from "./Components/Dashboard/Dashboard";
import SignIn from "./Components/SignIn/SignIn";
import SignUp from "./Components/SignUp/SignUp";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import './App.css';

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/signin">
            <SignIn />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
          
          <Route path="/">
            <Redirect to="/signin" />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
