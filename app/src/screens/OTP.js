import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CustomButton from '../components/CustomButton';
import Background from '../components/Background';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Alert from '../components/Alert';
import { Formik } from 'formik';
import * as Yup from 'yup';

const OTP = ({ navigation, route }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [loadingKey, setLoadingKey] = useState(null);
    const [otp, setOtp] = useState(['', '', '', '']);
    const [isResendEnabled, setIsResendEnabled] = useState(false);
    const [timer, setTimer] = useState(60);
    const [borderColors, setBorderColors] = useState(['#cccccc', '#cccccc', '#cccccc', '#cccccc']);
    const inputRefs = useRef([]);
    const [isAlertVisible, setisAlertVisible] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState('success');
    const [alertVisible, setAlertVisible] = useState(false);

    // const { otp: serverOtp } = route.params || {}; // Extract OTP from navigation params
    const { otp: serverOtp, email: email } = route.params || {};
    // console.log(email);

    const handleButtonPress = (buttonKey, callback) => {
        setLoadingKey(buttonKey);
        setTimeout(() => {
            const userValidated = true;
            if (userValidated) {
                callback();
            } else {
                setLoadingKey(null);
            }
        }, 1000);
    };

    const handleConfirm = (values) => {
        if (otp.join('') === serverOtp) {
            handleButtonPress('Confirm', () => {
                // navigation.navigate('ResetPassword');
                navigation.navigate('ResetPassword', { email: route.params.email });
                // console.log(email);
                setLoadingKey(null);
            });
        } else {
            setAlertMessage('Invalid OTP');
            setAlertType('error');
            setAlertVisible(true);
            setTimeout(() => setAlertVisible(false), 1000);
        }
    };

    const handleResendCode = () => {
        if (isResendEnabled) {
            console.log('Code resent');
            setIsResendEnabled(false);
            setTimer(60);
            setisAlertVisible(true);
            setTimeout(() => setisAlertVisible(false), 2000);
        }
    };

    useEffect(() => {
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

        return () => clearInterval(countdown);
    }, [isResendEnabled]);

    const handleOtpChange = (text, index, setFieldValue) => {
        const newOtp = [...otp];
        newOtp[index] = text;
        setOtp(newOtp);
        setFieldValue(`otp[${index}]`, text);

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

    const handleKeyPress = ({ nativeEvent }, index, setFieldValue) => {
        if (nativeEvent.key === 'Backspace' && !otp[index]) {
            if (index > 0) {
                inputRefs.current[index - 1].focus();
                const newOtp = [...otp];
                newOtp[index - 1] = '';
                setOtp(newOtp);
                setFieldValue(`otp[${index - 1}]`, '');
                changeBorderColor(index - 1, '#ADADAD');
            }
        }
    };

    const validationSchema = Yup.object().shape({
        otp: Yup.array()
            .of(Yup.string().length(1, 'Must be exactly 1 digit').required('Required'))
            .min(4, 'Enter 4 digit OTP')
            .max(4, 'Enter 4 digit OTP')
    });

    return (
        <Formik
            initialValues={{ otp: ['', '', '', ''] }}
            validationSchema={validationSchema}
            onSubmit={handleConfirm}
        >
            {({ handleSubmit, setFieldValue, errors, touched }) => (
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={{ flex: 1 }}>
                        <Background>
                            <StatusBar backgroundColor="transparent" translucent barStyle="dark-content" />
                            <View style={styles.container}>
                                <TouchableOpacity
                                    onPress={() => navigation.navigate('ForgetPassword')}
                                    style={styles.header}>
                                    <Icon name="arrow-back-ios" size={22} color="#333333" />
                                </TouchableOpacity>
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
                                            style={[
                                                styles.otpInput,
                                                { borderColor: borderColors[index] },
                                                touched.otp && errors.otp && errors.otp[index] && { borderColor: 'red' },
                                            ]}
                                            value={digit}
                                            onChangeText={(text) => handleOtpChange(text, index, setFieldValue)}
                                            onFocus={() => handleFocus(index)}
                                            onBlur={() => handleBlur(index)}
                                            onKeyPress={(e) => handleKeyPress(e, index, setFieldValue)}
                                            maxLength={1}
                                            keyboardType="numeric"
                                            textAlign='center'
                                            color="#000"
                                        />
                                    ))}
                                </View>
                                {errors.otp && touched.otp && <Text style={styles.errorText}>Enter 4 digit OTP</Text>}
                                <View style={styles.resend_text_view}>
                                    <TouchableOpacity onPress={handleResendCode} disabled={!isResendEnabled}>
                                        <Text style={[styles.resend_text, !isResendEnabled && styles.resend_text_disabled]}>Resend Code</Text>
                                    </TouchableOpacity>
                                    <Text style={styles.in_text}> in </Text>
                                    <Text style={styles.timer_text}>{timer} s</Text>
                                </View>
                                <View style={styles.buttonContainer}>
                                    <CustomButton
                                        buttonKey="Confirm"
                                        isLoading={!!loadingKey}
                                        currentLoadingKey={loadingKey}
                                        loaderColor="#FFF"
                                        bgColor="#E3B12F"
                                        borderRadius={100}
                                        txtColor="#FFFFFF"
                                        textStyle={{ fontSize: 19, fontWeight: '500', lineHeight: 22 }}
                                        onPress={handleSubmit}
                                        padding={10}
                                        flex={1}
                                        flexDirection={'row'}
                                        justifyContent={'center'}
                                    >
                                        Confirm
                                    </CustomButton>
                                </View>
                                <Alert successMessage={alertMessage} visible={alertVisible} type={alertType} />
                                <Alert successMessage="code resent successfully" visible={isAlertVisible} />
                            </View>
                        </Background>
                    </View>
                </TouchableWithoutFeedback>
            )}
        </Formik>
    );
};

export default OTP;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'transparent',
        marginVertical: hp('3%'),
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
        marginTop: hp('8%'),
    },
    otpInput: {
        width: wp('12%'),
        height: wp('12%'),
        borderColor: '#ADADAD',
        borderWidth: 1,
        borderRadius: 6,
        backgroundColor: 'transparent',
        justifyContent: 'center',
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
        color: '#E3B12F',
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
    errorText: {
        color: 'red',
        textAlign: 'center',
        marginTop: hp('2%'),
    },
});
