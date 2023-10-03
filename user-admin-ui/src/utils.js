export const OAUTH_CODE_KEY = 'user-admin-oauth-code-key';
export const STATE_KEY = 'user-admin-oauth-state-key';
export const OAUTH_RESPONSE = 'user-admin-oauth-response';
export const TOKEN_KEY = "user-admin-ui-token";

export function generateCode() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomize = new Uint8Array(40);
    window.crypto.getRandomValues(randomize);
    randomize = randomize.map(n => chars.codePointAt(n % chars.length));
    return String.fromCodePoint.apply(null, randomize);
}

export async function shaHash(msg, algo) {
    let msgUint8 = new TextEncoder().encode(msg); // Converts msg into utf-8 encoded buffer
    let hashBuffer = await window.crypto.subtle.digest(algo, msgUint8); // Hash msg
    hashBuffer = Array.from(new Uint8Array(hashBuffer)); // convert buffer to byte array back

    //let hash = new TextDecoder().decode(new Uint8Array(hashBuffer));
    return hashBuffer.map(b => String.fromCharCode(b)).join("");
}

export function urlEncodeBase64(hash) {
    // Spring authorization server equivalent encoding i.e. URL encoding
    return window.btoa(hash)
        .replaceAll('+', '-')
        .replaceAll('/', '_')
        .replaceAll('=', '');
}

export function createAuthorizeCodeUrl(authorizeUrl, clientId, redirectUrl,
    state, codeChallenge, scope, challengeMethod) {
    return `${authorizeUrl}?response_type=code&client_id=${clientId}&redirect_uri=${redirectUrl}&state=${state}&code_challenge=${codeChallenge}&code_challenge_method=${challengeMethod}&scope=${scope}`;
}

export function createTokenUrl(tokenServerUrl, clientId, redirectUri,
    authorization_code, code_verifier) {
    return `${tokenServerUrl}?client_id=${clientId}&grant_type=authorization_code&redirect_uri=${redirectUri}&code=${authorization_code}&code_verifier=${code_verifier}`;
}

export async function processMessage(message, tokenFetcher, onTokenSuccess, onError) {
    const type = message && message.data && message.data.type;
    if (type === OAUTH_RESPONSE) {
        const errorMaybe = message.data.error;
        if (errorMaybe) {
            console.error(errorMaybe);
            onError(errorMaybe || 'Unknown error occurred while processing message');
        } else {
            const code = message.data.payload && message.data.payload.code;
            const resp = await tokenFetcher(code);
            if (!resp.ok) {
                onError('Failed to exchange code for token');
            } else {
                const payload = await resp.json();
                onTokenSuccess(payload);
            }
        }
        return;
    }

    console.error("Error: message type must be of OAUTH_RESPONSE type only!");
    onError('message type must be OAUTH_RESPONSE');
}
