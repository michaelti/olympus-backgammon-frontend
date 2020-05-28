import React, { useState } from 'react';
import Checker from './Checker';
import Pip from './Pip';

function BackgammonBoard() {
    const [boardState, setBoardState] = useState({
        pips: [
            { size: 0, top: '', bot: '' },
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
            { size: 0, top: 'white', bot: 'black' },
        ],
        offWhite: 0,
        offBlack: 0,
        barWhite: 0,
        barBlack: 0,
    });

    return (
        <svg width="500" height="400" viewBox="0 0 1500 1200" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <symbol id="pip" width="100" height="600" viewBox="0 0 100 600">
                    <polygon points="50 500 100 0 0 0 50 500" fill="#f7d086" />
                </symbol>
            </defs>

            <g>
                <rect class="background" width="1500" height="1200" fill="#402d26" />
                <rect class="off--left" width="100" height="1200" fill="#745138" />
                <rect class="bar" x="700" width="100" height="1200" fill="#745138" />
                <rect class="off--right" x="1400"  width="100" height="1200" fill="#745138" />
            
                <g class="pips--top-left">
                    <use width="100" height="600" href="#pip" x="100" />
                    <use width="100" height="600" href="#pip" x="200" />
                    <use width="100" height="600" href="#pip" x="300" />
                    <use width="100" height="600" href="#pip" x="400" />
                    <use width="100" height="600" href="#pip" x="500" />
                    <use width="100" height="600" href="#pip" x="600" />
                </g>
                <g class="pips--top-right">
                    <use width="100" height="600" href="#pip" x="800" />
                    <use width="100" height="600" href="#pip" x="900" />
                    <use width="100" height="600" href="#pip" x="1000" />
                    <use width="100" height="600" href="#pip" x="1100" />
                    <use width="100" height="600" href="#pip" x="1200" />
                    <use width="100" height="600" href="#pip" x="1300" />
                </g>
                <g class="pips--bot-right">
                    <use width="100" height="600" href="#pip" x="100" transform="rotate(180, 750, 600)" />
                    <use width="100" height="600" href="#pip" x="200" transform="rotate(180, 750, 600)" />
                    <use width="100" height="600" href="#pip" x="300" transform="rotate(180, 750, 600)" />
                    <use width="100" height="600" href="#pip" x="400" transform="rotate(180, 750, 600)" />
                    <use width="100" height="600" href="#pip" x="500" transform="rotate(180, 750, 600)" />
                    <use width="100" height="600" href="#pip" x="600" transform="rotate(180, 750, 600)" />
                </g>
                <g class="pips--bot-left">
                    <use width="100" height="600" href="#pip" x="800" transform="rotate(180, 750, 600)" />
                    <use width="100" height="600" href="#pip" x="900" transform="rotate(180, 750, 600)" />
                    <use width="100" height="600" href="#pip" x="1000" transform="rotate(180, 750, 600)" />
                    <use width="100" height="600" href="#pip" x="1100" transform="rotate(180, 750, 600)" />
                    <use width="100" height="600" href="#pip" x="1200" transform="rotate(180, 750, 600)" />
                    <use width="100" height="600" href="#pip" x="1300" transform="rotate(180, 750, 600)" />
                </g>
            </g>

            <Pip data={boardState.pips[1]} />

            <Checker posX="1" posY="11" />
        </svg>
    );
}

export default BackgammonBoard;
