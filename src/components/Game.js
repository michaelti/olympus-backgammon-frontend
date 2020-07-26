import React, { useState } from "react";
import styled from "styled-components";
import BackgammonBoard from "./BoardUI/BackgammonBoard";
import BackgammonExtras from "./BoardUI/BackgammonExtras";
import BackgammonOverlay from "./BoardUI/BackgammonOverlay";
import { useSocketOn, socketEmit } from "../api";
import { Player, RoomStep, Variant } from "../util";
import { clamp, isMoveValidPlakoto } from "../game";

const BoardContainer = styled.div`
    position: relative;
`;

function Game({ player, roomStep, startingRolls, variant }) {
    const [boardState, setBoardState] = useState(null);

    useSocketOn("game/update-board", (board) => {
        setBoardState(board);
    });

    const doMove = (from, to) => socketEmit("game/move", from, to);
    const applyTurn = () => socketEmit("game/apply-turn");
    const undoTurn = () => socketEmit("game/undo");

    function isMoveValid(from, to) {
        if (variant === Variant.portes) return false;
        if (variant === Variant.plakoto) return isMoveValidPlakoto(from, to, boardState);
        if (variant === Variant.fevga) return false;
        else return false;
    }

    const getPossiblePips = (from) => {
        let possiblePips = new Set();

        for (const die of boardState.dice) {
            const to = clamp(from + die * boardState.turn);
            if (isMoveValid(from, to)) {
                possiblePips.add(to);
            }
        }

        return possiblePips;
    };

    return boardState === null ? null : (
        <>
            <BackgammonExtras
                boardState={boardState}
                applyTurn={applyTurn}
                undoTurn={undoTurn}
                player={player}
            />
            <BoardContainer>
                <BackgammonBoard
                    boardState={boardState}
                    doMove={doMove}
                    getPossiblePips={getPossiblePips}
                />
                {roomStep === RoomStep.startingRoll ? (
                    <BackgammonOverlay
                        dieWhite={startingRolls[Player.white]}
                        dieBlack={startingRolls[Player.black]}
                        player={player}
                    />
                ) : null}
            </BoardContainer>
        </>
    );
}

export default Game;
