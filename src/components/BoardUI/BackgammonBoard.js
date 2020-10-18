import React, { useState } from "react";
import { Player } from "../../util.js";
import styled from "styled-components";
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
        "top-left p13 p14 p15 p16 p17 p18 top-mid p19 p20 p21 p22 p23 p24 top-right"
        "ui ui ui ui ui ui ui ui ui ui ui ui ui ui ui"
        "bot-left p12 p11 p10 p9 p8 p7 bot-mid p6 p5 p4 p3 p2 p1 bot-right";
`;

const PipLike = styled.div`
    grid-area: ${(props) => props.gridArea};

    cursor: ${(props) => (props.moveable || props.highlighted) && "pointer"};
    background-color: ${(props) => props.highlighted && "gray"} !important;

    div:last-child > img {
        box-shadow: ${(props) => props.active && "0 0 0 5px gray"};
    }
`;

const Pip = styled(PipLike)`
    background-color: #f7d086;
`;

const Bar = styled(PipLike)`
    background-color: #c49158;
`;

const Off = styled(PipLike)`
    background-color: #745138;
`;

const UI = styled(PipLike)``;

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
                            gridArea={i === 0 ? "bot-mid" : "top-mid"}>
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
                        gridArea={"p" + i}>
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
                gridArea={flipOffWhite ? "top-left" : "top-right"}
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
                gridArea="bot-right"
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
            <Off gridArea={flipOffWhite ? "top-right" : "top-left"}></Off>
            <Off gridArea="bot-left"></Off>
            {/* <!-- --> */}
            <UI gridArea="ui"></UI>
        </Board>
    );
}

export default BackgammonBoard2;
