import React from 'react';
import Checker from './Checker';

function Bar({ count, color, posX, invert }) {
    const checkers = Array(count).fill(color);

    return (
        <g>
            <svg x={posX} y={invert ? '50%' : '0'} width="100" height="600" viewBox="0 0 100 600">
                <rect width="100" height="600" fill="#745138" />
            </svg>

            {checkers.map((checker, i) => (
                <Checker
                    key={i}
                    posX={posX}
                    posY={invert ? (1100 - (i * 100)) : (i * 100)}
                    color={checker} />
            ))}
        </g>
    );
}

export default Bar;
