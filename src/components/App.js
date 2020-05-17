import React from 'react';
import SocketActions from './SocketActions';
import Header from './Header';
import useSocket from '../hooks/useSocket';

function App() {
    const [socket, isConnected, isConnecting] = useSocket("ws://localhost:3001");

    return (
        <div className="App">
            <Header
                socket={socket}
                isConnecting={isConnecting}
                isConnected={isConnected}
            />
            <SocketActions socket={socket} />
        </div>
    );
}

export default App;
