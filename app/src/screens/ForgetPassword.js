import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Formik } from 'formik';
import * as Yup from 'yup';
import CustomTextInput from '../components/CustomTextInput';
import CustomButton from '../components/CustomButton';
import Background from '../components/Background';
import AlertComponent from '../components/Alert';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ScrollView } from 'react-native-gesture-handler';

import { useDispatch, useSelector } from 'react-redux';
import { userForgetPassword, resetStatus } from '../redux/userSlice';

const validationSchema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email format')
        .required('Email is required'),
});

const ForgetPassword = ({ navigation }) => {
    const [loadingKey, setLoadingKey] = useState(null);
    const [focusedInput, setFocusedInput] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState('success');
    const [alertVisible, setAlertVisible] = useState(false);
    const dispatch = useDispatch();
    const forgetPasswordStatus = useSelector(state => state.user.forgetPasswordStatus);

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

    const handleSendCode = (values) => {
        handleButtonPress('sendCode', async () => {
            try {
                setLoadingKey('Send Code');
                const actionResult = await dispatch(userForgetPassword(values.email)).unwrap();
                console.log(actionResult);
                // Extract the OTP from the response
                const otp = actionResult.otp;
                setAlertMessage(actionResult.msg);
                setAlertType('success');
                setAlertVisible(true);
                setTimeout(() => {
                    setAlertVisible(false);
                    // navigation.navigate('OTP', { otp });
                    navigation.navigate('OTP', { otp, email: values.email });
                    dispatch(resetStatus());
                    setLoadingKey(null);
                }, 2000);

            } catch (error) {
                console.log(error);
                setAlertMessage(error.msg);
                setAlertType('error');
                setAlertVisible(true);
                setLoadingKey(null);
                setTimeout(() => setAlertVisible(false), 2000);
            }
        });
    };

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ flex: 1, }}>
            <Background>
                <StatusBar backgroundColor="transparent" translucent barStyle="dark-content" />
                <View style={styles.container}>
                    <AlertComponent successMessage={alertMessage} visible={alertVisible} type={alertType} />
                    <TouchableOpacity
                        style={styles.header}
                        onPress={() => navigation.navigate('SignIn')}
                    >
                        <Icon name="arrow-back-ios" size={22} color="#333333" />
                    </TouchableOpacity>
                    <View style={styles.title}>
                        <Text style={styles.forget_password_txt}>Forgot Password</Text>
                    </View>
                    <View style={styles.description_view}>
                        <Text style={styles.description_txt}>Please enter your account email address. We will send an OTP code for verification.</Text>
                    </View>

                    <Formik
                        initialValues={{ email: '' }}
                        validationSchema={validationSchema}
                        onSubmit={(values) => handleSendCode(values)}
                    >
                        {({ handleChange, handleSubmit, values, errors, touched }) => (
                            <>
                                <View style={styles.inputContainer}>
                                    <CustomTextInput
                                        leftIcon="email"
                                        leftIconSize={24}
                                        leftIconColor="#ADADAD"
                                        placeholder="abc@email.com"
                                        placeholderTextColor="#ADADAD"
                                        value={values.email}
                                        onChangeText={handleChange('email')}
                                        error={touched.email && errors.email}
                                        keyboardType="email-address"
                                        autoCapitalize="none"
                                        focusedInput={focusedInput}
                                        setFocusedInput={setFocusedInput}
                                    />
                                    {touched.email && errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
                                </View>
                                <View style={styles.buttonContainer}>
                                    <CustomButton
                                        buttonKey="Send Code"
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
                                        Send Code
                                    </CustomButton>
                                </View>
                            </>
                        )}
                    </Formik>
                </View>
            </Background>
        </ScrollView>
    );
};

export default ForgetPassword;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'transparent',
        flex: 1,
    },
    header: {

        flexDirection: 'row',
        alignItems: 'center',
        marginTop: hp('3%'),
        // marginVertical: hp('3%'),
    },
    title: {
        justifyContent: 'flex-start',
        marginVertical: hp('3%'),
    },
    forget_password_txt: {
        fontSize: 28,
        fontWeight: '500',
        color: '#333333',
    },
    description_view: {
        margin: 40,
        marginTop: 10,
        marginLeft: 0,
    },
    description_txt: {
        fontWeight: '300',
        lineHeight: 17,
        color: '#676767',
    },
    inputContainer: {

        height: hp('9%'),
        backgroundColor: 'transparent',
        justifyContent: 'center',
        marginVertical: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 168.42,
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginTop: 5,
    },
});
