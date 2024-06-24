import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CustomTextInput from '../components/CustomTextInput';
import CustomButton from '../components/CustomButton';
import Background from '../components/Background';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Alert from '../components/Alert';

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isAlertVisible, setAlertVisible] = useState(false);

    const handlePasswordChange = useCallback((text) => {
        setPassword(text);
    }, []);

    const handleConfirmPasswordChange = useCallback((text) => {
        setConfirmPassword(text);
    }, []);

    const handleReset= () => {
            setAlertVisible(true);
            setTimeout(() => setAlertVisible(false), 2000);
    };

    return (
        <Background>
            <StatusBar backgroundColor="transparent" translucent barStyle="dark-content" />
            <View style={styles.container}>
                <View style={styles.header}>
                    <Icon name="arrow-back-ios" size={22} color="#333333" />
                </View>
                <View style={styles.title}>
                    <Text style={styles.forget_password_txt}>Reset Password</Text>
                </View>
                <View style={styles.description}>
                    <Text style={styles.description_txt}>Password must be 8 characters long and include atleast one uppercase letter, one number, and one special character.</Text>
                </View>
                <View style={styles.inputContainer}>
                    <View style={styles.inputs_view2}>
                        <CustomTextInput
                            leftIcon="lock-outline"
                            leftIconSize={24}
                            leftIconColor="#ADADAD"
                            placeholder="Your password"
                            placeholderTextColor="#ADADAD"
                            color={"black"}
                            value={password}
                            onChangeText={handlePasswordChange}
                            rightIcon="email"
                            rightIconSize={24}
                            rightIconColor="#ADADAD"
                            secureTextEntry={true}
                            autoCapitalize="none"
                        />
                    </View>
                    <View style={styles.inputs_view3}>
                        <CustomTextInput
                            leftIcon="lock-outline"
                            leftIconSize={24}
                            leftIconColor="#ADADAD"
                            placeholder="Confirm password"
                            placeholderTextColor="#ADADAD"
                            value={confirmPassword}
                            color={"black"}
                            onChangeText={handleConfirmPasswordChange}
                            rightIcon="email"
                            rightIconSize={24}
                            rightIconColor="#ADADAD"
                            secureTextEntry={true}
                            autoCapitalize="none"
                        />
                    </View>
                </View>
                <View style={styles.buttonContainer}>
                    <CustomButton
                        bgColor="#E3B12F"
                        borderRadius={100}
                        txtColor="#FFFFFF"
                        textStyle={{ fontSize: 19, fontWeight: '500', lineHeight: 22, }}
                        onPress={handleReset}
                        padding={10}
                        flex={1}
                        flexDirection={'row'}
                        justifyContent={'center'}
                    >
                        Reset
                    </CustomButton>
                </View>
                <Alert successMessage="password reset successfully" visible={isAlertVisible} />

            </View>
        </Background>
    );
};

export default ResetPassword;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: hp('4%'),
    },
    title: {
        justifyContent: 'flex-start',
        marginVertical: hp('1%'),
    },
    forget_password_txt: {
        fontSize: 28,
        fontWeight: '500',
        color: '#333333',
    },
    description: {
        margin: 10,
        marginTop: 10,
        marginLeft: 0,
    },
    description_txt: {
        fontWeight: '300',
        lineHeight: 17,
        color: '#676767',
    },
    inputContainer: {
        marginVertical: 50,
    },
    inputs_view2: {
        marginVertical: 10,
    },
    inputs_view3: {
        marginVertical: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 100,

    },
});