import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; 
import CustomTextInput from '../components/CustomTextInput';
import CustomButton from '../components/CustomButton';
import Background from '../components/Background';

const ForgetPassword = () => {
    return (
        <Background>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Icon name="arrow-back-ios" size={30} color="#000" />
                </View>
                <View style={styles.title}>
                    <Text style={{ fontSize: 24 }}>Forget Password</Text>
                </View>
                <View style={styles.description}>
                    <Text>Please enter your email address. We will send an OTP code for verification.</Text>
                </View>
                <View style={styles.inputContainer}>

                </View>
                <View style={styles.buttonContainer}>

                </View>
            </View>
        </Background>
    );
};

export default ForgetPassword;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    title: {
        alignItems: 'center',
        marginBottom: 20,
    },
    description: {
        marginBottom: 20,
        textAlign: 'center',
    },
    inputContainer: {
        
    },
    buttonContainer: {

    },
});