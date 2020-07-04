import React, { useState } from "react";
import { ListGroup, ListGroupItem, Button } from "reactstrap";
import { Player } from "../../util";
import Dice from "./Dice";

function BackgammonExtras({ boardState: { turn, dice }, applyTurn, undoTurn }) {
    const [initialDice, setInitialDice] = useState(dice);
    const [prevTurn, setPrevTurn] = useState(turn);

    if (prevTurn !== turn) {
        setPrevTurn(turn);
        setInitialDice(dice);
    }

    return (
        <ListGroup horizontal="lg">
            <ListGroupItem>Turn: {Player.properties[turn].colorName}</ListGroupItem>
            <ListGroupItem>
                <Dice initialDice={initialDice} remainingDice={dice} />
            </ListGroupItem>
            <ListGroupItem>
                <Button onClick={applyTurn} color="success">
                    Submit turn
                </Button>
            </ListGroupItem>
            <ListGroupItem>
                <Button onClick={undoTurn}>Undo</Button>
            </ListGroupItem>
        </ListGroup>
    );
}

export default BackgammonExtras;
