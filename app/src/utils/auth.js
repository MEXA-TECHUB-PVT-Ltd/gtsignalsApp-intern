import AsyncStorage from '@react-native-async-storage/async-storage';

const AUTH_KEY = 'userAuthToken';

export const saveAuthToken = async (token) => {
    try {
        await AsyncStorage.setItem(AUTH_KEY, token);
    } catch (e) {
        console.error('Failed to save auth token:', e);
    }
};

export const getAuthToken = async () => {
    try {
        return await AsyncStorage.getItem(AUTH_KEY);
    } catch (e) {
        console.error('Failed to fetch auth token:', e);
        return null;
    }
};

export const removeAuthToken = async () => {
    try {
        await AsyncStorage.removeItem(AUTH_KEY);
    } catch (e) {
        console.error('Failed to remove auth token:', e);
    }
};

export const hasAuthToken = async () => {
    try {
        const token = await AsyncStorage.getItem(AUTH_KEY);
        return token !== null;
    } catch (e) {
        console.error('Failed to check auth token:', e);
        // Optionally, notify the user or handle the error in a user-friendly way
        return false;
    }
};
