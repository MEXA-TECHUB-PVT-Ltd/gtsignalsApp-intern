import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Formik } from 'formik';
import * as Yup from 'yup';
import CustomTextInput from '../components/CustomTextInput';
import CustomButton from '../components/CustomButton';
import Background from '../components/Background';
import AlertComponent from '../components/Alert';

import { useDispatch, useSelector } from 'react-redux';
import { resetPassword, resetStatus } from '../redux/userSlice';

const validationSchema = Yup.object().shape({
    password: Yup.string()
        .required('Password is required')
        .min(8, 'Password must be at least 8 characters long')
        .matches(/\d/, 'Password must contain at least one number')
        .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .matches(/[!@#$%^&*]/, 'Password must contain at least one special character (!@#$%^&*)'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm Password is required'),
});

const ResetPassword = ({ navigation, route }) => {

    const { email } = route.params || {};
    // console.log(email);

    const [loadingKey, setLoadingKey] = useState(null);
    const [focusedInput, setFocusedInput] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState('success');
    const [alertVisible, setAlertVisible] = useState(false);
    const dispatch = useDispatch();
    const resetPasswordStatus = useSelector(state => state.user.resetPasswordStatus);

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

    const handleResetPassword = (values) => {
        handleButtonPress('resetPassword', async () => {
            try {
                setLoadingKey('Reset Password');
                const actionResult = await dispatch(resetPassword({
                    email: email,
                    password: values.newPassword
                })).unwrap();

                console.log(actionResult);
                setAlertMessage(actionResult.msg);
                setAlertType('success');
                setAlertVisible(true);
                setTimeout(() => {
                    setAlertVisible(false);
                    // navigation.navigate('SignIn');
                    dispatch(resetStatus());
                    setLoadingKey(null);
                }, 2000);

            } catch (error) {
                console.error(error);
                setAlertMessage(error.msg);
                setAlertType('error');
                setAlertVisible(true);
                setLoadingKey(null);
                setTimeout(() => setAlertVisible(false), 2000);
            }
        });
    };

    // const handleReset = () => {
    //     handleButtonPress('Reset', () => {
    //         setLoadingKey(null);
    //         setAlertVisible(true);
    //         setTimeout(() => {
    //             setAlertVisible(false);
    //             navigation.navigate('SignIn');
    //         }, 2000);
    //     });
    // };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <Background>
                <StatusBar backgroundColor="transparent" translucent={true} barStyle="dark-content" />
                <View style={styles.container}>
                    <TouchableOpacity
                        style={styles.header}
                        onPress={() => navigation.navigate('OTP')}
                    >
                        <Icon name="arrow-back-ios" size={22} color="#333333" />
                    </TouchableOpacity>
                    <View style={styles.title}>
                        <Text style={styles.forget_password_txt}>Reset Password</Text>
                    </View>
                    <View style={styles.description}>
                        <Text style={styles.description_txt}>Password must be 8 characters long and include at least one uppercase letter, one number, and one special character.</Text>
                    </View>

                    <Formik
                        initialValues={{ password: '', confirmPassword: '' }}
                        validationSchema={validationSchema}
                        onSubmit={(values) => handleResetPassword(values)}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                            <View style={styles.inputContainer}>
                                <View style={styles.inputs_view}>
                                    <CustomTextInput
                                        leftIcon="lock-outline"
                                        leftIconSize={24}
                                        leftIconColor="#ADADAD"
                                        placeholder="Your password"
                                        placeholderTextColor="#ADADAD"
                                        color={"black"}
                                        value={values.password}
                                        onChangeText={handleChange('password')}
                                        onBlur={handleBlur('password')}
                                        secureTextEntry={true}
                                        autoCapitalize="none"
                                        focusedInput={focusedInput}
                                        setFocusedInput={setFocusedInput}
                                    />
                                    {touched.password && errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
                                </View>
                                <View style={styles.inputs_view}>
                                    <CustomTextInput
                                        leftIcon="lock-outline"
                                        leftIconSize={24}
                                        leftIconColor="#ADADAD"
                                        placeholder="Confirm password"
                                        placeholderTextColor="#ADADAD"
                                        value={values.confirmPassword}
                                        color={"black"}
                                        onChangeText={handleChange('confirmPassword')}
                                        onBlur={handleBlur('confirmPassword')}
                                        secureTextEntry={true}
                                        autoCapitalize="none"
                                        focusedInput={focusedInput}
                                        setFocusedInput={setFocusedInput}
                                    />
                                    {touched.confirmPassword && errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}
                                </View>
                                <View style={styles.buttonContainer}>
                                    <CustomButton
                                        buttonKey="Reset"
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
                                        Reset
                                    </CustomButton>
                                </View>
                            </View>
                        )}
                    </Formik>
                    <AlertComponent successMessage={alertMessage} visible={alertVisible} type={alertType} />

                </View>

            </Background>
        </TouchableWithoutFeedback>
    );
};

export default ResetPassword;

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        backgroundColor: 'transparent',
    },
    header: {
        marginTop: StatusBar.currentHeight,

        flexDirection: 'row',
        alignItems: 'center',
        // marginVertical: hp('2%'),
        backgroundColor: 'transparent',
    },
    title: {
        justifyContent: 'flex-start',
        marginVertical: 20,
    },
    forget_password_txt: {
        fontSize: 23,
        fontWeight: '500',
        lineHeight: 27,
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
        marginVertical: 10,
    },
    inputs_view: {
        height: hp('11%'),
        marginVertical: 5,
    },
    buttonContainer: {
        flexDirection: 'row',
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: hp('20%'),
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginTop: 5,
    },
});
