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

    const getPossiblePips = (pos0) => {
        let possiblePips = {};
        if (!boardState.dice[0]) return possiblePips;
        let boardMutate = { ...boards[variant](), ...clone(boardState) };
        let pos1, pos2;
        let pos = [];
        const die = boardState.dice;

        // Two unique dice remaining
        if (die.length === 2 && die[0] !== die[1]) {
            pos1 = getEndPip(pos0, die[1]);
            if (boardMutate.isMoveValid(pos0, pos1)) {
                possiblePips[pos1] = [pos1];
                boardMutate.doMove(pos0, pos1);
                pos2 = getEndPip(pos1, die[0]);
                if (boardMutate.isMoveValid(pos1, pos2)) possiblePips[pos2] = [pos1, pos2];
            }
        }

        boardMutate = { ...boards[variant](), ...clone(boardState) };
        pos[0] = pos0;
        for (let i = 1; i <= die.length; i++) {
            pos[i] = getEndPip(pos[i - 1], die[i - 1]);
            if (boardMutate.isMoveValid(pos[i - 1], pos[i])) {
                possiblePips[pos[i]] = pos.slice(1, i + 1);
                // Here we call doMove when we may not have to.
                boardMutate.doMove(pos[i - 1], pos[i]);
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
