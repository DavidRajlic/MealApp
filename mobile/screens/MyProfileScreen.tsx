import React from 'react';
import LoginScreen from './LoginScreen';
import ProfileScreen from './ProfileScreen';
import { useUser } from '../context/UserContext';

export default function MyProfileScreen() {
    const {user} = useUser()

    return (
        <>
            {
                user ?
                <ProfileScreen />
                :
                <LoginScreen />
            }
        </>
    );
}
