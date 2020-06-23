import React from "react";
import GlobalStyles from "../styles/globalStyles";
import SocketManager from "./SocketManager";
import Header from "./Header";
import Main from "./Main";
import Game from "./Game";

function App() {
    return (
        <div className="App">
            <GlobalStyles />
            <SocketManager>
                <Header />
                <Main />
                <Game />
            </SocketManager>
        </div>
    );
}

export default App;
