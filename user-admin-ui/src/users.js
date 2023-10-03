import { LocalStorage } from './storage';
import { TOKEN_KEY } from './utils';

const USER_SERVER_URL = "http://localhost:8080";

export async function allUsers() {
    let resp = await fetch(`${USER_SERVER_URL}/users`, {
        headers: {
            Authorization: `Bearer ${token()}`
        }
    });

    if (!resp.ok) {
        if (resp.status === 401) {
            invalidateToken();
        }
        console.error('Failed to load resource /users');
        return [];
    }

    let users = await resp.json();

    return users;
}
export async function createUser() {
    const id = Math.random().toString(16).substring(2, 11);
    const user = { id, createdAt: Date.now() }

    let resp = await fetch(`${USER_SERVER_URL}/users/new`, {
        headers: {
            Authorization: `Bearer ${token()}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user),
        method: 'POST'
    });

    if (resp.status !== 201) {
        if (resp.status === 401) {
            invalidateToken();
        }
        console.error('Failed to create the user');
        return null;
    }
    return user;
}

export async function getUser(id) {
    let resp = await fetch(`${USER_SERVER_URL}/users/${id}`, {
        headers: {
            Authorization: `Bearer ${token()}`
        }
    });

    if (!resp.ok) {
        if (resp.status === 401) {
            invalidateToken();
        }
        console.log(`Failed to load user by id : ${id}`);
        return null;
    }

    let user = await resp.json();
    return user ?? null;
}

export async function updateUser(id, updates) {
    let user = await getUser(id) || { id };
    Object.assign(user, updates);

    let resp = await fetch(`${USER_SERVER_URL}/users/${id}`, {
        headers: {
            Authorization: `Bearer ${token()}`,
            'Content-Type': 'application/json'
        },
        method: 'PUT',
        body: JSON.stringify(user)
    });

    if (!resp.ok) {
        if (resp.status === 401) {
            invalidateToken();
        }
        console.error(`Failed to update user with id : ${id}`);
        return null;
    }

    return user;
}

export async function deleteUser(id) {
    let resp = await fetch(`${USER_SERVER_URL}/users/${id}`, {
        headers: {
            Authorization: `Bearer ${token()}`
        },
        method: 'DELETE'
    });

    if (!resp.ok) {
        if (resp.status === 401) {
            invalidateToken();
        }
        console.error(`Failed to delete user with id : ${id}`);
        return false;
    }
    return true;
}

function token() {
    let tokenPayload = LocalStorage.get(TOKEN_KEY);
    return tokenPayload?.access_token;
}

function invalidateToken() {
    LocalStorage.remove(TOKEN_KEY);
}
