import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MyProfileWrapper from '../screens/ProfileWrapper';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ProfileScreen from '../screens/ProfileScreen';

export type MyProfileStackParamList = {
    MyProfileWrapper: undefined;
    Login: undefined;
    Register: undefined;
    Profile: undefined;
};

const Stack = createNativeStackNavigator<MyProfileStackParamList>();

export default function MyProfileStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="MyProfileWrapper" component={MyProfileWrapper} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
        </Stack.Navigator>
    );
}
