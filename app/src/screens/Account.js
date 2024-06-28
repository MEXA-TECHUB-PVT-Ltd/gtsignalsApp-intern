import { StyleSheet, Text, View, StatusBar } from 'react-native';
import React, {useEffect} from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


const Account = () => {
  // useEffect(() => {
  //   StatusBar.setBarStyle('dark-content');
  // }, []);
  return (
    <View style={styles.container}>
      {/* <StatusBar barStyle="dark-content" /> */}

      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>My Account</Text>
      </View>
    </View>
  );
};

export default Account;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerContainer: {
    height: hp('8%'),
    marginVertical: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',

  },
  headerText: {
    color: 'black',
    fontSize: 24,
    fontWeight: '500',
    lineHeight: 28,
    letterSpacing: 3,
    textAlign: 'center',
  },
});