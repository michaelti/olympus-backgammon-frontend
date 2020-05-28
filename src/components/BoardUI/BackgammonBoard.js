import React, { useState } from 'react';
import Pip from './Pip';
import Off from './Off';

function BackgammonBoard() {
    const [boardState] = useState({
        pips: [
            { size: 0, top: '', bot: '' },
            { size: 3, top: 'white', bot: 'black' },
            { size: 0, top: 'white', bot: 'black' },
            { size: 0, top: 'white', bot: 'black' },
            { size: 0, top: 'white', bot: 'black' },
            { size: 0, top: 'white', bot: 'black' },
            { size: 0, top: 'white', bot: 'black' },
            { size: 0, top: 'white', bot: 'black' },
            { size: 0, top: 'white', bot: 'black' },
            { size: 0, top: 'white', bot: 'black' },
            { size: 0, top: 'white', bot: 'black' },
            { size: 0, top: 'white', bot: 'black' },
            { size: 0, top: 'white', bot: 'black' },
            { size: 0, top: 'white', bot: 'black' },
            { size: 0, top: 'white', bot: 'black' },
            { size: 0, top: 'white', bot: 'black' },
            { size: 0, top: 'white', bot: 'black' },
            { size: 0, top: 'white', bot: 'black' },
            { size: 0, top: 'white', bot: 'black' },
            { size: 0, top: 'white', bot: 'black' },
            { size: 0, top: 'white', bot: 'black' },
            { size: 0, top: 'white', bot: 'black' },
            { size: 0, top: 'white', bot: 'black' },
            { size: 0, top: 'white', bot: 'black' },
            { size: 0, top: 'white', bot: 'black' },
        ],
        offWhite: 0,
        offBlack: 0,
        barWhite: 0,
        barBlack: 0,
    });

    return (
        <svg width="500" height="400" viewBox="0 0 1500 1200" xmlns="http://www.w3.org/2000/svg">
            <rect className="background" width="1500" height="1200" fill="#402d26" />

            <rect className="bar--top" x="700" width="100" height="600" fill="#745138" />
            <rect className="bar--bot" y="600" x="700" width="100" height="600" fill="#745138" />
            <rect className="off--left-top" width="100" height="600" fill="#745138" />
            <rect className="off--left-bot" y="600" width="100" height="600" fill="#745138" />
            <rect className="off--right-top" x="1400" width="100" height="600" fill="#745138" />
            <rect className="off--right-bot" y="600" x="1400" width="100" height="600" fill="#745138" />

            {boardState.pips.slice(1,7).map((pip, i) => (
                <Pip
                    key={i}
                    posX={1300 - (i * 100)}
                    invert
                    size={pip.size}
                    top={pip.top}
                    bot={pip.bot}
                />
            ))}

            {boardState.pips.slice(7,13).map((pip, i) => (
                <Pip
                    key={i}
                    posX={600 - (i * 100)}
                    invert
                    size={pip.size}
                    top={pip.top}
                    bot={pip.bot}
                />
            ))}

            {boardState.pips.slice(13,19).map((pip, i) => (
                <Pip
                    key={i}
                    posX={100 + (i * 100)} 
                    size={pip.size} 
                    top={pip.top} 
                    bot={pip.bot} 
                />
            ))}

            {boardState.pips.slice(19,25).map((pip, i) => (
                <Pip
                    key={i}
                    posX={800 + (i * 100)} 
                    size={pip.size} 
                    top={pip.top} 
                    bot={pip.bot} 
                />
            ))}
        </svg>
    );
}

export default BackgammonBoard;
