import { useState, useEffect, Children, cloneElement } from "react";
import useSocket from "../hooks/useSocket";

function SocketManager({ children }) {
    const [socket, isConnected, isConnecting] = useSocket(process.env.REACT_APP_BACKEND_URL);

    const [roomName, setRoomName] = useState("");
    const [boardState, setBoardState] = useState(null);

    useEffect(() => {
        /* GAME EVENT LISTENERS */

        // Game event: Receive updated board object
        socket.on("game/update-board", (board) => setBoardState(board));
    }, [socket]);

    /* ROOM EVENT EMITTERS */

    // Start a room, receive confirmation and room name
    const startRoom = () => {
        socket.emit("event/start-room", (acknowledgement) => {
            if (!acknowledgement.ok) {
                console.log(`Failed to start room "${acknowledgement.roomName}".`);
            } else {
                setRoomName(acknowledgement.roomName);
            }
        });
    };

    // Join a room, receive confirmation and room name
    const joinRoom = (roomName) => {
        socket.emit("event/join-room", roomName, (acknowledgement) => {
            if (!acknowledgement.ok) {
                console.log(`Failed to join room "${acknowledgement.roomName}".`);
            } else {
                setRoomName(acknowledgement.roomName);
            }
        });
    };

    /* GAME EVENT EMITTERS */

    // Send a submove to the server
    const doSubmove = (from, to) => socket.emit("game/submove", from, to);

    // Tell the server our turn is complete
    const applyTurn = () => socket.emit("game/apply-turn");

    // Tell the server to undo our submoves
    const undoTurn = () => socket.emit("game/undo");

    /* */
    /* */
    /* Render the child components, passing down all of the managed props  */

    return Children.map(children, (child) => {
        return cloneElement(child, {
            roomName,
            isConnecting,
            isConnected,
            boardState,
            startRoom,
            joinRoom,
            doSubmove,
            applyTurn,
            undoTurn,
        });
    });
}

export default SocketManager;
