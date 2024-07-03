import { StyleSheet, Text, View } from 'react-native'
import React from 'react';
import Header from '../components/Header';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


const PrivacyPolicy = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header_view}>
        <Header headerText="Privacy Policy" />
      </View>
      <Text style={{color: 'black'}}>PrivacyPolicy</Text>
    </View>
  )
}

export default PrivacyPolicy

const styles = StyleSheet.create({
  container: {
    flex: 1,
  backgroundColor: '#fff',
  },
  header_view: {
   
  },
})