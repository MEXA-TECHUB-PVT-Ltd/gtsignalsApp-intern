import React, { useEffect } from 'react';
import { StyleSheet, Text, View, StatusBar, ScrollView, ActivityIndicator } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBrokers } from '../redux/brokerSlice';
import BrokersCard from '../components/BrokersCard';
import AlertComponent from '../components/Alert';

const Brokers = () => {
  const dispatch = useDispatch();
  const brokers = useSelector(state => state.brokers.brokers);
  // console.log('All brokders: ', brokers);
  const brokerIds = brokers.map(broker => broker.broker_id);
  // console.log("Broker IDs:", brokerIds);
  
  const status = useSelector(state => state.brokers.status);
  const error = useSelector(state => state.brokers.error);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchBrokers());
    }
  }, [dispatch, status]);

  if (status === 'loading') {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size='large' color='gray' />
      </View>
    );
  }

  if (status === 'failed') {
    return (
      <View style={styles.errorContainer}>
        <AlertComponent message={error} />
      </View>
    );
  }

  if (!brokers) {
    return null;
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="transparent" translucent={true} barStyle="dark-content" />
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Brokers</Text>
      </View>
      <View style={styles.mainView}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scrollView}
        >
          {brokers.length > 0 ? (
            brokers.map(broker => (
              <BrokersCard
                key={broker.broker_id}
                broker={broker}
              />
            ))
          ) : (
            <View style={styles.noDataContainer}>
              <Text style={styles.noDataText}>No Brokers Available</Text>
            </View>
          )}
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
