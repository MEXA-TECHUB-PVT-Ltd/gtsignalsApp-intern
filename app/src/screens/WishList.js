import { StyleSheet, Text, View, ScrollView, StatusBar } from 'react-native';
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import SignalCardWishList from '../components/SignalCardWishList';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AlertComponent from '../components/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { getAllWishlist } from '../redux/signalSlice';

const WishList = ({ navigation }) => {
  const buttonType = 'buy';
  const [alertMessage, setAlertMessage] = useState("");
  const [isAlertVisible, setAlertVisible] = useState(false);

  const dispatch = useDispatch();
  const { signals, wishlistStatus, error } = useSelector((state) => state.signal);
  // console.log('signals from wishlist array', signals);

  useEffect(() => {
    dispatch(getAllWishlist());
  }, [dispatch]);

  const showAlert = (message) => {
    setAlertMessage(message);
    setAlertVisible(true);
    setTimeout(() => {
      setAlertVisible(false);
    }, 1600);
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="white" translucent={true} barStyle="dark-content" />
      <AlertComponent successMessage={alertMessage} visible={isAlertVisible} />
      <View style={styles.header_view}>
        <Header
          onPress={() => navigation.navigate('Account')}
          headerText="Wish List" />
      </View>
      <View style={styles.main_view}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.cards_view}>
          {signals && signals.length > 0 ? (
            signals.map((signal, index) => (
              <SignalCardWishList
                key={signal.signal_id}
                buttonType={buttonType}
                onFavoritePress={showAlert}
                signal={signal}
              />
            ))
          ) : (
            <Text>No signals available</Text>
          )}
        </ScrollView>
      </View>
    </View>
  )
}

export default WishList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: hp('3%'),
  },
  header_view: {
    marginTop: hp('3%'),
    marginHorizontal: wp('3%'),
  },
  main_view: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
  },
  cards_view: {
    backgroundColor: 'transparent',
    marginTop: 16,
  },
});
