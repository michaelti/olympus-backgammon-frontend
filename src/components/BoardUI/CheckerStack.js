import React from "react";
import CheckerW from "./svg/checker-w.svg";
import CheckerB from "./svg/checker-b.svg";
import { Player } from "../../util.js";
import useMeasure from "react-use-measure";
import styled from "styled-components";
import { useTransition, animated } from "react-spring";

const Stack = styled.div`
    height: 100%;
    display: flex;
    flex-direction: ${(props) => (props.reverse ? "column-reverse" : "column")};

    > img {
        width: 100%;
        /* margin-top: ${(props) => !props.reverse && props.squishAmount + "px"};
        margin-bottom: ${(props) => props.reverse && props.squishAmount + "px"};
        transition: margin-top 0.15s ease, margin-bottom 0.15s ease; */

        &:first-child {
            margin-top: 0;
            margin-bottom: 0;
        }
    }
`;

function CheckerStack({ size, top, bot, reverse }) {
    let checkers = Array(size);

    if (checkers.length > 0) {
        checkers.fill(top);
        checkers[0] = bot;
    }

    const [divRef, { height, width }] = useMeasure();

    const overflow = checkers.length * width - height;
    const squishAmount = overflow > 0 ? -(overflow / (checkers.length - 1)) : 0;

    /** */

    const transitions = useTransition(checkers, (_item, i) => i, {
        from: { transform: "translate(0,0)" },
        enter: { transform: "translate(0,0)" },
        leave: { transform: "translate(0,0)" },
        update: { [reverse ? "marginTop" : "marginBottom"]: squishAmount },
        unique: true,
        reset: true,
    });
    return (
        <Stack ref={divRef} reverse={reverse} squishAmount={squishAmount}>
            {transitions.map(({ item, props, key }) => (
                <animated.img
                    key={key}
                    src={item === Player.white ? CheckerW : CheckerB}
                    alt={Player.properties[item].colorName}
                    style={props}
                />
            ))}
        </Stack>
    );
}

export default CheckerStack;
