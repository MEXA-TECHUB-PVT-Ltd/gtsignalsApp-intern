import { StyleSheet, Text, View, StatusBar } from 'react-native'
import React, { useState, useCallback } from 'react';
import Background from '../components/Background';
import AppLogo from '../components/AppLogo';
import CustomTextInput from '../components/CustomTextInput';
import CustomButton from '../components/CustomButton';
import CustomDivider from '../components/CustomDivider';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Images from '../consts/images';
import { TouchableOpacity } from 'react-native-gesture-handler';


const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleEmailChange = useCallback((text) => {
    setEmail(text);
  }, []);

  const handlePasswordChange = useCallback((text) => {
    setPassword(text);
  }, []);

  const handleConfirmPasswordChange = useCallback((text) => {
    setConfirmPassword(text);
  }, []);

  return (
    <Background>
      <StatusBar backgroundColor="transparent" translucent barStyle="dark-content" />
      <View style={styles.backicon_logo_view}>
        <View style={styles.icon_view}>
          <Icon name="arrow-back-ios" size={22} color="#333333" />
        </View>
        <View style={styles.logo_view}>
          <AppLogo />
        </View>
      </View>
      <View style={styles.text_view}>
        <Text style={styles.create_account_txt}>Create Account</Text>
      </View>
      <View style={styles.inputs_view1}>
        <CustomTextInput
          leftIcon="mail-outline"
          leftIconSize={24}
          leftIconColor="#ADADAD"
          placeholder="abc@email.com"
          placeholderTextColor="#ADADAD"
          value={email}
          onChangeText={handleEmailChange}
          autoCapitalize="none"
        />
      </View>
      <View style={styles.inputs_view2}>
        <CustomTextInput
          leftIcon="lock-outline"
          leftIconSize={24}
          leftIconColor="#ADADAD"
          placeholder="Your password"
          placeholderTextColor="#ADADAD"
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
          onChangeText={handleConfirmPasswordChange}
          rightIcon="email"
          rightIconSize={24}
          rightIconColor="#ADADAD"
          secureTextEntry={true}
          autoCapitalize="none"
        />
      </View>
      <View style={styles.create_button_view}>
        <CustomButton
          bgColor="#E3B12F"
          borderRadius={100}
          alignItems='center'
          txtColor="#FFFFFF"
          textStyle={{ fontSize: 19, fontWeight: '500', lineHeight: 22, }}
          onPress={() => console.log('code sent')}
          padding={10}
          marginVertical={10}
        >
          Create
        </CustomButton>
      </View>
      <View style={styles.divider_view}>
        <CustomDivider 
        width='28%'
        />
        <Text style={styles.continue_with_txt}>or continue with</Text>
        <CustomDivider 
        width='28%'
        
        />
      </View>
    
      <View style={styles.social_buttons_view}>
        <CustomButton
          bgColor="#FFFFFF"
          borderColor="#E3B12F"
          borderWidth={1}
          borderRadius={100}
          txtColor="#333333"
          textStyle={{ fontSize: 15, fontWeight: '400', lineHeight: 20, }}
          onPress={() => console.log('code sent')}
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
          bgColor="#FFFFFF"
          borderColor="#E3B12F"
          borderWidth={1}
          borderRadius={100}
          txtColor="#333333"
          textStyle={{ fontSize: 12, fontWeight: '500', lineHeight: 22, }}
          onPress={() => console.log('code sent')}
          image={Images.facebookimage}
          imageStyle={{width: 20, height: 20}}
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
      </View>
      <View style={styles.text_bottom_view}>
        <Text style={styles.already_account_txt}>Already have an account? </Text>
        <TouchableOpacity>
          <Text style={styles.sign_in_txt}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </Background>
  )
}

export default SignUp

const styles = StyleSheet.create({
  backicon_logo_view: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    marginVertical: 30,
    
  },
  icon_view: {
    
    alignSelf: 'flex-start',
    backgroundColor: 'transparent'
  },
  logo_view: {
    flex: 1,
    justifyContent:'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    marginLeft: -22,
  },
  text_view: {
    alignItems: 'flex-start',
   
  },
  create_account_txt:{
    fontSize: 23,
    fontWeight: '500',
    lineHeight: 27,
    color: '#333333',
  },
  inputs_view1: {
    marginVertical: 10,
  },
  inputs_view2: {
    marginVertical: 10,
  },
  inputs_view3: {
    marginVertical: 10,
  },
  create_button_view: {
    marginVertical: 20,
  },
  divider_view: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  continue_with_txt: {
    fontSize: 17,
    fontWeight: '400',
    lineHeight: 22,
    color: '#000'
  },
  social_buttons_view: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 30,
  },
  text_bottom_view: {
    flexDirection:'row',
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
})