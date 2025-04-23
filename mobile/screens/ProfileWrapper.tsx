import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useUser } from '../context/UserContext';
import { ActivityIndicator, View, StyleSheet } from 'react-native';

export default function MyProfileWrapper() {
    const { isLoggedIn } = useUser();
    const navigation = useNavigation();
    const [checking, setChecking] = useState(true);

    useEffect(() => {
        if (isLoggedIn) {
            navigation.navigate("Profile" as never);
        } else {
            navigation.navigate("Login" as never);
        }
    }, [isLoggedIn]);

    if (checking) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color="#007AFF" />
            </View>
        );
    }

    return null;
}

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

