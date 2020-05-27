import React from 'react';

const Pip = ({ oddEven="odd", ...props }) => {
    const odd = (
        <svg width="100" height="500" viewBox="0 0 100 500" { ...props }>
            <polygon points="50 500 100 0 0 0 50 500" fill="red" />
        </svg>
    );

    const even = (
        <svg width="100" height="500" viewBox="0 0 100 500" { ...props }>
            <polygon points="50 500 100 0 0 0 50 500" fill="red" />
        </svg>
    );

    return (
        oddEven === 'odd' ? odd :
        oddEven === 'even' ? even :
        null
    );
};

function BackgammonBoard() {



    return (
        <svg width="500" height="400" viewBox="0 0 1500 1200">
            <defs>
                <symbol id="pip--group">
                    <Pip x="0" oddEven="odd" />
                    <Pip x="100" oddEven="even" />
                    <Pip x="200" oddEven="odd" />
                    <Pip x="300" oddEven="even" />
                    <Pip x="400" oddEven="odd" />
                    <Pip x="500" oddEven="even" />
                </symbol>
            </defs>

            <g class="backgrounds">
                <rect class="background" width="1500" height="1200" fill="#402d26" />
                <rect class="bar" x="700" width="100" height="1200" fill="#201d16" />
                <rect class="off--left" width="100" height="1200" fill="#201d16" />
                <rect class="off--right" x="1400"  width="100" height="1200" fill="#201d16" />
            </g>

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
