import React from "react";

type Props = {};

const JoinRoom = (props: Props) => {
  return (
    <div>
      <form>
        <select>
          <option value="Room1">Room1</option>
          <option value="Room2">Room2</option>
        </select>
      </form>
    </div>
  );
};

export default JoinRoom;
