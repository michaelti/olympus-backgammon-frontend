import React from 'react';

function BackgammonBoard() {
    return (
        <svg width="500" height="400" viewBox="0 0 1500 1200">
            <defs>
                <symbol id="pip" width="100" height="600" viewBox="0 0 100 600">
                    <polygon points="50 500 100 0 0 0 50 500" fill="red" />
                </symbol>
            </defs>

            <g class="backgrounds">
                <rect class="background" width="1500" height="1200" fill="#402d26" />
                <rect class="bar" x="700" width="100" height="1200" fill="#201d16" />
                <rect class="off--left" width="100" height="1200" fill="#201d16" />
                <rect class="off--right" x="1400"  width="100" height="1200" fill="#201d16" />
            </g>

            <g class="pips">
                <g class="pips--top-left">
                    <use href="#pip" x="100" />
                    <use href="#pip" x="200" />
                    <use href="#pip" x="300" />
                    <use href="#pip" x="400" />
                    <use href="#pip" x="500" />
                    <use href="#pip" x="600" />
                </g>
                <g class="pips--top-right">
                    <use href="#pip" x="800" />
                    <use href="#pip" x="900" />
                    <use href="#pip" x="1000" />
                    <use href="#pip" x="1100" />
                    <use href="#pip" x="1200" />
                    <use href="#pip" x="1300" />
                </g>
                <g class="pips--bot-right">
                    <use href="#pip" x="100" transform="rotate(180, 750, 600)" />
                    <use href="#pip" x="200" transform="rotate(180, 750, 600)" />
                    <use href="#pip" x="300" transform="rotate(180, 750, 600)" />
                    <use href="#pip" x="400" transform="rotate(180, 750, 600)" />
                    <use href="#pip" x="500" transform="rotate(180, 750, 600)" />
                    <use href="#pip" x="600" transform="rotate(180, 750, 600)" />
                </g>
                <g class="pips--bot-left">
                    <use href="#pip" x="800" transform="rotate(180, 750, 600)" />
                    <use href="#pip" x="900" transform="rotate(180, 750, 600)" />
                    <use href="#pip" x="1000" transform="rotate(180, 750, 600)" />
                    <use href="#pip" x="1100" transform="rotate(180, 750, 600)" />
                    <use href="#pip" x="1200" transform="rotate(180, 750, 600)" />
                    <use href="#pip" x="1300" transform="rotate(180, 750, 600)" />
                </g>
            </g>
        </svg>
    );
}

export default BackgammonBoard;
