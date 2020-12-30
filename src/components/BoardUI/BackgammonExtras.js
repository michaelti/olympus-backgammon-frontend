import React from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import { Player } from "../../util";

function BackgammonExtras({ boardState: { turn, winner }, player, score }) {
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
                    : "Starting roll"}
            </ListGroupItem>
        </ListGroup>
    );
}

export default BackgammonExtras;
