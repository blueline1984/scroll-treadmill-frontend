import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import MainPage from "../pages/MainPage";
import GamePage from "../pages/GamePage";
import MultiPlayPage from "../pages/MultiPlayPage";
import RoomListPage from "../pages/RoomListPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/game" element={<GamePage />} />
        <Route path="/multi" element={<MultiPlayPage />} />
        <Route path="/roomlist" element={<RoomListPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
