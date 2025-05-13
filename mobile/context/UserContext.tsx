// context/AuthContext.tsx
import React, { createContext, useContext, useState } from 'react';
import { User } from '../util/types';
import { LoginProps, RegisterProps } from '../http/api';
import { useLoginMutation, useRegisterMutation } from '../http/mutations';

type UserContextType = {
    isLoggedIn: boolean,
    user?: User,
    login: (data: LoginProps) => void,
    register: (data: RegisterProps) => void,
    logout: () => void
}

const UserContext = createContext<UserContextType | null>(null);

export function useUser() {
    const userCtx = useContext(UserContext)
    
    if(useContext === null)
        throw new Error("User ctx is null!")

    return userCtx
}

export const UserProvider = ({ children }: any) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState<User | undefined>(undefined);

    const loginMutation = useLoginMutation();
    const registerMutation = useRegisterMutation();

    const login = async (data: LoginProps) => {
        try {
            const { token } = await loginMutation.mutateAsync(data);
            // Optionally store token in localStorage/cookies
            setIsLoggedIn(true);
            // You might want to fetch the user or decode token
            setUser({ email: data.email } as User); // Replace with real user fetching
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    const register = async (data: RegisterProps) => {
        try {
            const newUser = await registerMutation.mutateAsync(data);
            setIsLoggedIn(true);
            setUser(newUser);
        } catch (error) {
            console.error("Registration failed:", error);
        }
    };

    const logout = () => {
        setIsLoggedIn(false);
        setUser(undefined);
        // Also clear token if using localStorage/cookies
    };

    const value: UserContextType = {
        isLoggedIn,
        user,
        login,
        register,
        logout
    };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};