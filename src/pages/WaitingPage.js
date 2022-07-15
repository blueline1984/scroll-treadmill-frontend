import React from "react";
import { useParams } from "react-router-dom";

function WaitingPage() {
  const { roomId } = useParams();

  return <h1>This is {roomId} page !</h1>;
}

export default WaitingPage;
