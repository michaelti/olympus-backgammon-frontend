import React from 'react';
import Checker from './Checker';

function Pip({ size, top, bot, posX, invert }) {

    let checkers = Array(size);

    if (checkers.length > 0) {
        checkers.fill(top);
        checkers[0] = bot;
    }

    const squishAmount = checkers.length > 6 ?
        ((checkers.length - 6) * 100 / (checkers.length - 1)) : 0;

    return (
        <g>
            <svg x={posX} y={invert ? '50%' : '0'} width="100" height="600" viewBox="0 0 100 600">
                <polygon points="50 500 100 0 0 0 50 500" fill="#f7d086" style={{ transformOrigin: '50%', transform: invert ? 'rotate(180deg)' : 'none' }} />
                <rect height="100%" width="100%" fill="transparent"></rect>
            </svg>

            {checkers.map((checker, i) => (
                <Checker
                    key={i}
                    posX={posX}
                    posY={invert ? (1100 - (i * (100 - squishAmount))) : (i * (100 - squishAmount ))}
                    color={checker} />
            ))}
        </g>
    );
}

export default Pip;
