import React from 'react';

function BackgammonBoard() {
    return (
        <svg width="500" height="400" viewBox="0 0 1500 1200">
            <defs>
                <symbol id="pip-odd" width="100" height="500" viewBox="0 0 100 500">
                    <polygon points="50 500 100 0 0 0 50 500" fill="#f7d086" />
                </symbol>

                <symbol id="pip-even" width="100" height="500" viewBox="0 0 100 500">
                    <polygon points="50 500 100 0 0 0 50 500" fill="#f7d086" />
                </symbol>

                <symbol id="pip--group">
                    <use href="#pip-odd"  x="0" />
                    <use href="#pip-even" x="100" />
                    <use href="#pip-odd"  x="200" />
                    <use href="#pip-even" x="300" />
                    <use href="#pip-odd"  x="400" />
                    <use href="#pip-even" x="500" />
                </symbol>
            </defs>

            <rect class="background" width="1500" height="1200" fill="#402d26" />
            <rect class="bar" x="700" width="100" height="1200" fill="#201d16" />
            <rect class="off--left" width="100" height="1200" fill="#201d16" />
            <rect class="off--right" x="1400"  width="100" height="1200" fill="#201d16" />

            <g class="pips">
                <use href="#pip--group" transform="translate(100)" />
                <use href="#pip--group" transform="translate(800)" />
                <use href="#pip--group" transform="translate(100) rotate(180, 300, 600)" />
                <use href="#pip--group" transform="translate(100) rotate(180, 650, 600)" />
            </g>

        </svg>
    );
}

export default BackgammonBoard;
