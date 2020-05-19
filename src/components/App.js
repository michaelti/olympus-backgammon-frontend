import React from 'react';
import SocketActions from './SocketActions';
import Header from './Header';
import useSocket from '../hooks/useSocket';
import styled from 'styled-components';

const AppContainer = styled.div`

`;

function App() {
    const [socket, isConnected, isConnecting] = useSocket("ws://localhost:3001");

    return (
        <AppContainer className="App">
            <Header
                socket={socket}
                isConnecting={isConnecting}
                isConnected={isConnected}
            />
            <SocketActions socket={socket} />
        </AppContainer>
    );
}

export default App;
