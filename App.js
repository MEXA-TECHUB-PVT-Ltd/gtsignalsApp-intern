import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Home from './app/src/screens/Home';
import Brokers from './app/src/screens/Brokers';
import Account from './app/src/screens/Account';
import SignUp from './app/src/screens/SignUp';
import ForgetPassword from './app/src/screens/ForgetPassword';
import Images from './app/src/consts/images';

//components
import Background from './app/src/components/Background';
import CustomButton from './app/src/components/CustomButton';
import CustomTextInput from './app/src/components/CustomTextInput';
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
        tabBarIcon: ({ focused, color}) => (
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
    <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
    {/* <Stack.Screen name="Onboarding" component={Onboarding} options={{ headerShown: false }} /> */}

    {/* <Stack.Screen name="ForgetPassword" component={ForgetPassword} options={{ headerShown: false }} /> */}
    {/* <Stack.Screen name="Tab" component={TabNavigator} options={{ headerShown: false }} /> */}

  </Stack.Navigator>
);

const App = () => {
  return (
    <NavigationContainer>
      <MainStack />
    </NavigationContainer>

  )
}

export default App;

const styles = StyleSheet.create({})