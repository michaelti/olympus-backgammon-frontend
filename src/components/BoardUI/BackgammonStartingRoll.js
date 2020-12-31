import React from "react";
import Die from "./Die";
import { socketEmit } from "../../api";
import styled from "styled-components";

const Container = styled.div`
    height: 100%;
    display: flex;
    justify-content: center;
    padding: 5px 0;
`;

const Button = styled.button`
    font-family: inherit;
    color: inherit;
    border: none;
    cursor: pointer;
    padding: 0.5em 1em;
    background-color: #f1d190;
    transition: background-color 0.15s;

    &:hover,
    &:active,
    &:focus {
        background-color: #ffffff;
    }
`;

function BackgammonStartingRoll({ player, color, startingRolls }) {
    const doStartingRoll = () => {
        socketEmit("room/starting-roll");
    };

    const die = startingRolls[color] || startingRolls.draw;

    return (
        <Container>
            {die ? <Die number={die} /> : null}
            {player === color && !startingRolls[color] ? (
                <Button onClick={doStartingRoll}>
                    {!startingRolls.draw ? "Roll to go first" : "Roll again"}
                </Button>
            ) : null}
        </Container>
    );
}

export default BackgammonStartingRoll;
