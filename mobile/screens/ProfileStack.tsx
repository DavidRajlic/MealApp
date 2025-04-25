import React from 'react';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { useUser } from '../context/UserContext';

export default function MyProfileScreen() {
    const {isLoggedIn} = useUser()

    return (
        <>
            {
                isLoggedIn ?
                <ProfileScreen />
                :
                <LoginScreen />
            }
        </>
    );
}
