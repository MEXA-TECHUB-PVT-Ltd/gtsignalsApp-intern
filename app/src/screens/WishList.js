import { StyleSheet, Text, View, ScrollView, FlatList, StatusBar } from 'react-native';
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

  const renderItem = ({ item }) => (
    <SignalCardWishList
      key={item.signal_id}
      signal={item}
      showAlert={showAlert}
      onWishlistUpdate={handleWishlistUpdate}
    />
  );

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
        {userSignals.length > 0 ? (
          <FlatList
            style={styles.flatlist_view}
            data={userSignals}
            renderItem={renderItem}
            keyExtractor={(item) => item.signal_id.toString()}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.cards_view}
          />
        ) : (
          <Text>No signals available</Text>
        )}
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
  flatlist_view: {
    backgroundColor: 'transparent',
    marginTop: 16,
  },
});
