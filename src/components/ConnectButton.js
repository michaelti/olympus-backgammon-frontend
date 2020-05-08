import React, {useState} from 'react';

function ConnectButton() {    
    const [isConnecting, setIsConnecting] = useState(false);

    const handleClick = () => {
        setIsConnecting(true);
    };


    return (
        <button onClick={handleClick}>
            Connect (isConnecting: {isConnecting.toString()})
        </button>
    );
}

export default ConnectButton;
