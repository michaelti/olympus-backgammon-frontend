import React from "react";
import BackgammonBoard from "./BoardUI/BackgammonBoard";
import BackgammonStartingRoll from "./BoardUI/BackgammonStartingRoll";
import { socketEmit } from "../api";
import { Player, RoomStep, Variant } from "../util";
import GameInfoButton from "./BoardUI/GameInfoButton";

import clone from "ramda.clone";
import { boards } from "../game";

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

    const getEndPip = (start, die) => {
        const clamp = (to) => (to < 0 ? 0 : to > 25 ? 25 : to);
        let end;
        if (variant === Variant.fevga) {
            end = start - die;
            if (boardState.turn === Player.white) {
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

    const getPossiblePips = (startOf1) => {
        if (!boardState.dice[0]) return {};

        let boardMutate = { ...boards[variant](), ...clone(boardState) };

        let possiblePips = {};
        let endOf1, endOf2, endOf3, endOf4;
        const die = boardState.dice;

        if (die.length === 2 && die[0] !== die[1]) {
            endOf1 = getEndPip(startOf1, die[1]);
            if (boardMutate.isMoveValid(startOf1, endOf1)) {
                possiblePips[endOf1] = [endOf1];
                boardMutate.doMove(startOf1, endOf1);
                endOf2 = getEndPip(endOf1, die[0]);
                if (boardMutate.isMoveValid(endOf1, endOf2))
                    possiblePips[endOf2] = [endOf1, endOf2];
            }
        }

        boardMutate = { ...boards[variant](), ...clone(boardState) };

        endOf1 = getEndPip(startOf1, die[0]);
        if (boardMutate.isMoveValid(startOf1, endOf1)) {
            possiblePips[endOf1] = [endOf1];
            if (die.length === 1) return possiblePips;

            boardMutate.doMove(startOf1, endOf1);
            endOf2 = getEndPip(endOf1, die[1]);
            if (boardMutate.isMoveValid(endOf1, endOf2)) {
                possiblePips[endOf2] = [endOf1, endOf2];
                if (die.length === 2) return possiblePips;

                boardMutate.doMove(endOf1, endOf2);
                endOf3 = getEndPip(endOf2, die[2]);
                if (boardMutate.isMoveValid(endOf2, endOf3)) {
                    possiblePips[endOf3] = [endOf1, endOf2, endOf3];
                    if (die.length === 3) return possiblePips;

                    boardMutate.doMove(endOf2, endOf3);
                    endOf4 = getEndPip(endOf3, die[3]);
                    if (boardMutate.isMoveValid(endOf3, endOf4)) {
                        possiblePips[endOf4] = [endOf1, endOf2, endOf3, endOf4];
                    }
                }
            }
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
