import React, { useState } from 'react';
import { StyleSheet, Text, View, StatusBar, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Header from '../components/Header';
import CustomButton from '../components/CustomButton';
import CustomTextInput from '../components/CustomTextInput';
import Alert from '../components/Alert';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Formik } from 'formik';
import * as Yup from 'yup';

const ChangePassword = ({ navigation }) => {
    const [focusedInput, setFocusedInput] = useState(false);
    const [isAlertVisible, setAlertVisible] = useState(false);
    const [isButtonDisabled, setButtonDisabled] = useState(true);

    const handleBackPress = () => {
        navigation.navigate('Account');
    };

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
                        onSubmit={(values, { setSubmitting, resetForm }) => {
                            // Handle form submission logic here (not implemented in this example)
                            // console.log(values);

                            // Show alert when button is pressed
                            setAlertVisible(true);
                            setTimeout(() => {
                                setAlertVisible(false);
                                navigation.navigate('Account');
                            }, 1600);

                            // Reset form after submission
                            // resetForm();

                            // Set submitting to false after form is reset
                            // setSubmitting(false);
                        }}
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
                                        bgColor="#E3B12F"
                                        borderRadius={100}
                                        alignItems='center'
                                        txtColor="#FFFFFF"
                                        textStyle={{ fontSize: 19, fontWeight: '500', lineHeight: 22 }}
                                        onPress={handleSubmit}
                                        padding={10}
                                        marginVertical={10}
                                        disabled={!isValid} // Disable button if form is invalid
                                    >
                                        Change
                                    </CustomButton>
                                </View>
                            </View>
                        )}
                    </Formik>
                </View>
                <Alert successMessage="Password changed successfully" visible={isAlertVisible} />
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
