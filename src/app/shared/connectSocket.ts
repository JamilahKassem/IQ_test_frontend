'use client';
import { useEffect, useRef } from "react";
import config from "../config/config";

interface ConnectSocketProps {
    set_phase: (phase: number) => void;
    set_qid: (qid: number) => void;
    set_next: (next: number) => void;
    set_context: (socket: WebSocket | null) => void;
    debug: boolean;
}

interface SocketMessage {
    type: 'Pause' | 'Next' | 'End';
    a: number;
}

function ConnectSocket({ set_phase, set_qid, set_next, set_context, debug }: ConnectSocketProps) {
    const socket = useRef<WebSocket | null>(null);
    const port = config.portSocket;
    let reconnectTimeout: ReturnType<typeof setTimeout>;

    useEffect(() => {
        const connect = () => {
            // Replace port logic
            const url = window.location.toString().replace("3000", port.toString());
            socket.current = new WebSocket(url);
            set_context(socket.current);

            const onError = () => {
                if (debug) console.log("Socket Error");
                set_phase(0);
            };

            const onClose = () => {
                if (debug) console.log("Socket Closed");
                reconnectTimeout = setTimeout(() => { connect(); }, 2000);
                set_phase(1);
            };

            const onOpen = () => {
                if (debug) console.log("Socket Connected");
                clearTimeout(reconnectTimeout);
                set_phase(2);
            };

            const handleMessage = (event: MessageEvent) => {
                try {
                    const data: SocketMessage = JSON.parse(event.data);
                    if (debug) console.log("received message with", data);

                    if (data.type === 'Pause') {
                        set_phase(3);
                        set_next(data.a);
                    }
                    if (data.type === 'Next') {
                        if (data.a !== -1) {
                            set_phase(4);
                            set_qid(data.a);
                        }
                    }
                    if (data.type === 'End') {
                        set_phase(5);
                    }
                } catch (e) {
                    if (debug) console.error("Error parsing socket message", e);
                }
            };

            socket.current.addEventListener('open', onOpen);
            socket.current.addEventListener('close', onClose);
            socket.current.addEventListener('error', onError);
            socket.current.addEventListener('message', handleMessage);
        };

        connect();

        return () => {
            if (socket.current) {
                socket.current.removeEventListener('open', () => {});
                socket.current.removeEventListener('close', () => {});
                socket.current.removeEventListener('error', () => {});
                socket.current.removeEventListener('message', () => {});
                socket.current.close();
            }
            clearTimeout(reconnectTimeout);
        };
    }, [port, debug]);

    return null;
}

export default ConnectSocket;