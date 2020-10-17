import React, { useState } from "react";
import { Player } from "../../util.js";
import styled, { css } from "styled-components";
import CheckerStack from "./CheckerStack";

const Board = styled.div`
    background: #402d26;
    width: 100%;
    height: 75vh;
    display: grid;
    grid-template-columns: repeat(15, minmax(0, 1fr));
    grid-template-rows: minmax(0, 1fr) 50px minmax(0, 1fr);
    grid-gap: 5px;
    grid-template-areas:
        "o-tl p13 p14 p15 p16 p17 p18 b-t p19 p20 p21 p22 p23 p24 o-tr"
        "ui ui ui ui ui ui ui ui ui ui ui ui ui ui ui"
        "o-bl p12 p11 p10 p9 p8 p7 b-b p6 p5 p4 p3 p2 p1 o-br";
`;

const Pip = styled.div`
    background-color: #f7d086;

    ${(props) =>
        props.moveable &&
        css`
            cursor: pointer;
        `}
    ${(props) =>
        props.highlighted &&
        css`
            cursor: pointer;
            background-color: gray !important;
        `}
    ${(props) =>
        props.active &&
        css`
            div:last-child > img {
                box-shadow: 0 0 0 5px gray;
            }
        `};
`;

const Bar = styled.div`
    background-color: #c49158;

    ${(props) =>
        props.moveable &&
        css`
            cursor: pointer;
        `}

    ${(props) =>
        props.active &&
        css`
            div:last-child > img {
                box-shadow: 0 0 0 5px gray;
            }
        `}
`;

const Off = styled.div`
    background-color: #745138;

    ${(props) =>
        props.highlighted &&
        css`
            cursor: pointer;
            background-color: gray !important;
        `};
`;

function BackgammonBoard2({
    boardState: { pips, off, turn, recentMove },
    isTurn,
    doMove,
    getPossiblePips,
    flipOffWhite,
}) {
    const [moving, setMoving] = useState(false);
    const [sourcePip, setSourcePip] = useState(undefined);
    const [highlightedPips, setHighlightedPips] = useState(null);

    const clearMove = () => {
        setHighlightedPips(null);
        setSourcePip(undefined);
        setMoving(false);
    };

    const startMove = (from) => {
        if (isTurn && pips[from].top === turn && pips[from].size > 0) {
            setMoving(true);
            setSourcePip(from);
            setHighlightedPips(getPossiblePips(from));
        }
    };

    const handleClickPip = (clickedPip) => {
        if (!moving) startMove(clickedPip);
        else {
            // We are moving; complete the move if it's valid (and not to the bar)
            if (highlightedPips.has(clickedPip) && clickedPip !== 0 && clickedPip !== 25) {
                doMove(sourcePip, clickedPip);
                clearMove();
            } else {
                // Try to start a new move if this one wasn't valid
                clearMove();
                startMove(clickedPip);
            }
        }
    };

    const handleClickOff = (clickedOff) => {
        if (moving) {
            if (clickedOff === Player.white) doMove(sourcePip, 25);
            if (clickedOff === Player.black) doMove(sourcePip, 0);
            clearMove();
        }
    };

    return (
        <Board>
            {pips.map((pip, i) => {
                if (i === 0 || i === 25)
                    return (
                        <Bar
                            key={i}
                            onClick={() => handleClickPip(i)}
                            active={i === sourcePip}
                            moveable={isTurn && pip.top === turn && pip.size > 0}
                            style={{ gridArea: i === 0 ? "b-b" : "b-t" }}>
                            <CheckerStack
                                size={pip.size}
                                top={pip.top}
                                bot={pip.bot}
                                reverse={i > 12}
                                recentMove={recentMove}
                                pipNum={i}
                            />
                        </Bar>
                    );

                return (
                    <Pip
                        key={i}
                        onClick={() => handleClickPip(i)}
                        active={i === sourcePip}
                        highlighted={highlightedPips?.has(i)}
                        moveable={isTurn && pip.top === turn && pip.size > 0}
                        style={{ gridArea: "p" + i }}>
                        <CheckerStack
                            size={pip.size}
                            top={pip.top}
                            bot={pip.bot}
                            reverse={i <= 12}
                            recentMove={recentMove}
                            pipNum={i}
                        />
                    </Pip>
                );
            })}
            {/* <!-- --> */}
            <Off
                style={{ gridArea: flipOffWhite ? "o-tl" : "o-tr" }}
                onClick={() => handleClickOff(Player.white)}
                highlighted={highlightedPips?.has(25)}>
                <CheckerStack
                    size={off[Player.white]}
                    top={Player.white}
                    bot={Player.white}
                    reverse={false}
                    recentMove={recentMove}
                    pipNum={25}
                />
            </Off>
            <Off
                style={{ gridArea: "o-br" }}
                onClick={() => handleClickOff(Player.black)}
                highlighted={highlightedPips?.has(0)}>
                <CheckerStack
                    size={off[Player.black]}
                    top={Player.black}
                    bot={Player.black}
                    reverse={true}
                    recentMove={recentMove}
                    pipNum={0}
                />
            </Off>
            {/* <!-- --> */}
            <Off style={{ gridArea: flipOffWhite ? "o-tr" : "o-tl" }}></Off>
            <Off style={{ gridArea: "o-bl" }}></Off>
            {/* <!-- --> */}
            <div style={{ gridArea: "ui" }}></div>
        </Board>
    );
}

export default BackgammonBoard2;
