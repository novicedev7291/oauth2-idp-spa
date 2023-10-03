import { useEffect, useState } from "react";
import { LocalStorage } from "./storage";
import { TOKEN_KEY } from "./utils";

function initialValue() {
    return LocalStorage.get(TOKEN_KEY);
}

export default function useLocalStorage(key, _defaultValue) {
    const [value, setValue] = useState(initialValue);

    useEffect(() => {
        LocalStorage.save(key, value);
    }, [key, value]);

    return [value, setValue];
}
