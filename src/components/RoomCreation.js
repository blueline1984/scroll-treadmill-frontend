import React from "react";

function RoomCreation() {
  return (
    <>
      <h1>Create Room</h1>
      <form id="room">
        <label htmlFor="title">Room's Title :</label>
        <input type="text" id="title"></input>
        <label htmlFor="player">Players :</label>
        <select id="cars" name="player" form="room">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
        <button>방만들기</button>
      </form>
    </>
  );
}

export default RoomCreation;
