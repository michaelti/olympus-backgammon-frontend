import React from 'react';
import GlobalStyles from '../styles/globalStyles';
import SocketManager from './SocketManager';

function App() {
    return (
        <div className="App">
            <GlobalStyles test='test' />
            <SocketManager />
        </div>
    );
}

export default App;
