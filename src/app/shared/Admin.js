'use client'
import { request } from './connectHTTP';

function NextQeustion({ debug }) {
    const fetchData = async () => {
        try {
            await request(`next`,debug);
        } catch (err) {}
    };
    fetchData().then(() => {
        if (debug) {console.log("fetsh done")}
    });
}

export default NextQeustion
