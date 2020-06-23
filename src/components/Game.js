import React from "react";
import { Container } from "reactstrap";
import BackgammonBoard from "./BoardUI/BackgammonBoard";
import BackgammonExtras from "./BoardUI/BackgammonExtras";

function Game({ boardState, doSubmove, applyTurn, undoTurn }) {
    return (
        <Container className="py-5">
            {boardState === null ? null : (
                <>
                    <BackgammonExtras
                        boardState={boardState}
                        applyTurn={applyTurn}
                        undoTurn={undoTurn}
                    />
                    <BackgammonBoard boardState={boardState} doSubmove={doSubmove} />
                </>
            )}
        </Container>
    );
}

export default Game;
