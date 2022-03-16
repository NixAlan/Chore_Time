import "./App.css";
import LogInView from "./views/LogIn";
import { Router } from "@reach/router";
import RegView from "./views/Reg";
import HomeView from "./views/HomeView";
import AddChildView from "./views/AddChildView";
import AddChoreView from "./views/AddChoreView";
import OneChoreView from "./views/OneChoreView";
import OneChildView from "./views/OneChildView";
import EndOFWeekView from "./views/EndOfWeekView";

function App() {
  return (
    <div className="App">
      <Router>
        <HomeView path="/" />
        <LogInView path="/login" />
        <RegView path="/reg" />
        <AddChildView path="/addChildView" />
        <AddChoreView path="/addChoreView" />
        <EndOFWeekView path="/endofweekvew" />
        <OneChoreView path="/oneChoreView/edit/:id" />
        <OneChildView path="/oneChildView/edit/:id" />
      </Router>
    </div>
  );
}

export default App;
