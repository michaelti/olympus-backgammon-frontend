import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import GlobalStyles from "../styles/globalStyles";
import Main from "./pages/Main";
import Room from "./pages/Room";

function App() {
    return (
        <div className="App">
            <GlobalStyles />
            <Router>
                <Switch>
                    <Route path="/room/:roomName">
                        <Room />
                    </Route>
                    <Route path="/">
                        <Main />
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
