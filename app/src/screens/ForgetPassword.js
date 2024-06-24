import React, { useState }  from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; 
import CustomTextInput from '../components/CustomTextInput';
import CustomButton from '../components/CustomButton';
import Background from '../components/Background';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AppLogo from '../components/AppLogo';

const ForgetPassword = () => {
    const [email, setEmail] = useState('');

    return (
        <Background>
            <StatusBar backgroundColor="transparent" translucent barStyle="dark-content" />
            <View style={styles.container}>
                <View style={styles.header}>
                    <Icon name="arrow-back-ios" size={22} color="#333333" />
                </View>
                <View style={styles.title}>
                    <Text style={styles.forget_password_txt}>Forget Password</Text>
                </View>
                <View style={styles.description}>
                    <Text style={styles.description_txt}>Please enter your account email address. We will send an OTP code for verification.</Text>
                </View>
                <View style={styles.inputContainer}>
                    <CustomTextInput
                        leftIcon="email"
                        leftIconSize={24}
                        leftIconColor="#ADADAD"
                        placeholder="abc@email.com"
                        placeholderTextColor="#ADADAD"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <CustomButton
                        bgColor="#E3B12F"
                        borderRadius={100}
                        txtColor="#FFFFFF"
                        textStyle={{ fontSize: 19, fontWeight: '500', lineHeight: 22, }}
                        onPress={() => console.log('code sent')}
                        padding={10}
                        flex={1}
                        flexDirection={'row'}
                        justifyContent={'center'}
                    >
                        Send Code
                    </CustomButton>
                </View>
            </View>
        </Background>
    );
};

export default ForgetPassword;

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
        flex: 1,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
    },
});