import React from "react";
import GlobalStyles from "../styles/globalStyles";
import SocketManager from "./SocketManager";
import Header from "./Header";
import Main from "./Main";

function App() {
    return (
        <div className="App">
            <GlobalStyles />
            <SocketManager>
                <Header />
                <Main />
            </SocketManager>
        </div>
    );
}

export default App;
