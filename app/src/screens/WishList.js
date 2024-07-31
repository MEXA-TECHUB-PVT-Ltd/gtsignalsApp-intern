import { StyleSheet, Text, View, ScrollView, StatusBar } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';
import Header from '../components/Header';
import SignalCardWishList from '../components/SignalCardWishList';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AlertComponent from '../components/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { getSignalsByUserId } from '../redux/signalSlice';

const WishList = ({ navigation }) => {
  const buttonType = 'buy';
  const [alertMessage, setAlertMessage] = useState("");
  const [isAlertVisible, setAlertVisible] = useState(false);

  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const { userSignals, userSignalsStatus } = useSelector((state) => state.signal);
  const user = useSelector((state) => state.user.user);
  const userId = user.id;

  useEffect(() => {
    if (isFocused) {
      dispatch(getSignalsByUserId(userId));
    }
  }, [dispatch, isFocused, userId]);

  const handleWishlistUpdate = () => {
    dispatch(getSignalsByUserId(userId));
  };

  const showAlert = (message) => {
    setAlertMessage(message);
    setAlertVisible(true);
    setTimeout(() => {
      setAlertVisible(false);
      setAlertMessage(null);
    }, 1400);
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
          {userSignals.length > 0 ? (
            userSignals.map((signal) => (
              <SignalCardWishList
                key={signal.signal_id}
                signal={signal}
                showAlert={showAlert}
                onWishlistUpdate={handleWishlistUpdate}
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
    marginHorizontal: wp('1.2%'),
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
