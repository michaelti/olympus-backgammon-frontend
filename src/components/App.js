import React, { useState } from "react";
import GlobalStyles from "../styles/globalStyles";
import Header from "./Header";
import Main from "./Main";
import Game from "./Game";
import { doEmitter } from "../api";

function App() {
    const [roomName, setRoomName] = useState("");

    const startRoom = () => {
        doEmitter("event/start-room", (acknowledgement) => {
            if (!acknowledgement.ok) {
                console.log(`Failed to start room "${acknowledgement.roomName}".`);
            } else {
                setRoomName(acknowledgement.roomName);
            }
        });
    };

    const joinRoom = (roomName) => {
        doEmitter("event/join-room", roomName, (acknowledgement) => {
            if (!acknowledgement.ok) {
                console.log(`Failed to join room "${acknowledgement.roomName}".`);
            } else {
                setRoomName(acknowledgement.roomName);
            }
        });
    };

    return (
        <div className="App">
            <GlobalStyles />
            <Header roomName={roomName} />
            <Main startRoom={startRoom} joinRoom={joinRoom} />
            <Game />
        </div>
    );
}

export default App;
