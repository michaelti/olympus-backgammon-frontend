import React from 'react';
import usePlakoto from '../../hooks/usePlakoto';
import Pip from './Pip';
import Off from './Off';
import Bar from './Bar';

function BackgammonBoard() {
    const [boardState, handleClickPip] = usePlakoto();

    return (
        <svg width="500" height="400" viewBox="0 0 1500 1200">
            <rect className="background" width="1500" height="1200" fill="#402d26" />
            
            <Off posX={1400} invert count={boardState.offWhite} color="white" />
            <Off posX={0} invert />
            <Off posX={0} />
            <Off posX={1400} count={boardState.offBlack} color="black" />

            <Bar posX={700} invert count={boardState.barWhite} color="white" />
            <Bar posX={700} count={boardState.barBlack} color="black" />

            {boardState.pips.map((pip, i) => {
                if (i === 0) return null;
                
                const pipQuadrant = Math.ceil(i / 24 * 4);
                let [posX, invert] = [0, false];
                
                switch (pipQuadrant) {
                    case (1):
                        posX = 1400 - (i * 100);
                        invert = true;
                        break;
                    case (2):
                        posX = 700 - ((i - 6) * 100);
                        invert = true;
                        break;
                    case (3):
                        posX = ((i - 12) * 100);
                        break;
                    case (4):
                        posX = ((i - 18) * 100) + 700;
                        break;
                    default:
                        break;
                }

                return (
                    <Pip
                        key={i}
                        posX={posX}
                        invert={invert}
                        size={pip.size}
                        top={pip.top}
                        bot={pip.bot}
                        onClick={() => handleClickPip(i)}
                    />
                );
            })}


        </svg>
    );
}

export default BackgammonBoard;
