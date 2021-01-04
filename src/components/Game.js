import React from "react";
import BackgammonBoard from "./BoardUI/BackgammonBoard";
import BackgammonStartingRoll from "./BoardUI/BackgammonStartingRoll";
import { socketEmit } from "../api";
import { Player, RoomStep, Variant } from "../util";
import { clamp, isMoveValid, isNextMoveValid } from "../game";
import GameInfoButton from "./BoardUI/GameInfoButton";

function Game({ player, roomStep, startingRolls, variant, boardState, score, roomName }) {
    const doMove = (from, tos) => {
        let currentFrom = from;
        tos.forEach((to) => {
            socketEmit("game/move", currentFrom, to);
            currentFrom = to;
        });
    };

    const applyTurn = () => socketEmit("game/apply-turn");
    const undoMove = () => socketEmit("game/undo-move");

    const getTo = (from, die) => {
        let to;
        if (variant === Variant.fevga) {
            to = from - die;
            if (boardState.turn === Player.white) {
                if (from >= 13 && to <= 12) to = 25;
                else if (to < 1) to += 24;
            } else {
                to = clamp(from - die);
            }
        } else {
            to = clamp(from + die * boardState.turn);
        }
        return to;
    };

    const getPossiblePips = (from) => {
        let possiblePips = new Set();
        let to, to2, to3, to4;
        const die = boardState.dice;

        switch (die.length) {
            case 1:
                to = getTo(from, die[0]);
                if (isMoveValid[variant](from, to, boardState)) possiblePips.add(to);
                break;
            case 2:
                to = getTo(from, die[0]);
                to2 = getTo(from, die[0] + die[1]);
                if (isMoveValid[variant](from, to, boardState)) {
                    possiblePips.add(to);
                    if (isNextMoveValid(to, to2, boardState, variant)) possiblePips.add(to2);
                }
                to = getTo(from, die[1]);
                if (isMoveValid[variant](from, to, boardState)) {
                    possiblePips.add(to);
                    if (isNextMoveValid(to, to2, boardState, variant)) possiblePips.add(to2);
                }
                break;
            case 3:
                to = getTo(from, die[0]);
                if (isMoveValid[variant](from, to, boardState)) {
                    possiblePips.add(to);
                    to2 = getTo(from, die[0] + die[1]);
                    if (isNextMoveValid(to, to2, boardState, variant)) {
                        possiblePips.add(to2);
                        to3 = getTo(from, die[0] + die[1] + die[2]);
                        if (isNextMoveValid(to2, to3, boardState, variant)) {
                            possiblePips.add(to3);
                        }
                    }
                }
                break;
            case 4:
                to = getTo(from, die[0]);
                if (isMoveValid[variant](from, to, boardState)) {
                    possiblePips.add(to);
                    to2 = getTo(from, die[0] + die[1]);
                    if (isNextMoveValid(to, to2, boardState, variant)) {
                        possiblePips.add(to2);
                        to3 = getTo(from, die[0] + die[1] + die[2]);
                        if (isNextMoveValid(to2, to3, boardState, variant)) {
                            possiblePips.add(to3);
                            to4 = getTo(from, die[0] + die[1] + die[2] + die[3]);
                            if (isNextMoveValid(to3, to4, boardState, variant)) {
                                possiblePips.add(to4);
                            }
                        }
                    }
                }
                break;
            default:
                break;
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
