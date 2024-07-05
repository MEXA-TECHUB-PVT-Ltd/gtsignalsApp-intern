import { StyleSheet, Text, View, StatusBar,ScrollView } from 'react-native';
import React, {useEffect} from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import SignalCard from '../components/SignalCard';
import BrokersCard from '../components/BrokersCard';

const Brokers = () => {

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="transparent" translucent={true} barStyle="dark-content" />
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Brokers</Text>
      </View>

      <View style={styles.main_view}>
        <ScrollView 
        showsVerticalScrollIndicator={false}
        style={styles.scroll_view}>
          <BrokersCard />
          <BrokersCard />
          <BrokersCard />
          <BrokersCard />
          <BrokersCard />
          
        </ScrollView>
      </View>

    </View>
  );
};

export default Brokers;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  headerContainer: {
    height: hp('6.5%'),
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    
  },
  headerText: {
    color: 'black',
    fontSize: 24,
    fontWeight: '500',
    lineHeight: 28,
    letterSpacing: 1,
    textAlign: 'center',
  },
  main_view: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
  },
  scroll_view: {
    // width: wp('88%'),
    backgroundColor: '#FFFFFF',
    marginTop: 12,
  },
});