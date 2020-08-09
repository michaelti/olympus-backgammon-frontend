import React from "react";
import styled from "styled-components";
import BackgammonBoard from "./BoardUI/BackgammonBoard";
import BackgammonExtras from "./BoardUI/BackgammonExtras";
import BackgammonOverlay from "./BoardUI/BackgammonOverlay";
import { socketEmit } from "../api";
import { Player, RoomStep, Variant } from "../util";
import { clamp, isMoveValid } from "../game";

const BoardContainer = styled.div`
    position: relative;
`;

function Game({ player, roomStep, startingRolls, variant, boardState }) {
    const doMove = (from, to) => socketEmit("game/move", from, to);
    const applyTurn = () => socketEmit("game/apply-turn");
    const undoTurn = () => socketEmit("game/undo");

    const getPossiblePips = (from) => {
        let possiblePips = new Set();

        for (const die of boardState.dice) {
            const to = clamp(from + die * boardState.turn);
            if (isMoveValid[variant](from, to, boardState)) {
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
                isTurn={!process.env.REACT_APP_GAMEDEV ? player === boardState.turn : true}
            />
            <BoardContainer>
                <BackgammonBoard
                    boardState={boardState}
                    isTurn={!process.env.REACT_APP_GAMEDEV ? player === boardState.turn : true}
                    doMove={doMove}
                    getPossiblePips={getPossiblePips}
                    flipOffWhite={variant === Variant.fevga}
                />
                {roomStep === RoomStep.startingRoll ? (
                    <BackgammonOverlay
                        dieWhite={startingRolls[Player.white]}
                        dieBlack={startingRolls[Player.black]}
                        dieDraw={startingRolls.draw}
                        player={player}
                    />
                ) : null}
            </BoardContainer>
        </>
    );
}

export default Game;
