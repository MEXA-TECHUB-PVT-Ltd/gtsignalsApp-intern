import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image, BackHandler, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { NavigationContainer, useFocusEffect, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import {store, persistor} from './app/src/redux/store';

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
import SignalDetails from './app/src/screens/SignalDetails';
import Notifications from './app/src/screens/Notifications';
import SearchSignal from './app/src/screens/SearchSignal';
import Chat from './app/src/screens/Chat';
import EditProfile from './app/src/screens/EditProfile';
import PrivacyPolicy from './app/src/screens/PrivacyPolicy';
import TermsAndConditions from './app/src/screens/TermsAndConditions';
import InviteFriends from './app/src/screens/InviteFriends';
import ChangePassword from './app/src/screens/ChangePassword';
import PremiumPlans from './app/src/screens/PremiumPlans';
import WishList from './app/src/screens/WishList';
import Onboarding from './app/src/screens/Onboarding';

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

const TabNavigator = () => {
  const navigation = useNavigation();

  useFocusEffect(
    React.useCallback(() => {
      const backAction = () => {
        const state = navigation.getState();
        const tabState = state.routes[state.index].state;
        if (tabState && tabState.index !== undefined) {
          const currentTabRoute = tabState.routes[tabState.index];
          if (currentTabRoute.name === 'HomeTab') {
            Alert.alert('Exit App', 'Are you sure you want to exit the app?', [
              {
                text: 'Cancel',
                onPress: () => null,
                style: 'cancel',
              },
              {
                text: 'YES',
                onPress: () => BackHandler.exitApp(),
              },
            ]);
            return true;
          }
        } else {
          Alert.alert('Exit App', 'Are you sure you want to exit the app?', [
            {
              text: 'Cancel',
              onPress: () => null,
              style: 'cancel',
            },
            {
              text: 'YES',
              onPress: () => BackHandler.exitApp(),
            },
          ]);
          return true;
        }
        return false;
      };
      const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
      return () => backHandler.remove();
    }, [navigation])
  );

  return (
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
};

// const MainStack = () => (
//   <Stack.Navigator>
//     <Stack.Screen name="Onboarding" component={Onboarding} options={{ headerShown: false }} />
//     <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }} />
//     <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
//     <Stack.Screen name="CreateProfile" component={CreateProfile} options={{ headerShown: false }} />
//     <Stack.Screen name="ForgetPassword" component={ForgetPassword} options={{ headerShown: false }} />
//     <Stack.Screen name="OTP" component={OTP} options={{ headerShown: false }} />
//     <Stack.Screen name="ResetPassword" component={ResetPassword} options={{ headerShown: false }} />
//     <Stack.Screen name="Tab" component={TabNavigator} options={{ headerShown: false }} />

//     <Stack.Screen name="SignalDetails" component={SignalDetails} options={{ headerShown: false }} />
//     <Stack.Screen name="Notifications" component={Notifications} options={{ headerShown: false }} />
//     <Stack.Screen name="SearchSignal" component={SearchSignal} options={{ headerShown: false }} />
//     <Stack.Screen name="Chat" component={Chat} options={{ headerShown: false }} />
//     <Stack.Screen name="EditProfile" component={EditProfile} options={{ headerShown: false }} />
//     <Stack.Screen name="UploadPhoto" component={UploadPhoto} options={{ headerShown: false }} />
//     <Stack.Screen name="TermsAndConditions" component={TermsAndConditions} options={{ headerShown: false }} />
//     <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} options={{ headerShown: false }} />
//     <Stack.Screen name="InviteFriends" component={InviteFriends} options={{ headerShown: false }} />
//     <Stack.Screen name="ChangePassword" component={ChangePassword} options={{ headerShown: false }} />
//     <Stack.Screen name="PremiumPlans" component={PremiumPlans} options={{ headerShown: false }} />
//     <Stack.Screen name="WishList" component={WishList} options={{ headerShown: false }} />
//   </Stack.Navigator>
// )

const MainStack = () => {
  // const user = useSelector(state => state.user);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  return (
    <Stack.Navigator>
      {isAuthenticated ? (
        <>
          <Stack.Screen name="Tab" component={TabNavigator} options={{ headerShown: false }} />
          <Stack.Screen name="SignalDetails" component={SignalDetails} options={{ headerShown: false }} />
          <Stack.Screen name="Notifications" component={Notifications} options={{ headerShown: false }} />
          <Stack.Screen name="SearchSignal" component={SearchSignal} options={{ headerShown: false }} />
          <Stack.Screen name="Chat" component={Chat} options={{ headerShown: false }} />
          <Stack.Screen name="EditProfile" component={EditProfile} options={{ headerShown: false }} />
          <Stack.Screen name="UploadPhoto" component={UploadPhoto} options={{ headerShown: false }} />
          <Stack.Screen name="TermsAndConditions" component={TermsAndConditions} options={{ headerShown: false }} />
          <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} options={{ headerShown: false }} />
          <Stack.Screen name="InviteFriends" component={InviteFriends} options={{ headerShown: false }} />
          <Stack.Screen name="ChangePassword" component={ChangePassword} options={{ headerShown: false }} />
          <Stack.Screen name="PremiumPlans" component={PremiumPlans} options={{ headerShown: false }} />
          <Stack.Screen name="WishList" component={WishList} options={{ headerShown: false }} />
        </>
      ) : (
        <>
          <Stack.Screen name="Onboarding" component={Onboarding} options={{ headerShown: false }} />
          <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }} />
          <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
          <Stack.Screen name="CreateProfile" component={CreateProfile} options={{ headerShown: false }} />
          <Stack.Screen name="ForgetPassword" component={ForgetPassword} options={{ headerShown: false }} />
          <Stack.Screen name="OTP" component={OTP} options={{ headerShown: false }} />
          <Stack.Screen name="ResetPassword" component={ResetPassword} options={{ headerShown: false }} />
        </>
      )}
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={<ActivityIndicator size="large" color="gold" />} persistor={persistor}>
      <SafeAreaProvider>
        <SafeAreaView style={styles.safeArea}>
          <NavigationContainer>
            <MainStack />
          </NavigationContainer>
        </SafeAreaView>
      </SafeAreaProvider>
    </PersistGate>
    </Provider>
  )
}

export default App;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})