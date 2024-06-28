import React, {useEffect} from 'react';
import { StyleSheet, Text, View, ImageBackground, StatusBar } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SlIcons from 'react-native-vector-icons/SimpleLineIcons';
import Images from '../consts/images';
import SignalCard from '../components/SignalCard';

const Home = ({ navigation }) => {
 
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="transparent" translucent={true} barStyle="light-content" />
      <ImageBackground source={Images.brokersheaderimage} style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.headerText}>GT-Signals</Text>
          <View style={styles.iconsContainer}>
            <Ionicons name="search-outline" size={25} color="white" style={styles.icon} />
            <SlIcons name="bell" size={25} color="white" style={styles.icon} />
          </View>
        </View>
        <View style={styles.cards_view}>
          <SignalCard />

        </View>
      </ImageBackground>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    width: wp('100%'),
    height: hp('20%'),
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  headerContent: {
    backgroundColor: 'transparent',
    padding: 20,
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
  },
  icon: {
    marginLeft: 15,
  },
  cards_view: {
    justifyContent:'center',
    alignItems: 'center',
    width: wp('88%'),
    // marginVertical: 30,
  },
});
