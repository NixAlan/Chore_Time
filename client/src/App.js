import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import "mdb-ui-kit";
import LogInView from "./views/LogIn";
//import { Router } from "@reach/router";
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
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LogInView />} />
          <Route path="/reg" element={<RegView />} />
          <Route path="/parentDashboard" element={<HomeView />} />
          <Route path="/addChildView" element={<AddChildView />} />
          <Route path="/addChoreView" element={<AddChoreView />} />
          <Route path="/endOfWeekView" element={<EndOFWeekView />} />
          <Route path="/oneChoreView/edit/:id" element={<OneChoreView />} />
          <Route path="/oneChildView/edit/:id" element={<OneChildView />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
