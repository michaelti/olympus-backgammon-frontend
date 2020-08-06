import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { Container, Button } from "reactstrap";
import { socketEmit } from "../api";

function Main({ setRoomName }) {
    const [shouldRedirectTo, setShouldRedirectTo] = useState(null);

    const startRoom = () => {
        socketEmit("event/start-room", (acknowledgement) => {
            if (!acknowledgement.ok) {
                console.log(`Failed to start room "${acknowledgement.roomName}".`);
            } else {
                setRoomName(acknowledgement.roomName);
                setShouldRedirectTo(acknowledgement.roomName);
            }
        });
    };

    return (
        <Container className="py-5">
            <h1>Olympus Backgammon</h1>
            <p className="py-3">
                In Greece, there are three major variants of Backgammon: Portes, Plakoto, and Fevga.
                When played together, they are called Tavli. Welcome to the ancient game, the Greek
                way.
            </p>
            <div>
                <Button onClick={startRoom} color="primary" size="lg">
                    Start a Game
                </Button>
            </div>

            <hr className="my-5" />

            <p className="pb-3">
                To join a game that your friend started, click the link that they sent you.
            </p>

            {shouldRedirectTo === null ? null : <Redirect to={"/room/" + shouldRedirectTo} />}
        </Container>
    );
}

export default Main;
