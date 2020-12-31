import React from "react";
import styled from "styled-components";
import { UncontrolledPopover, PopoverHeader, PopoverBody } from "reactstrap";
import { Player } from "../../util";

const Container = styled.div`
    background-color: #402d26;
    height: 100%;
    display: flex;
    justify-content: center;
    padding: 5px 0;
`;

const Button = styled.button`
    font: inherit;
    font-weight: bold;
    color: #fff;
    border: none;
    cursor: pointer;
    background-color: #745138;
    padding: 0;
    transition: background-color 0.15s;
    position: relative;
    width: 100%;
    height: 100%;

    &:hover,
    &:active,
    &:focus {
        background-color: #c49158;

        ::after {
            opacity: 1;
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

function GameInfoButton({ player, score }) {
    return (
        <Container>
            <Button aria-label="Info" id="game-info-popover">
                &#8942;
            </Button>
            <UncontrolledPopover placement="right" trigger="legacy" target="game-info-popover">
                <PopoverHeader>
                    Score: White {score[Player.white]} – {score[Player.black]} Black
                </PopoverHeader>
                <PopoverBody>
                    {player ? `Playing as ${Player.properties[player].colorName}` : "Spectating"}
                </PopoverBody>
            </UncontrolledPopover>
        </Container>
    );
}

export default GameInfoButton;
