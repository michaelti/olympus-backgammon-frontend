import React from 'react';
import { ListGroup, ListGroupItem, Button } from 'reactstrap';

function BackgammonExtras({ boardState }) {
    return (
        <ListGroup horizontal="lg">
            <ListGroupItem>
                Turn: { boardState.turn.name }
            </ListGroupItem>
            <ListGroupItem>
                Dice: { JSON.stringify(boardState.dice) }
            </ListGroupItem>
            <ListGroupItem>
                <Button color="success">Submit turn</Button>
            </ListGroupItem>
            <ListGroupItem>
                <Button>Undo</Button>
            </ListGroupItem>
        </ListGroup>
    );
}

export default BackgammonExtras;
