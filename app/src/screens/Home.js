import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, ImageBackground, StatusBar, TouchableOpacity, ActivityIndicator } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SlIcons from 'react-native-vector-icons/SimpleLineIcons';
import Images from '../consts/images';
import SignalCard from '../components/SignalCard';
import { ScrollView } from 'react-native-gesture-handler';
import AlertComponent from '../components/Alert';

import { useSelector, useDispatch } from 'react-redux';
import { getAllSignals, resetSignalStatus } from '../redux/signalSlice';

const Home = ({ navigation }) => {
  const buttonType = 'buy';
  const dispatch = useDispatch();
  const { signals, getAllSignalsStatus, error } = useSelector(state => state.signal);
  // const signInData = useSelector((state) => state.user.user )
  // console.log(signInData.email);

  useEffect(() => {
    dispatch(getAllSignals());
  }, [dispatch]);

  if (getAllSignalsStatus === 'loading') {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size='large' color="gray" />
      </View>
    );
  }

  if (getAllSignalsStatus === 'failed') {
    return (
      <View style={styles.errorContainer}>
        <AlertComponent message={error} />
      </View>
    );
  }

  if (!signals) {
    return null;
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="transparent" translucent={true} barStyle="light-content" />
      <View style={styles.header_view}>
        <ImageBackground source={Images.brokersheaderimage} style={styles.header_image}>
          <View style={styles.headerContent_view}>
            <Text style={styles.headerText}>GT-Signals</Text>
            <View style={styles.iconsContainer}>
              <TouchableOpacity
              onPress={() => navigation.navigate('SearchSignal')}
              >
                <Ionicons name="search-outline" size={25} color="white" style={styles.icon} />
              </TouchableOpacity>
              <TouchableOpacity
              onPress={() => navigation.navigate('Notifications')}
              >
                <SlIcons name="bell" size={21} color="white" style={styles.icon} />
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </View>
      <View style={styles.main_view}>

        <ScrollView
        showsVerticalScrollIndicator={false} 
        style={styles.scroll_view}>
          {signals.map(signal => (
            <SignalCard 
            key={signal.signal_id} 
            signal={signal} 
            />
          ))}
        </ScrollView>
      </View>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header_view: {
    width: wp('100%'),
    height: hp('16%'),
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header_image: {
    width: wp('100%'),
    height: hp('16%'),
    resizeMode: 'contain',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 20,
    
  },
  headerContent_view: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: wp('90%'),
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginLeft: 15,
  },
  main_view: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center', 
  },
  scroll_view: {
    // width: wp('88%'),
    backgroundColor: 'white',
    marginTop: 16,
  },
});
