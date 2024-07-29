import React, { useCallback } from 'react';
import { BackHandler } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

const useBackButtonHandler = (navigation) => {
    useFocusEffect(
        useCallback(() => {
            const onBackPress = () => {
                const state = navigation.getState();
                if (state.routes[state.index]?.name === 'Tab') {
                    const tabState = state.routes[state.index]?.state;
                    if (tabState?.routes[tabState.index]?.name === 'HomeTab') {
                        console.log('Exiting app...'); // Debugging line
                        BackHandler.exitApp();
                        return true; // Prevent default back action
                    }
                }
                return false; // Allow default back action
            };

            BackHandler.addEventListener('hardwareBackPress', onBackPress);

            return () => {
                BackHandler.removeEventListener('hardwareBackPress', onBackPress);
            };
        }, [navigation])
    );
};

export default useBackButtonHandler;
