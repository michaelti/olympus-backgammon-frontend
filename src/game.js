import clone from "ramda.clone";
import { portes, plakoto, fevga } from "olympus-bg";
import { Variant } from "./util";

export const isNextMoveValid = function (from, to, board, variant) {
    // Create a deep copy of the board
    const modifiedBoard = clone(board);

    // Assume that we have a top checker on the pip to move from
    modifiedBoard.pips[from].top = board.turn;
    modifiedBoard.pips[from].size++;

    // Assume that this checker might have previously moved off of the bar
    // No need to also touch the aliased "pip", as isMoveValid doesn't look at that
    if (board.bar && board.bar[board.turn].size > 0) {
        modifiedBoard.bar[board.turn].size--;
    }

    // Validate the move using the modified board
    return isMoveValid[variant](from, to, modifiedBoard);
};

export const isMoveValid = {
    [Variant.portes]: (from, to, board) =>
        ({ ...portes.Board(), ...clone(board) }.isMoveValid(from, to)),
    [Variant.plakoto]: (from, to, board) =>
        ({ ...plakoto.Board(), ...clone(board) }.isMoveValid(from, to)),
    [Variant.fevga]: (from, to, board) =>
        ({ ...fevga.Board(), ...clone(board) }.isMoveValid(from, to)),
};
