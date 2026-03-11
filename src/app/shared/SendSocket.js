'use client'
export const sendSocket = (data, socketRef) => {
    if (!socketRef || socketRef.readyState !== WebSocket.OPEN) {
        return console.error("Socket not connected");
    }
    socketRef.send(JSON.stringify(data));
};