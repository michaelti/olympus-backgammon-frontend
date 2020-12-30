import React from "react";
import { ListGroup, ListGroupItem, Button } from "reactstrap";
import { Player } from "../../util";

function BackgammonExtras({
    boardState: { turn, winner },
    applyTurn,
    undoMove,
    player,
    isTurn,
    score,
}) {
    return (
        <ListGroup horizontal="lg">
            <ListGroupItem>
                {`Score: White ${score[Player.white]}–${score[Player.black]} Black`}
            </ListGroupItem>
            <ListGroupItem>
                {player ? `Playing as ${Player.properties[player].colorName}` : "Spectating"}
            </ListGroupItem>
            <ListGroupItem>
                {winner !== null
                    ? `${Player.properties[winner].colorName} won!`
                    : turn !== null
                    ? `${Player.properties[turn].colorName}’s turn`
                    : null}
            </ListGroupItem>
            <ListGroupItem>
                <Button onClick={applyTurn} color="success" className="mr-3" disabled={!isTurn}>
                    &#10003; Finish turn
                </Button>
                <Button onClick={undoMove} disabled={!isTurn}>
                    &#8634; Undo
                </Button>
            </ListGroupItem>
        </ListGroup>
    );
}

export default BackgammonExtras;
