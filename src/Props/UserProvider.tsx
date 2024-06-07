import { useState, createContext, useContext } from "react";

const userContext = createContext(null);
const userToggleContext = createContext(null);

export function useUserContext() {
    return useContext(userContext);
}

export function useUserToggleContext() {
    return useContext(userToggleContext);
}

export function UserProvider(props:any) {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const activeUser = (userData:any) => {
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
    };

    return (
        <userContext.Provider value={user}>
            <userToggleContext.Provider value={activeUser}>
                {props.children}
            </userToggleContext.Provider>
        </userContext.Provider>
    );
}
