import "./App.css";
import AddSupAttendance from "./components/SupAddAttendance";
import ViewSupAttendance from "./components/SupViewAttendance";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "../src/components/Header/header";
import { useState } from "react";
import SupEditAttendance from "./components/SupEditAttendance";
import SupLogin from "./components/SupLogin";

function App() {
  const [search, setSearch] = useState("");
  return (
    <Router>
      <Header />
      <div className="container">
        <Switch>
          <Route path="/add">
            <AddSupAttendance />
            <ViewSupAttendance setSearch={setSearch} search={search} />
          </Route>
          <Route path="/user/:_id">
            <SupEditAttendance />
          </Route>
          <Route exact path="/">
            <SupLogin />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
