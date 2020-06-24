import React, { useState } from "react";
import { Container } from "reactstrap";
import BackgammonBoard from "./BoardUI/BackgammonBoard";
import BackgammonExtras from "./BoardUI/BackgammonExtras";
import { useListener, doEmitter } from "../api";

function Game() {
    const [boardState, setBoardState] = useState(null);

    useListener("game/update-board", (board) => {
        setBoardState(board);
    });

    const doSubmove = (from, to) => doEmitter("game/submove", from, to);
    const applyTurn = () => doEmitter("game/apply-turn");
    const undoTurn = () => doEmitter("game/undo");

    return boardState === null ? null : (
        <Container className="py-5">
            <BackgammonExtras boardState={boardState} applyTurn={applyTurn} undoTurn={undoTurn} />
            <BackgammonBoard boardState={boardState} doSubmove={doSubmove} />
        </Container>
    );
}

export default Game;
