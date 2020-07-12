import React, { useState } from "react";
import BackgammonBoard from "./BoardUI/BackgammonBoard";
import BackgammonExtras from "./BoardUI/BackgammonExtras";
import BackgammonOverlay from "./BoardUI/BackgammonOverlay";
import { useSocketOn, socketEmit } from "../api";
import styled from "styled-components";
import { RoomState } from "../util";

const BoardContainer = styled.div`
    position: relative;
`;

function Game({ player, roomState }) {
    const [boardState, setBoardState] = useState(null);

    useSocketOn("game/update-board", (board) => {
        setBoardState(board);
    });

    const doMove = (from, to) => socketEmit("game/move", from, to);
    const applyTurn = () => socketEmit("game/apply-turn");
    const undoTurn = () => socketEmit("game/undo");

    return boardState === null ? null : (
        <>
            <BackgammonExtras
                boardState={boardState}
                applyTurn={applyTurn}
                undoTurn={undoTurn}
                player={player}
            />
            <BoardContainer>
                <BackgammonBoard boardState={boardState} doMove={doMove} />
                {roomState.state === RoomState.startingRoll ? (
                    <BackgammonOverlay
                        dieWhite={roomState.startingRolls.white}
                        dieBlack={roomState.startingRolls.black}
                        player={player}
                    />
                ) : null}
            </BoardContainer>
        </>
    );
}

export default Game;
