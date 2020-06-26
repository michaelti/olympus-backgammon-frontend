import React, { useState } from "react";
import BackgammonBoard from "./BoardUI/BackgammonBoard";
import BackgammonExtras from "./BoardUI/BackgammonExtras";
import { useSocketOn, socketEmit } from "../api";

function Game() {
    const [boardState, setBoardState] = useState(null);

    useSocketOn("game/update-board", (board) => {
        setBoardState(board);
    });

    const doSubmove = (from, to) => socketEmit("game/submove", from, to);
    const applyTurn = () => socketEmit("game/apply-turn");
    const undoTurn = () => socketEmit("game/undo");

    return boardState === null ? null : (
        <>
            <BackgammonExtras boardState={boardState} applyTurn={applyTurn} undoTurn={undoTurn} />
            <BackgammonBoard boardState={boardState} doSubmove={doSubmove} />
        </>
    );
}

export default Game;
