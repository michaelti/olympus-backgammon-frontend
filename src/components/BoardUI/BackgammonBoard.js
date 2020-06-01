import React from 'react';
import usePlakoto from '../../hooks/usePlakoto';
import Pip from './Pip';
import Off from './Off';
import Bar from './Bar';

function BackgammonBoard() {
    const [boardState, handleClickPip] = usePlakoto();

    return (
        <svg viewBox="0 0 1500 1200" style={{ width: '100%' }}>
            <rect className="background" width="1500" height="1200" fill="#402d26" />
            
            <Off posX={1400} invertY count={boardState.offWhite} color="white" />
            <Off posX={0} invertY />

            <Off posX={0} />
            <Off posX={1400} count={boardState.offBlack} color="black" />

            <Bar posX={700} invertY count={boardState.barWhite} color="white" />
            <Bar posX={700} count={boardState.barBlack} color="black" />

            {boardState.pips.map((pip, i) => {
                if (i === 0) return null;
                
                const pipQuadrant = Math.ceil(i / 24 * 4);
                let [posX, invertY] = [0, false];
                
                switch (pipQuadrant) {
                    case (1):
                        posX = 1400 - (i * 100);
                        invertY = true;
                        break;
                    case (2):
                        posX = 700 - ((i - 6) * 100);
                        invertY = true;
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
                        invertY={invertY}
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
