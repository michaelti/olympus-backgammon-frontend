import React from 'react';

function Checker({ posX, posY, onClick }) {
    const translateX = posX * 1/15 * 100 + '%';
    const translateY = posY * 100 + 'px';
    const transform = `translate( ${translateX}, ${translateY} )`;

    return (
        <g style={{ transform: transform, transition: 'transform 0.15s ease' }}>
            <svg width="100" height="100" viewBox="0 0 100 100">
                <defs>
                    <linearGradient id="linear-gradient" x1="14.64" y1="14.64" x2="85.36" y2="85.36" gradientUnits="userSpaceOnUse">
                        <stop offset="0" stop-color="#e6e6e6"/>
                        <stop offset="1" stop-color="#fff"/>
                    </linearGradient>
                    <linearGradient id="linear-gradient-2" x1="14.64" y1="85.36" x2="85.36" y2="14.64" href="#linear-gradient"/>
                    <linearGradient id="linear-gradient-3" x1="14.64" y1="14.64" x2="85.36" y2="85.36" gradientUnits="userSpaceOnUse">
                        <stop offset="0" stop-color="#e6e6e6"/>
                        <stop offset="1" stop-color="#fff"/>
                    </linearGradient>
                </defs>
                <circle cx="50" cy="50" r="50" fill="url(#linear-gradient)"/>
                <path d="M50,25A25,25,0,1,1,25,50,25,25,0,0,1,50,25M50,0a50,50,0,1,0,50,50A50,50,0,0,0,50,0Z" fill="url(#linear-gradient-2)"/>
                <path d="M50,20A30,30,0,1,1,20,50,30,30,0,0,1,50,20M50,0a50,50,0,1,0,50,50A50,50,0,0,0,50,0Z" fill="url(#linear-gradient-3)"/>
            </svg>
        </g>
    );
}

export default Checker;
