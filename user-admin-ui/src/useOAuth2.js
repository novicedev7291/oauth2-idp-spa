import { useCallback, useRef, useState } from "react";
import {
    generateCode as randomCode,
    urlEncodeBase64,
    shaHash,
    createTokenUrl,
    OAUTH_CODE_KEY,
    STATE_KEY,
    createAuthorizeCodeUrl,
    processMessage
} from "./utils";
import { LocalStorage, SessionStorage } from "./storage";
import useLocalStorage from "./useLocalStorage";

const DIALOG_HEIGHT = 700;
const DIALOG_WIDTH = 600;

function openDialog(url) {
    const top = window.outerHeight / 2 + window.screenY - DIALOG_HEIGHT / 2;
    const left = window.outerWidth / 2 + window.screenX - DIALOG_WIDTH / 2;

    return window.open(
        url,
        parent,
        `height=${DIALOG_HEIGHT},width=${DIALOG_WIDTH},top=${top},left=${left}`
    );
}

function closeDialog(dialogRef) {
    dialogRef.current?.close();
}

function cleanup(dialogRef, intervalRef, handleMessageCallback) {
    closeDialog(dialogRef);
    clearInterval(intervalRef.current);
    SessionStorage.remove(OAUTH_CODE_KEY);
    SessionStorage.remove(STATE_KEY);
    window.removeEventListener('message', handleMessageCallback);
}


function defaultTokenFetcher(tokenAttrs) {
    const { clientId, redirectUri, tokenUrl, codeVerifier } = tokenAttrs;
    return async (code) => await fetch(
        createTokenUrl(tokenUrl, clientId, redirectUri, code, codeVerifier),
        {
            method: 'POST'
        }
    );
}

export function useOAuth({ authorizeUrl, clientId, redirectUri, scope, tokenUrl, tokenKey }) {
    const dialogRef = useRef();
    const intervalRef = useRef();
    const [{ loading, error }, setUI] = useState({ loading: false, error: null });
    const [value, setValue] = useLocalStorage(tokenKey, null);

    const getAuth = useCallback(async () => {
        setUI({
            loading: true,
            error: null,
        });

        const code = randomCode()
        SessionStorage.save(OAUTH_CODE_KEY, code);

        const codeChallenge = urlEncodeBase64(await shaHash(code, "SHA-256"));

        const state = randomCode();
        SessionStorage.save(STATE_KEY, state);

        dialogRef.current = openDialog(
            createAuthorizeCodeUrl(authorizeUrl, clientId, redirectUri, state, codeChallenge, scope, "S256")
        );

        function onSuccess(payload) {
            setValue(payload);
            setUI({ loading: false, error: null });
        }

        async function handleMessage(message) {
            try {
                const codeVerifier = SessionStorage.get(OAUTH_CODE_KEY);
                await processMessage(
                    message,
                    defaultTokenFetcher({ clientId, redirectUri, tokenUrl, codeVerifier }),
                    onSuccess,
                    (err) => setUI({ loading: false, error: err })
                );
            } catch (genericError) {
                console.log(genericError);
                setUI({
                    loading: false,
                    error: genericError.toString()
                });
            } finally {
                // clean everything here
                cleanup(dialogRef, intervalRef, handleMessage);
            }
        }
        window.addEventListener('message', handleMessage);

        intervalRef.current = setInterval(() => {
            const dialogClosed = !dialogRef.current || !dialogRef.current.window || dialogRef.current.window.closed;
            if (dialogClosed) {
                setUI((ui) => ({
                    ...ui,
                    loading: false,
                }));
                console.warn('Seems dialog was closed before the whole OAuth flow completed');
                cleanup(dialogRef, intervalRef, handleMessage);
            }
        }, 250);

        // Remove handlers on unmount
        return () => {
            window.removeEventListener('message', handleMessage);
            clearInterval(intervalRef.current);
        }

    }, [
        authorizeUrl,
        clientId,
        redirectUri,
        scope,
        tokenUrl,
        tokenKey
    ]);

    return { value, loading, error, getAuth };
}
