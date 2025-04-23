// context/AuthContext.tsx
import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext({
    isLoggedIn: false,
    login: () => { },
    logout: () => { },
});

export const UserProvider = ({ children }: any) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const login = () => setIsLoggedIn(true);
    const logout = () => setIsLoggedIn(false);

    return (
        <UserContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
