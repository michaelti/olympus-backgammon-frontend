import React from "react";
import BackgammonBoard from "./BoardUI/BackgammonBoard";
import BackgammonStartingRoll from "./BoardUI/BackgammonStartingRoll";
import { socketEmit } from "../api";
import { Player, RoomStep, Variant } from "../util";
import GameInfoButton from "./BoardUI/GameInfoButton";
import { cloneBoard } from "../game";

function Game({ player, roomStep, startingRolls, variant, boardState, score, roomName }) {
    const doMove = (from, tos) => {
        let currentFrom = from;
        tos.forEach((to) => {
            console.log(currentFrom, to);
            socketEmit("game/move", currentFrom, to);
            currentFrom = to;
        });
    };

    const applyTurn = () => socketEmit("game/apply-turn");
    const undoMove = () => socketEmit("game/undo-move");

    const getEndPip = (start, die) => {
        const clamp = (to) => (to < 0 ? 0 : to > 25 ? 25 : to);
        let end;
        if (variant === Variant.fevga) {
            if (boardState.turn === Player.white) {
                end = start - die;
                if (start >= 13 && end <= 12) end = 25;
                else if (end < 1) end += 24;
            } else {
                end = clamp(start - die);
            }
        } else {
            end = clamp(start + die * boardState.turn);
        }
        return end;
    };

    const getPossiblePips = (start) => {
        let possiblePips = {};
        if (!boardState.dice[0]) return possiblePips;
        let boardCopy = cloneBoard[variant](boardState);
        let pos = [start];
        const die = boardState.dice;

        // Two unique dice remaining
        if (die.length === 2 && die[0] !== die[1]) {
            pos[1] = getEndPip(pos[0], die[1]);
            if (boardCopy.isMoveValid(pos[0], pos[1])) {
                possiblePips[pos[1]] = [pos[1]];
                boardCopy.doMove(pos[0], pos[1]);
                pos[2] = getEndPip(pos[1], die[0]);
                if (boardCopy.isMoveValid(pos[1], pos[2])) possiblePips[pos[2]] = [pos[1], pos[2]];
            }
        }
        boardCopy = cloneBoard[variant](boardState);
        for (let i = 1; i <= die.length; i++) {
            pos[i] = getEndPip(pos[i - 1], die[i - 1]);
            if (boardCopy.isMoveValid(pos[i - 1], pos[i])) {
                possiblePips[pos[i]] = pos.slice(1, i + 1);
                // TODO Optimize: here we call doMove once more than we have to.
                boardCopy.doMove(pos[i - 1], pos[i]);
            } else break;
        }

        return possiblePips;
    };

    return boardState === null ? null : (
        <BackgammonBoard
            boardState={boardState}
            isTurn={!process.env.REACT_APP_GAMEDEV ? player === boardState.turn : true}
            doMove={doMove}
            getPossiblePips={getPossiblePips}
            flipOffWhite={variant === Variant.fevga}
            applyTurn={applyTurn}
            undoMove={undoMove}
            startingRollW={
                roomStep === RoomStep.startingRoll && (
                    <BackgammonStartingRoll
                        startingRolls={startingRolls}
                        player={player}
                        color={Player.white}
                    />
                )
            }
            startingRollB={
                roomStep === RoomStep.startingRoll && (
                    <BackgammonStartingRoll
                        startingRolls={startingRolls}
                        player={player}
                        color={Player.black}
                    />
                )
            }
            gameInfoButton={<GameInfoButton player={player} score={score} roomName={roomName} />}
        />
    );
}

export default Game;
