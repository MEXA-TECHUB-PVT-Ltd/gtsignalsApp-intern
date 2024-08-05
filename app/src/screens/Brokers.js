import React, { useEffect } from 'react';
import { StyleSheet, Text, View, StatusBar, ScrollView, FlatList, ActivityIndicator } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBrokers, incrementPage } from '../redux/brokerSlice';
import BrokersCard from '../components/BrokersCard';
import AlertComponent from '../components/Alert';

const Brokers = (navigation) => {
  const dispatch = useDispatch();
  const { brokers, status, page, limit } = useSelector((state) => state.brokers);

  useEffect(() => {
    dispatch(fetchBrokers({ page, limit }));
  }, [dispatch, page, limit]);

  const loadMoreBrokers = () => {
    if (status !== 'loading') {
      dispatch(incrementPage());
      dispatch(fetchBrokers({ page: page + 1, limit }));
    }
  };

  const renderItem = ({ item }) => (
    <BrokersCard broker={item} navigation={navigation} />
  );

  const renderFooter = () => {
    if (status === 'loading') {
      return <ActivityIndicator size="large" color="gold" />;
    }
    return null;
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="transparent" translucent={true} barStyle="dark-content" />
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Brokers</Text>
      </View>
      <View style={styles.mainView}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={brokers}
          renderItem={renderItem}
          keyExtractor={(item) => item.broker_id.toString()}
          onEndReached={loadMoreBrokers}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
        />
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  mainView: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
  },
  scrollView: {
    backgroundColor: '#FFFFFF',
    marginTop: 12,
    width: wp('100%'),
  },
  scrollView: {
    backgroundColor: '#FFFFFF',
    marginTop: 12,
    width: wp('100%'),
  },
  noDataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: hp('80%'),
  },
  noDataText: {
    fontSize: 18,
    color: '#666666',
    textAlign: 'center',
  },
});
