import React from "react";
import { Container } from "reactstrap";
import BackgammonBoard from "./BoardUI/BackgammonBoard";
import BackgammonExtras from "./BoardUI/BackgammonExtras";
import { useSocketContext } from "./SocketManager";

function Game() {
    const { boardState, doSubmove, applyTurn, undoTurn } = useSocketContext();

    return boardState === null ? null : (
        <Container className="py-5">
            <BackgammonExtras boardState={boardState} applyTurn={applyTurn} undoTurn={undoTurn} />
            <BackgammonBoard boardState={boardState} doSubmove={doSubmove} />
        </Container>
    );
}

export default Game;
