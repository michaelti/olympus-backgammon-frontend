import React, { useState } from 'react';
import styled from 'styled-components';

const SocketActionsContainer = styled.div`
    padding: 15px;

    button {
        background-color: #595D67;
        color: inherit;
        border: none;
        padding: 15px 30px;
        border-radius: 5px;
        font-size: 1.5em;
        cursor: pointer;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
        transition: box-shadow 0.15s ease, transform 0.15s ease;

        &:hover, &:active, &:focus {
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
            transform: scale(1.025);
        }
    }

    input {
        background-color: #595D67;
        color: inherit;
        border: none;
        padding: 15px 30px;
        border-radius: 5px;
        font-size: 1.5em;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
    }
`;

function SocketActions(props) {  
    const [joinName, setJoinName] = useState('');

    const startRoom = () => {
        props.socket.emit('event/start-room');
    };

    const joinRoom = () => {
        props.socket.emit('event/join-room', joinName);
    };

    const handleChange = (event) => {
        setJoinName(event.target.value);
    };

    return (
        <SocketActionsContainer>
            <h1>Olympus Backgammon</h1>
            <p>
                In Greece, there are three major variations of Backgammon:
                Portes, Plakoto, and Fevga. When played together, they are called Tavli.
            </p>
            <p>Welcome to the ancient game, the Greek way.</p>
            <div>
                <button onClick={startRoom} style={{background:'#0074E8'}}>Start a Game</button>
            </div>

            <hr/>

            <p>
            To join a game that your friend started, <u>click the link they sent you</u> or enter the code below:
            </p>
            <div>
                <div>
                    <input type="text" placeholder="Ex. g2Jk3" onChange={handleChange} />
                    <button onClick={joinRoom}>Join a Game</button>
                </div>
            </div>
        </SocketActionsContainer>
    );
}

export default SocketActions;
