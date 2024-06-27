import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, StatusBar, Platform, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Background from '../components/Background';
import AppLogo from '../components/AppLogo';
import CustomTextInput from '../components/CustomTextInput';
import CustomButton from '../components/CustomButton';
import CustomDivider from '../components/CustomDivider';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Images from '../consts/images';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters long')
    .matches(/\d/, 'Password must contain at least one number')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[!@#$%^&*]/, 'Password must contain at least one special character (!@#$%^&*)'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Password & confirm password does not match')
    .required('Confirm Password is required'),
});

const SignUp = ({navigation}) => {
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

  const handleSignUp = () => {
    handleButtonPress('SignUp', () => {
      navigation.navigate('CreateProfile');
      setLoadingKey(null);
      // resetForm();
    });
  };

  // const handleSignUp = (values, { resetForm }) => {
  //   navigation.navigate('CreateProfile');
  //   resetForm();
  // };

  const handleGoogle = () => {
    handleButtonPress('Google', () => {
      setLoadingKey(null);
    });
  };

  const handleFacebook = () => {
    handleButtonPress('Facebook', () => {
      setLoadingKey(null);
    });
  };

  const handleApple = () => {
    handleButtonPress('Apple', () => {
      setLoadingKey(null);
    });
  };

  const handleBackPress = () => {
    navigation.navigate('Onboarding');
  };


  return (
    <ScrollView style={{ flex: 1 }}>
      <Background>
        <StatusBar backgroundColor="transparent" translucent={true} barStyle="dark-content" />
        <View style={styles.backicon_logo_view}>
          <TouchableOpacity
            style={styles.icon_view}
            onPress={handleBackPress}>
            <Icon name="arrow-back-ios" size={22} color="#333333" />
          </TouchableOpacity>
          <View style={styles.logo_view}>
            <AppLogo />
          </View>
        </View>
        <View style={styles.text_view}>
          <Text style={styles.create_account_txt}>Create Account</Text>
        </View>
        <Formik
          initialValues={{ email: '', password: '', confirmPassword: '' }}
          validationSchema={validationSchema}
          onSubmit={(values) => handleSignUp(values)}
        >
          {({ handleChange, handleSubmit, resetForm, values, errors, touched,  }) => (
            <>
              <View style={styles.inputs_view}>
                <CustomTextInput
                  leftIcon="mail-outline"
                  leftIconSize={24}
                  leftIconColor="#ADADAD"
                  placeholder="abc@email.com"
                  placeholderTextColor="#ADADAD"
                  value={values.email}
                  onChangeText={handleChange('email')}
                  autoCapitalize="none"
                  keyboardType='email-address'
                  focusedInput={focusedInput}
                  setFocusedInput={setFocusedInput}
                />
                {touched.email && errors.email ? <Text style={styles.error_text}>{errors.email}</Text> : null}
              </View>
              <View style={styles.inputs_view}>
                <CustomTextInput
                  leftIcon="lock-outline"
                  leftIconSize={24}
                  leftIconColor="#ADADAD"
                  placeholder="Your password"
                  placeholderTextColor="#ADADAD"
                  value={values.password}
                  onChangeText={handleChange('password')}
                  secureTextEntry={true}
                  autoCapitalize="none"
                  focusedInput={focusedInput}
                  setFocusedInput={setFocusedInput}
                />
                {touched.password && errors.password ? <Text style={styles.error_text}>{errors.password}</Text> : null}
              </View>
              <View style={styles.inputs_view}>
                <CustomTextInput
                  leftIcon="lock-outline"
                  leftIconSize={24}
                  leftIconColor="#ADADAD"
                  placeholder="Confirm password"
                  placeholderTextColor="#ADADAD"
                  value={values.confirmPassword}
                  onChangeText={handleChange('confirmPassword')}
                  secureTextEntry={true}
                  autoCapitalize="none"
                  focusedInput={focusedInput}
                  setFocusedInput={setFocusedInput}
                />
                {touched.confirmPassword && errors.confirmPassword ? <Text style={styles.error_text}>{errors.confirmPassword}</Text> : null}
              </View>
              <View style={styles.create_button_view}>
                <CustomButton
                  buttonKey="SignUp"
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
                  Create
                </CustomButton>
              </View>
            </>
          )}
        </Formik>
        <View style={styles.divider_view}>
          <CustomDivider width='28%' />
          <Text style={styles.continue_with_txt}>or continue with</Text>
          <CustomDivider width='28%' />
        </View>
        <View style={styles.social_buttons_view}>
          {Platform.OS === 'android' && (
            <>
              <CustomButton
                buttonKey="Google"
                isLoading={!!loadingKey}
                currentLoadingKey={loadingKey}
                bgColor="#FFFFFF"
                borderColor="#E3B12F"
                borderWidth={1}
                borderRadius={100}
                txtColor="#333333"
                textStyle={{ fontSize: 15, fontWeight: '400', lineHeight: 20 }}
                onPress={handleGoogle}
                image={Images.googleimage}
                imageStyle={{ width: 20, height: 20 }}
                padding={10}
                paddingLeft={20}
                paddingRight={20}
                width={wp('40%')}
                flexDirection={'row'}
                alignItems={'center'}
                justifyContent={'space-around'}
              >
                Google
              </CustomButton>
              <CustomButton
                buttonKey="Facebook"
                isLoading={!!loadingKey}
                currentLoadingKey={loadingKey}
                bgColor="#FFFFFF"
                borderColor="#E3B12F"
                borderWidth={1}
                borderRadius={100}
                txtColor="#333333"
                textStyle={{ fontSize: 12, fontWeight: '500', lineHeight: 22 }}
                onPress={handleFacebook}
                image={Images.facebookimage}
                imageStyle={{ width: 20, height: 20 }}
                padding={6}
                paddingLeft={20}
                paddingRight={20}
                width={wp('40%')}
                flexDirection={"row"}
                alignItems={'center'}
                justifyContent={'space-around'}
              >
                Facebook
              </CustomButton>
            </>
          )}
          {Platform.OS === 'ios' && (
            <>
              <CustomButton
                buttonKey="Google"
                isLoading={!!loadingKey}
                currentLoadingKey={loadingKey}
                bgColor="#FFFFFF"
                borderColor="#E3B12F"
                borderWidth={1}
                borderRadius={100}
                txtColor="transparent"
                textStyle={{ fontSize: 15, fontWeight: '400', lineHeight: 20 }}
                onPress={handleGoogle}
                image={Images.googleimage}
                imageStyle={{ width: 20, height: 20 }}
                padding={10}
                width={wp('11.8%')}
                flexDirection={'row'}
                alignItems={'center'}
                justifyContent={'space-around'}
              />
              <CustomButton
                buttonKey="Facebook"
                isLoading={!!loadingKey}
                currentLoadingKey={loadingKey}
                bgColor="#FFFFFF"
                borderColor="#E3B12F"
                borderWidth={1}
                borderRadius={100}
                txtColor="transparent"
                textStyle={{ fontSize: 12, fontWeight: '500', lineHeight: 22 }}
                onPress={handleFacebook}
                image={Images.facebookimage}
                imageStyle={{ width: 20, height: 20 }}
                padding={6}
                width={wp('11.8%')}
                flexDirection={"row"}
                alignItems={'center'}
                justifyContent={'space-around'}
              />
              <CustomButton
                buttonKey="Apple"
                isLoading={!!loadingKey}
                currentLoadingKey={loadingKey}
                bgColor="#FFFFFF"
                borderColor="#E3B12F"
                borderWidth={1}
                borderRadius={100}
                txtColor="transparent"
                textStyle={{ fontSize: 15, fontWeight: '400', lineHeight: 20 }}
                onPress={handleApple}
                image={Images.appleicon}
                imageStyle={{ width: 20, height: 20 }}
                padding={10}
                width={wp('11.8%')}
                flexDirection={'row'}
                alignItems={'center'}
                justifyContent={'space-around'}
              />
            </>
          )}
        </View>
        <View style={styles.text_bottom_view}>
          <TouchableOpacity
            style={styles.text_bottom_view}
            onPress={() => navigation.navigate('SignIn')}>
            <Text style={styles.already_account_txt}>Already have an account? </Text>
            <Text style={styles.sign_in_txt}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </Background>
    </ScrollView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  backicon_logo_view: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    marginVertical: 30,
  },
  icon_view: {
    alignSelf: 'flex-start',
    backgroundColor: 'transparent',
    paddingRight: 10,
    paddingBottom: 10,
  },
  logo_view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    marginLeft: -22,
  },
  text_view: {
    alignItems: 'flex-start',
  },
  create_account_txt: {
    fontSize: 23,
    fontWeight: '500',
    lineHeight: 27,
    color: '#333333',
  },
  inputs_view: {
    marginVertical: 10,
  },
  create_button_view: {
    marginVertical: 20,
  },
  divider_view: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
  },
  continue_with_txt: {
    fontSize: 17,
    fontWeight: '400',
    lineHeight: 22,
    color: '#000'
  },
  social_buttons_view: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 30,
  },
  text_bottom_view: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  already_account_txt: {
    fontSize: 14,
    color: 'gray'
  },
  sign_in_txt: {
    fontSize: 14,
    color: '#000',
    fontWeight: 'bold'
  },
  error_text: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
});
