import { useEffect } from "react";
import { OAUTH_RESPONSE, STATE_KEY } from "./utils";
import { SessionStorage } from "./storage";

function checkState(state) {
    return SessionStorage.get(STATE_KEY)  === state;
}

function queryToObj(query) {
    const params = new URLSearchParams(query);
    return Object.fromEntries(params);
}

export default function AuthDialog() {
    useEffect(() => {
        const payload = queryToObj(window.location.search.split('?')[1]);
        const state = payload && payload.state;
        const error = payload && payload.error;

        // If no opener was present, has user closed parent?
        if (!window.opener) {
             throw new Error('No opener window was present, can\'t continue');
        }

        if (error) {
            window.opener.postMessage({
                type: OAUTH_RESPONSE,
                error: decodeURI(error) || 'OAuth error: An error has occurred'
            });
        } else if (state && checkState(state)) {
            window.opener.postMessage({
                type: OAUTH_RESPONSE,
                payload,
            });
        } else {
            window.opener.postMessage({
                type: OAUTH_RESPONSE,
                error: 'OAuth error: state didn\'t match'
            });
        }
    }, []);
    return (
        <div style={{ margin: '14px' }}>
            <span>Loading...</span>
        </div>
    );
}
