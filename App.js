import { SafeAreaView, StyleSheet, Text, View, Image } from 'react-native'
import React from 'react';
import 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//screens
import Home from './app/src/screens/Home';
import Brokers from './app/src/screens/Brokers';
import Account from './app/src/screens/Account';
import SignUp from './app/src/screens/SignUp';
import CreateProfile from './app/src/screens/CreateProfile';
import SignIn from './app/src/screens/SignIn';
import ForgetPassword from './app/src/screens/ForgetPassword';
import OTP from './app/src/screens/OTP';
import ResetPassword from './app/src/screens/ResetPassword';
import Images from './app/src/consts/images';
import UploadPhoto from './app/src/screens/UploadPhoto';
import SignalCard from './app/src/components/SignalCard';
import BrokersCard from './app/src/components/BrokersCard';

//components
import Background from './app/src/components/Background';
import CustomButton from './app/src/components/CustomButton';
import CustomTextInput from './app/src/components/CustomTextInput';
import Onboarding from './app/src/screens/Onboarding';
import Alert from './app/src/components/Alert';
import Header from './app/src/components/Header';
import Modal from './app/src/components/Modal';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const CustomTabBarButton = ({ children, onPress }) => {
  return (
    <Animated.View style={useAnimatedStyle(() => ({
      transform: [{ translateY: withTiming(0, { duration: 500, easing: Easing.out(Easing.exp) }) }],
    }))}>
      <TouchableOpacity
        style={{ top: -10, justifyContent: 'center', alignItems: 'center' }}
        onPress={onPress}
      >
        {children}
      </TouchableOpacity>
    </Animated.View>
  );
};

const screenOptions = {
  gestureEnabled: true,
  headerShown: false,
  animationEnabled: true,
  tabBarButton: (props) => <CustomTabBarButton {...props} />,
};

const HomeStackNavigator = () => (
  <Stack.Navigator
    screenOptions={screenOptions}>
    <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
  </Stack.Navigator>
);

const BrokersStackNavigator = () => (
  <Stack.Navigator screenOptions={screenOptions}>
    <Stack.Screen name="Brokers" component={Brokers} options={{ headerShown: false }} />
  </Stack.Navigator>
);

const AccountStackNavigator = () => (
  <Stack.Navigator screenOptions={screenOptions}>
    <Stack.Screen name="Account" component={Account} options={{ headerShown: false }} />
  </Stack.Navigator>
);

const TabNavigator = ({ navigation }) => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarActiveTintColor: '#E3B12F',
      tabBarInactiveTintColor: '#707070',
      tabBarStyle: {
        backgroundColor: 'white',
        height: hp('8.5%'),
        borderTopWidth: 0,
        borderTopColor: 'transparent'

      },
      tabBarLabelStyle: {
        display: 'none',
      },
      tabBarKeyboardHidesTabBar: true,
    })}
  >
    <Tab.Screen
      name="HomeTab"
      component={HomeStackNavigator}
      options={({ navigation }) => ({
        tabBarIcon: ({ focused, color }) => (
          <View style={{ alignItems: 'center' }}>
            <Image
              source={Images.home}
              style={[{ width: 20, height: 20 }, focused && { tintColor: '#E3B12F' }]}
            />
            {<Text style={{ color }}>Home</Text>}
          </View>
        ),
      })}
    />

    <Tab.Screen
      name="BrokersTab"
      component={BrokersStackNavigator}
      options={{
        headerStyle: {
          backgroundColor: '#fff',
          height: 75,
        },
        tabBarIcon: ({ focused, color }) => (
          <View style={{ alignItems: 'center' }}>
            <Image
              source={Images.brokers}
              style={[{ width: 20, height: 20 }, focused && { tintColor: '#E3B12F' }]}
            />
            {<Text style={{ color }}>Brokers</Text>}
          </View>
        ),
      }}
    />
    <Tab.Screen
      name="AccountTab"
      component={AccountStackNavigator}
      options={{
        tabBarIcon: ({ focused, color }) => (
          <View style={{ alignItems: 'center' }}>
            <Image
              source={Images.account}
              style={[{ width: 20, height: 20 }, focused && { tintColor: '#E3B12F' }]}
            />
            {<Text style={{ color }}>Account</Text>}
          </View>
        ),
      }}
    />
  </Tab.Navigator>
);

const MainStack = () => (
  <Stack.Navigator>
    {/* <Stack.Screen name="BrokersCard" component={BrokersCard} options={{ headerShown: false }} /> */}
    {/* <Stack.Screen name="SignalCard" component={SignalCard} options={{ headerShown: false }} /> */}

    <Stack.Screen name="Onboarding" component={Onboarding} options={{ headerShown: false }} />
    <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }} />
    <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
    <Stack.Screen name="CreateProfile" component={CreateProfile} options={{ headerShown: false }} />
    <Stack.Screen name="UploadPhoto" component={UploadPhoto} options={{ headerShown: false }} />

    <Stack.Screen name="Modal" component={Modal} options={{ headerShown: false }} />
    <Stack.Screen name="ForgetPassword" component={ForgetPassword} options={{ headerShown: false }} />
    <Stack.Screen name="OTP" component={OTP} options={{ headerShown: false }} />
    <Stack.Screen name="ResetPassword" component={ResetPassword} options={{ headerShown: false }} />
    <Stack.Screen name="Header" component={Header} options={{ headerShown: false }} />
    <Stack.Screen name="Alert" component={Alert} options={{ headerShown: false }} />
    <Stack.Screen name="Tab" component={TabNavigator} options={{ headerShown: false }} />

  </Stack.Navigator>
);

const App = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <NavigationContainer>
          <MainStack />
        </NavigationContainer>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default App;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    // backgroundColor: '#fff',
  },
})