import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.header`
    display: flex;
    background-color: #0074e8;
    color: #ffffff;
    padding: 15px;
    
    > div {
        margin-right: 15px;
    }
`;

function Header(props) {  
    const [roomName, setRoomName] = useState('');
    const { socket, isConnected, isConnecting } = props;
    
    useEffect(() => {
        // Receive successful joined room
        socket.on('event/joined-room', (roomName) => {
            setRoomName(roomName);
        });

        // Receive failed join room
        socket.on('event/failed-join-room', (roomName) => {
            console.log(`Failed to join room ${roomName} because it does not exist.`);
        });
    }, [socket]);

    return (
        <HeaderContainer>
            <div>
                Status: {
                    isConnecting ? 'Connecting' :
                    isConnected ? 'Connected' :
                    'Disconnected'
                }
            </div>
            <div>
                Room name: { roomName }
            </div>
        </HeaderContainer>
    );
}

export default Header;
