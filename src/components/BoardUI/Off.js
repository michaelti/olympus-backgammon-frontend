import React from "react";
import Checker from "./Checker";
import OffSVG from "./svg/off.svg";

function Off({ count, color, posX, invertY, disabled }) {
    const checkers = Array(count).fill(color);

    const squishAmount =
        checkers.length > 6 ? ((checkers.length - 6) * 100) / (checkers.length - 1) : 0;

    return (
        <g>
            <image href={OffSVG} width="100" height="600" x={posX} y={invertY ? "50%" : "0"} />

            {checkers.map((checker, i) => {
                const posY = i * (100 - squishAmount);
                return (
                    <Checker
                        key={i}
                        posX={posX}
                        posY={invertY ? 1100 - posY : posY}
                        color={checker}
                    />
                );
            })}
        </g>
    );
}

export default Off;
