import React, { useState } from 'react';
import Pip from './Pip';
import Off from './Off';
import Bar from './Bar';

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
        offWhite: 2,
        offBlack: 1,
        barWhite: 0,
        barBlack: 0,
    });

    return (
        <svg width="500" height="400" viewBox="0 0 1500 1200" xmlns="http://www.w3.org/2000/svg">
            <rect className="background" width="1500" height="1200" fill="#402d26" />

            <Bar
                posX={700}
                invert
                count={boardState.barWhite}
                color="white"
            />
            <Bar
                posX={700}
                count={boardState.barBlack}
                color="black"
            />
            
            <Off
                posX={1400}
                invert
                count={boardState.offWhite}
                color="white"
            />
            <Off posX={0} invert />
            <Off posX={0} />
            <Off
                posX={1400}
                count={boardState.offBlack}
                color="black" 
            />

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
