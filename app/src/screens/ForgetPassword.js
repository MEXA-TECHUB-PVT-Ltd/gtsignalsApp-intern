import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Formik } from 'formik';
import * as Yup from 'yup';
import CustomTextInput from '../components/CustomTextInput';
import CustomButton from '../components/CustomButton';
import Background from '../components/Background';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AppLogo from '../components/AppLogo';
import { ScrollView } from 'react-native-gesture-handler';

const validationSchema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email format')
        .required('Email is required'),
});

const ForgetPassword = ({ navigation }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [loadingKey, setLoadingKey] = useState(null);
    const [focusedInput, setFocusedInput] = useState(false);

    const handleButtonPress = (buttonKey, callback) => {
        setLoadingKey(buttonKey);
        // Simulate an API call for button action
        setTimeout(() => {
            // Assuming user validation
            const userValidated = true; // Replace with actual validation logic
            if (userValidated) {
                callback();
            } else {
                setLoadingKey(null);
            }
        }, 1000);
    };

    const handleSendCode = (values) => {
        handleButtonPress('Send Code', () => {
            navigation.navigate('OTP');
            setLoadingKey(null);
        });
    };

    // const handleSendCode = (values) => {
    //     navigation.navigate('OTP');
    // };

    return (
        <ScrollView style={{flex: 1,}}>
        <Background>
            <StatusBar backgroundColor="transparent" translucent barStyle="dark-content" />
            <View style={styles.container}>
                <TouchableOpacity
                    style={styles.header}
                    onPress={() => navigation.navigate('SignIn')}
                >
                    <Icon name="arrow-back-ios" size={22} color="#333333" />
                </TouchableOpacity>
                <View style={styles.title}>
                    <Text style={styles.forget_password_txt}>Forget Password</Text>
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
