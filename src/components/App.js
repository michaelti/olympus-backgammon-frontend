import React from 'react';
import SocketDemo from './SocketDemo';

function App() {
    return (
        <div className="App">
            <SocketDemo socketUrl="ws://localhost:3001" />
        </div>
    );
}

export default App;
