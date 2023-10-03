
export class SessionStorage {
    static save(key, value) {
        sessionStorage.setItem(key, value);
    }

    static remove(key) {
        sessionStorage.removeItem(key);
    }

    static get(key) {
        return sessionStorage.getItem(key);
    }
}


export class LocalStorage {
    static save(key, value) {
        if (!localStorage) {
            return false;
        }

        if (value instanceof Object) {
            value = JSON.stringify(value);
        }

        localStorage.setItem(key, value);
    }

    static remove(key) {
        localStorage.removeItem(key);
    }

    static get(key) {
        let value = localStorage.getItem(key);
        if (value && (value.charAt(0) === '{' || value.charAt(0) === '[')) {
            try {
                return JSON.parse(value);
            } catch (error) {
                console.error(error);
                return null;
            }
        }

        return value;
    }
}
