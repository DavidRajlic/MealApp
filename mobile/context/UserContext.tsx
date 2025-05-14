// context/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '../util/types';
import { LoginProps, RegisterProps } from '../http/api';
import { useLoginMutation, useRegisterMutation } from '../http/mutations';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STPORAGE_USER_KEY = 'UserData'

type UserContextType = {
    user?: User,
    login: (data: LoginProps) => void,
    register: (data: RegisterProps) => void,
    logout: () => void,
    getToken: () => Promise<string | undefined>
}

const UserContext = createContext<UserContextType | null>(null);

export function useUser() {
    const userCtx = useContext(UserContext)
    
    if(userCtx === null)
        throw new Error("User ctx is null!")

    return userCtx
}

export const UserProvider = ({ children }: any) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState<User | undefined>(undefined);
    const [token, setToken] = useState<string | undefined>(undefined)

    const loginMutation = useLoginMutation();
    const registerMutation = useRegisterMutation();

    useEffect(() => {
        async function loadUser() {
            const data = await AsyncStorage.getItem(STPORAGE_USER_KEY)
            console.log("SAVED DATA: " + data)
            if(!data)
                return
            const json = JSON.parse(data) as any as {token: string, user: User}
            setToken(json.token)
            setUser(json.user)
        }
        loadUser()
    }, [])

    const login = async (loginProps: LoginProps) => {
        try {
            const data = await loginMutation.mutateAsync(loginProps);
            AsyncStorage.setItem(STPORAGE_USER_KEY, JSON.stringify(data))
            setIsLoggedIn(true);
            setUser(data.user);
            setToken(data.token)
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    const register = async (data: RegisterProps) => {
        try {
            await registerMutation.mutateAsync(data);
            return login({email: data.email, password: data.password})
        } catch (error) {
            console.error("Registration failed:", error);
        }
    };

    const logout = () => {
        setIsLoggedIn(false);
        setUser(undefined);
        AsyncStorage.removeItem(STPORAGE_USER_KEY)
    };

    async function getToken() {
        return token
    }

    const value: UserContextType = {
        user,
        login,
        register,
        logout,
        getToken
    };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};