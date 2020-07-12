import React from "react";
import styled from "styled-components";
import { Button } from "reactstrap";
import Die from "./Die";

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

function BackgammonOverlay({ dieWhite, dieBlack }) {
    return (
        <Overlay>
            <div>
                {dieWhite ? <Die number={1} /> : null}
                {!dieWhite || dieWhite === dieBlack ? <Button>Roll to go first</Button> : null}
            </div>
            <div>
                {dieBlack ? <Die number={1} /> : null}
                {!dieBlack || dieWhite === dieBlack ? <Button>Roll to go first</Button> : null}
            </div>
        </Overlay>
    );
}

export default BackgammonOverlay;
