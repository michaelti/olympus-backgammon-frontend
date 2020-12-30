import React from "react";
import styled from "styled-components";

const Buttons = styled.div`
    height: 100%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    justify-content: center;
    padding: 5px 0;
    margin: 0 -5px;
    gap: 5px;
`;

const Button = styled.button`
    font-family: inherit;
    font-weight: bold;
    color: inherit;
    border: none;
    cursor: pointer;
    background-color: ${(props) => (props.highlight ? "#ffffff" : "#f1d190")};
    padding: 0 0.5em;
    transition: background-color 0.15s;
    position: relative;

    &:hover,
    &:active,
    &:focus {
        background-color: #ffffff;

        ::after {
            opacity: 1;
        }
    }

    &:disabled {
        background-color: #f1d190;
        pointer-events: none;
        opacity: 0.5;

        ::after {
            opacity: 0;
        }
    }

    &::after {
        content: attr(aria-label);
        position: absolute;
        bottom: calc(100% + 5px);
        left: 50%;
        transform: translateX(-50%);
        pointer-events: none;
        background-color: #212121;
        color: #fff;
        font-weight: normal;
        font-size: 90%;
        padding: 0 0.5em;
        border-radius: 5px;
        white-space: nowrap;
        opacity: 0;
        transition: opacity 0.15s;
    }
`;

function BoardButtons({ applyTurn, undoMove, canUndo, shouldFinish }) {
    return (
        <Buttons>
            <Button onClick={applyTurn} highlight={shouldFinish} aria-label="Finish turn">
                &#10003;
            </Button>
            <Button onClick={undoMove} disabled={!canUndo} aria-label="Undo move">
                &#8634;
            </Button>
        </Buttons>
    );
}

export default BoardButtons;
