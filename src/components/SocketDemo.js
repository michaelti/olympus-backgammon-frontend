import React, {useState, useEffect} from 'react';
import useSocket from '../hooks/useSocket';

function SocketDemo() {    
    const [messages, setMessages] = useState([]);
    const [latency, setLatency] = useState(null);

    const [socket, isConnected, isConnecting] = useSocket('http://localhost:3001');
    
    useEffect(() => {
        socket.on('pong', (latency) => {
            setLatency(latency);
        });

        socket.on('message', (data) => {
            setMessages((m) => [...m, data].slice(-5));
        });
    }, [socket]);

    return (
        <div>
            status: {
                isConnecting ? 'Connecting' :
                isConnected ? 'Connected' :
                'Disconnected'
            }
            <br />

            latency: { latency } ms
            <br />

            messages: {
                messages.map((message, i) => (
                    <div key={i}>
                        { message }
                    </div>
                ))
            }
        </div>
    );
}

export default SocketDemo;
