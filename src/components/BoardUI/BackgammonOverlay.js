import React from "react";
import styled from "styled-components";
import { Button } from "reactstrap";
import Die from "./Die";
import { socketEmit } from "../../api";
import { Player } from "../../util";

const Overlay = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.25);
    color: #ffffff;
    display: flex;
    padding: 0 3.333%;

    > div {
        flex: 0 0 50%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
`;

function BackgammonOverlay({ dieWhite, dieBlack, player }) {
    const doStartingRoll = () => {
        socketEmit("room/starting-roll");
    };

    return (
        <Overlay>
            <div>
                {dieWhite ? <Die number={dieWhite} /> : null}
                {player === Player.white && (!dieWhite || dieWhite === dieBlack) ? (
                    <Button onClick={doStartingRoll}>Roll to go first</Button>
                ) : null}
            </div>
            <div>
                {dieBlack ? <Die number={dieBlack} /> : null}
                {player === Player.black && (!dieBlack || dieWhite === dieBlack) ? (
                    <Button onClick={doStartingRoll}>Roll to go first</Button>
                ) : null}
            </div>
        </Overlay>
    );
}

export default BackgammonOverlay;
