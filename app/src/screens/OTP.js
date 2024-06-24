import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CustomButton from '../components/CustomButton';
import Background from '../components/Background';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Alert from '../components/Alert';

const OTP = () => {
    const [otp, setOtp] = useState(['', '', '', '']);
    const [isResendEnabled, setIsResendEnabled] = useState(false);
    const [timer, setTimer] = useState(60);
    const [borderColors, setBorderColors] = useState(['#cccccc', '#cccccc', '#cccccc', '#cccccc']);
    const inputRefs = useRef([]);

    const [isAlertVisible, setAlertVisible] = useState(false);

    const handleResendCode = () => {
        if (isResendEnabled) {
            console.log('Code resent');
            setIsResendEnabled(false);
            setTimer(60);
            setAlertVisible(true);
            setTimeout(() => setAlertVisible(false), 2000);
            startTimer();
        }
    };

    useEffect(() => {
        startTimer();
        return () => clearInterval(countdown);
    }, []);

    const startTimer = () => {
        clearInterval(countdown);
        const countdown = setInterval(() => {
            setTimer((prevTimer) => {
                if (prevTimer <= 1) {
                    clearInterval(countdown);
                    setIsResendEnabled(true);
                    return 0;
                }
                return prevTimer - 1;
            });
        }, 1000);
    };

    const handleOtpChange = (text, index) => {
        const newOtp = [...otp];
        newOtp[index] = text;
        setOtp(newOtp);

        if (text && index < 3) {
            inputRefs.current[index + 1].focus();
            changeBorderColor(index + 1, '#E3B12F');
        }
    };

    const handleFocus = (index) => {
        changeBorderColor(index, '#E3B12F');
    };

    const handleBlur = (index) => {
        if (!otp[index]) {
            changeBorderColor(index, '#ADADAD');
        }
    };

    const changeBorderColor = (index, color) => {
        const newBorderColors = [...borderColors];
        newBorderColors[index] = color;
        setBorderColors(newBorderColors);
    };

    const handleKeyPress = ({ nativeEvent }, index) => {
        if (nativeEvent.key === 'Backspace' && !otp[index]) {
            if (index > 0) {
                inputRefs.current[index - 1].focus();
                const newOtp = [...otp];
                newOtp[index - 1] = '';
                setOtp(newOtp);
                changeBorderColor(index - 1, '#ADADAD');
            }
        }
    };

    return (
        <Background>
            <StatusBar backgroundColor="transparent" translucent barStyle="dark-content" />
            <View style={styles.container}>
                <View style={styles.header}>
                    <Icon name="arrow-back-ios" size={22} color="#333333" />
                </View>
                <View style={styles.title}>
                    <Text style={styles.forget_password_txt}>You've got mail</Text>
                </View>
                <View style={styles.description}>
                    <Text style={styles.description_txt}>
                        We have sent the OTP verification code to your email address. Check your email and enter the code below.
                    </Text>
                </View>
                <View style={styles.inputContainer}>
                    {otp.map((digit, index) => (
                        <TextInput
                            key={index}
                            ref={(ref) => (inputRefs.current[index] = ref)}
                            style={[styles.otpInput, { borderColor: borderColors[index] }]}
                            value={digit}
                            onChangeText={(text) => handleOtpChange(text, index)}
                            onFocus={() => handleFocus(index)}
                            onBlur={() => handleBlur(index)}
                            onKeyPress={(e) => handleKeyPress(e, index)}
                            maxLength={1}
                            keyboardType="numeric"
                            textAlign='center'
                            color="#000"
                        />
                    ))}
                </View>
                <View style={styles.resend_text_view}>
                    <TouchableOpacity onPress={handleResendCode} disabled={!isResendEnabled}>
                        <Text style={[styles.resend_text, !isResendEnabled && styles.resend_text_disabled]}>Resend Code</Text>
                    </TouchableOpacity>
                    <Text style={styles.in_text}> in </Text>
                    <Text style={styles.timer_text}>{timer} s</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <CustomButton
                        bgColor="#E3B12F"
                        borderRadius={100}
                        txtColor="#FFFFFF"
                        textStyle={{ fontSize: 19, fontWeight: '500', lineHeight: 22 }}
                        onPress={() => console.log('OTP confirmed', otp.join(''))}
                        padding={10}
                        flex={1}
                        flexDirection={'row'}
                        justifyContent={'center'}
                    >
                        Confirm
                    </CustomButton>
                </View>
                <Alert successMessage="code resent successfully" visible={isAlertVisible} />
            </View>
        </Background>
    );
};

export default OTP;

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
        margin: 20,
        marginTop: 10,
        marginLeft: 0,
    },
    description_txt: {
        fontWeight: '300',
        lineHeight: 17,
        color: '#676767',
    },
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: hp('10%'),
    },
    otpInput: {
        width: wp('12%'),
        height: wp('12%'),
        borderColor: '#ADADAD',
        borderWidth: 1,
        borderRadius: 6,
        backgroundColor: 'transparent',
        justifyContent:'center',
        alignItems: 'center',
        fontSize: 18,
        fontWeight: 'bold',
    },
    resend_text_view: {
        backgroundColor: 'transparent',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: hp('2%'),
    },
    resend_text: {
        fontSize: hp('2%'),
        fontWeight: '500',
        lineHeight: 22,
        color: '#E3B12F',
    },
    resend_text_disabled: {
        color: '#ADADAD',
    },
    in_text: {
        fontSize: hp('2%'),
        fontWeight: '300',
        lineHeight: 25,
        color: '#676767',
    },
    timer_text: {
        fontSize: hp('2%'),
        fontWeight: '300',
        lineHeight: 25,
        color: '#676767',
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
