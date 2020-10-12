import React from "react";
import CheckerW from "./svg/checker-w.svg";
import CheckerB from "./svg/checker-b.svg";
import { Player } from "../../util.js";
import useMeasure from "react-use-measure";
import { ResizeObserver } from "@juggle/resize-observer";
import styled from "styled-components";
import { useTransition, animated } from "react-spring";
import { positions } from "./domPos";

const Stack = styled.div`
    height: 100%;
    display: flex;
    flex-direction: ${(props) => (props.reverse ? "column-reverse" : "column")};

    > img {
        position: relative;
        width: 100%;
        /* 
        &:first-child {
            margin-top: 0;
            margin-bottom: 0;
        } */
    }
`;

function CheckerStack({ size, top, bot, reverse, pipNum, recentMove }) {
    let checkers = Array(size);

    if (checkers.length > 0) {
        checkers.fill(top);
        checkers[0] = bot;
    }

    const [divRef, divBounds] = useMeasure({ scroll: true, polyfill: ResizeObserver });

    const checkerSize = divBounds.width;
    const overflow = checkers.length * checkerSize - divBounds.height;
    const squishAmount = overflow > 0 ? overflow / (checkers.length - 1) : 0;

    /** */
    const transitions = useTransition(checkers, (item, i) => `${item}${i}`, {
        from: () => {
            if (!(recentMove && recentMove.to === pipNum && positions?.[recentMove.from])) return;

            const from = positions[recentMove.from].getBoundingClientRect();
            const toX = divBounds.x;
            let toY = reverse
                ? divBounds.bottom - checkerSize - (checkers.length - 1) * checkerSize
                : divBounds.top + (checkers.length - 1) * checkerSize;

            if (overflow > 0)
                toY = reverse
                    ? divBounds.top - checkerSize + overflow / checkers.length
                    : divBounds.bottom - overflow / checkers.length;

            const translateX = from.x - toX;
            const translateY = from.y - toY;

            return {
                top: translateY,
                left: translateX,
                zIndex: 1,
            };
        },
        enter: { top: 0, left: 0, zIndex: 0 },
        leave: { visibility: "hidden" },
        update: { [reverse ? "marginTop" : "marginBottom"]: -squishAmount },
    });

    return (
        <Stack ref={divRef} reverse={reverse}>
            {transitions.map(({ item, props, key }) => (
                <animated.img
                    key={key}
                    src={item === Player.white ? CheckerW : CheckerB}
                    alt={Player.properties[item].colorName}
                    style={props}
                    ref={(el) => (positions[pipNum] = el)}
                />
            ))}
        </Stack>
    );
}

export default CheckerStack;
