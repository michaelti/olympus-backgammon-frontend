import { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io(process.env.REACT_APP_BACKEND_URL);

export const useListener = (eventName, callback) => {
    useEffect(() => {
        socket.on(eventName, callback);
        return () => socket.off(eventName, callback);
    }, [eventName, callback]);
};

export const doEmitter = (eventName, ...args) => {
    socket.emit(eventName, ...args);
};

export const useConnectionStatus = () => {
    const [isConnected, setIsConnected] = useState(socket.connected);

    useListener("connect", () => setIsConnected(true));
    useListener("disconnect", () => setIsConnected(false));

    return [isConnected];
};
