import React, { useState } from 'react';
import styled from 'styled-components';

const SocketActionsContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
    grid-gap: 2px;
    background-color: #ddd;

    > div {
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #fff;
    }

    button {
        display: block;
        background-color: transparent;
        border: none;
        color: inherit;
        padding: 15px;
        outline: none;
        cursor: pointer;

        &:hover, &:active, &:focus {
            background-color: grey;
        }
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
            <div>
                <button onClick={startRoom}>Start a Game</button>
            </div>
            <div>
                <div>
                    <input type="text" placeholder="Room name to join" onChange={handleChange} />
                    <button onClick={joinRoom}>Join a Game</button>
                </div>
            </div>
        </SocketActionsContainer>
    );
}

export default SocketActions;
