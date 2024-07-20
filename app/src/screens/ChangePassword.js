import React, { useState } from 'react';
import { StyleSheet, Text, View, StatusBar, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Header from '../components/Header';
import CustomButton from '../components/CustomButton';
import CustomTextInput from '../components/CustomTextInput';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Formik } from 'formik';
import * as Yup from 'yup';
import bcrypt from 'bcryptjs';
import AlertComponent from '../components/Alert';

import { useDispatch, useSelector } from 'react-redux';
import { changePassword, resetStatus } from '../redux/userSlice';

const ChangePassword = ({ navigation }) => {
    const [focusedInput, setFocusedInput] = useState(false);
    const [loadingKey, setLoadingKey] = useState(null);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState('success');
    const [alertVisible, setAlertVisible] = useState(false);
    const [isOldPasswordValid, setIsOldPasswordValid] = useState(false);

    const dispatch = useDispatch();
    // const changePasswordStatus = useSelector((state) => state.user.changePasswordStatus);
    // const error = useSelector((state) => state.user.error);
    const user = useSelector((state) => state.user.user);
    // console.log('user object in store: ', user);
    const userId = user.data.id;
    // console.log('user id from user object in store: ', userId);
    const userEmail = user.data.email;
    // console.log('user email from user object in store: ', userEmail);
    const storedPassword = user.data.password;
    // console.log('user password from user object in store: ' , storedPassword);

    const validationSchema = Yup.object().shape({
        oldPassword: Yup.string()
            .required('Old password is required'),
        newPassword: Yup.string()
            .required('New password is required')
            .min(8, 'Password must be at least 8 characters')
            .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
            .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
            .matches(/[0-9]/, 'Password must contain at least one number')
            .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character'),
        confirmPassword: Yup.string()
            .required('Confirm password is required')
            .oneOf([Yup.ref('newPassword'), null], 'Passwords must match'),
    });

    const handleBackPress = () => {
        navigation.navigate('Account');
    };

    const handleButtonPress = (buttonKey, callback) => {
        setLoadingKey(buttonKey);
        setTimeout(() => {
            const userValidated = true;
            if (userValidated) {
                callback();
            } else {
                setLoadingKey(null);
            }
        }, 0);
    };

    const handleChangePassword = (values) => {
        handleButtonPress('ChangePassword', async () => {
            try {
                const isOldPasswordValid = await bcrypt.compare(values.oldPassword, storedPassword);
                if (!isOldPasswordValid) {
                    setLoadingKey(null);
                    setAlertMessage('Old password is incorrect');
                    setAlertType('error');
                    setAlertVisible(true);
                    setTimeout(() => setAlertVisible(false), 1500);
                    return;
                }

                const response = await dispatch(changePassword({
                    userId: userId,
                    email: userEmail,
                    oldPassword: values.oldPassword,
                    newPassword: values.newPassword,
                })).unwrap();

                // console.log(response);
                setAlertMessage(response.msg);
                setAlertType('success');
                setAlertVisible(true);
                setTimeout(() => {
                    setAlertVisible(false);
                    navigation.navigate('Account');
                    setLoadingKey(null);
                }, 1500);
            } catch (error) {
                console.log(error);
                setLoadingKey(null);
                setAlertMessage(error.msg);
                setAlertType('error');
                setAlertVisible(true);
                setTimeout(() => setAlertVisible(false), 1500);
            }
        });
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <View style={styles.header_view}>
                    <Header
                        onPress={handleBackPress}
                        headerText="Change Password"
                    />
                </View>
                <View style={styles.main_view}>
                    <Formik
                        initialValues={{ oldPassword: '', newPassword: '', confirmPassword: '' }}
                        validationSchema={validationSchema}
                        onSubmit={handleChangePassword}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid }) => (
                            <View>
                                <View style={styles.input_view}>
                                    <CustomTextInput
                                        leftIcon="lock-outline"
                                        leftIconSize={24}
                                        leftIconColor="#ADADAD"
                                        placeholder="Old password"
                                        placeholderTextColor="#ADADAD"
                                        value={values.oldPassword}
                                        onChangeText={handleChange('oldPassword')}
                                        onBlur={handleBlur('oldPassword')}
                                        secureTextEntry={true}
                                        autoCapitalize="none"
                                        focusedInput={focusedInput}
                                        setFocusedInput={setFocusedInput}
                                    />
                                    {touched.oldPassword && errors.oldPassword ? (
                                        <Text style={styles.error_text}>{errors.oldPassword}</Text>
                                    ) : null}
                                </View>
                                <View style={styles.input_view}>
                                    <CustomTextInput
                                        leftIcon="lock-outline"
                                        leftIconSize={24}
                                        leftIconColor="#ADADAD"
                                        placeholder="New password"
                                        placeholderTextColor="#ADADAD"
                                        value={values.newPassword}
                                        onChangeText={handleChange('newPassword')}
                                        onBlur={handleBlur('newPassword')}
                                        secureTextEntry={true}
                                        autoCapitalize="none"
                                        focusedInput={focusedInput}
                                        setFocusedInput={setFocusedInput}
                                    />
                                    {touched.newPassword && errors.newPassword ? (
                                        <Text style={styles.error_text}>{errors.newPassword}</Text>
                                    ) : null}
                                </View>
                                <View style={styles.input_view}>
                                    <CustomTextInput
                                        leftIcon="lock-outline"
                                        leftIconSize={24}
                                        leftIconColor="#ADADAD"
                                        placeholder="Confirm password"
                                        placeholderTextColor="#ADADAD"
                                        value={values.confirmPassword}
                                        onChangeText={handleChange('confirmPassword')}
                                        onBlur={handleBlur('confirmPassword')}
                                        secureTextEntry={true}
                                        autoCapitalize="none"
                                        focusedInput={focusedInput}
                                        setFocusedInput={setFocusedInput}
                                    />
                                    {touched.confirmPassword && errors.confirmPassword ? (
                                        <Text style={styles.error_text}>{errors.confirmPassword}</Text>
                                    ) : null}
                                </View>
                                <View style={styles.create_button_view}>
                                    <CustomButton
                                        buttonKey="ChangePassword"
                                        isLoading={!!loadingKey}
                                        currentLoadingKey={loadingKey}
                                        loaderColor="#FFF"
                                        bgColor="#E3B12F"
                                        borderRadius={100}
                                        alignItems='center'
                                        txtColor="#FFFFFF"
                                        textStyle={{ fontSize: 19, fontWeight: '500', lineHeight: 22 }}
                                        onPress={handleSubmit}
                                        padding={10}
                                        marginVertical={10}
                                    >
                                        Change
                                    </CustomButton>
                                </View>
                            </View>
                        )}
                    </Formik>
                </View>
                <AlertComponent successMessage={alertMessage} visible={alertVisible} type={alertType} />
            </View>
        </TouchableWithoutFeedback>
    );
};

export default ChangePassword;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        marginTop: StatusBar.currentHeight || 0,
    },
    main_view: {
        flex: 1,
        backgroundColor: 'transparent',
        paddingHorizontal: wp('2%'),
        // paddingVertical: hp('3%'),
    },
    header_view: {
        marginVertical: hp('3%'),
        backgroundColor: 'transparent',
        paddingHorizontal: wp('2%')
    },
    input_view: {
        backgroundColor: 'transparent',
        height: hp('11%'),
        marginVertical: 4,
        paddingHorizontal: wp('5%'),
    },
    error_text: {
        color: 'red',

    },
    create_button_view: {
        marginVertical: hp('30%'),
        paddingHorizontal: wp('5%')
    },
});
