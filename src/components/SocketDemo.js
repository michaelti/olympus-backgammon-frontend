import React, {useState, useEffect} from 'react';
import useSocket from '../hooks/useSocket';

function SocketDemo(props) {  
    const [roomName, setRoomName] = useState('');  
    const [joinName, setJoinName] = useState('');  

    const [socket, isConnected, isConnecting] = useSocket(props.socketUrl);
    
    useEffect(() => {
        // Receive successful joined room
        socket.on('event/joined-room', (roomName) => {
            setRoomName(roomName);
        });

        // Receive failed join room
        socket.on('event/failed-join-room', (roomName) => {
            console.log('Failed to join room because it does not exist.');
        });
    }, [socket]);

    const startRoom = () => {
        socket.emit('event/start-room');
    };

    const joinRoom = () => {
        socket.emit('event/join-room', joinName);
    };

    const handleChange = (event) => {
        setJoinName(event.target.value);
    };

    return (
        <div>
            status: {
                isConnecting ? 'Connecting' :
                isConnected ? 'Connected' :
                'Disconnected'
            }

            <br />

            room name: { roomName }

            <br />

            <button onClick={startRoom}>
                Start
            </button>
            <button onClick={joinRoom}>
                Join
            </button>
            <input type="text" placeholder="Room name to join" onChange={handleChange} />

        </div>
    );
}

export default SocketDemo;
