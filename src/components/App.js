import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import MainPage from "../pages/MainPage";
import SinglePlayPage from "../pages/SinglePlayPage";
import MultiPlayPage from "../pages/MultiPlayPage";
import RoomListPage from "../pages/RoomListPage";
import WaitingRoomPage from "../pages/WaitingRoomPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/game" element={<SinglePlayPage />} />
        <Route path="/multi" element={<MultiPlayPage />} />
        <Route path="/roomlist" element={<RoomListPage />} />
        <Route path="/waitingroom/:roomId" element={<WaitingRoomPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
