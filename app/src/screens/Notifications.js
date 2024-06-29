import { StyleSheet, Text, View, ScrollView, Image, StatusBar, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AIcon from 'react-native-vector-icons/AntDesign';

import Header from '../components/Header';
import Images from '../consts/images';
import CustomDivider from '../components/CustomDivider';
import CustomButton from '../components/CustomButton';

const initialNotifications = [
  {
    id: 1,
    title: 'New signal received',
    icon: 'pluscircle',
    time: 'Today - 02:00 pm',
    description: 'Good news! The stock you are following has experienced a significant price increase.',
  },
  {
    id: 2,
    title: 'New Updates',
    icon: 'exclamationcircle',
    time: 'Today - 02:00 pm',
    description: 'We have fine-tuned the app for smoother navigation. We have squashed those pesky bugs.',
  },
  {
    id: 3,
    title: 'Broker Updates',
    icon: 'smile-circle',
    time: 'Today - 02:00 pm',
    description: 'We value your commitment to staying up-to-date with your trading activities.',
  },
  {
    id: 4,
    title: 'New signal received',
    icon: 'pluscircle',
    time: 'Today - 02:00 pm',
    description: 'Good news! The stock you are following has experienced a significant price increase.',
  },
  {
    id: 5,
    title: 'New Updates',
    icon: 'exclamationcircle',
    time: 'Today - 02:00 pm',
    description: 'We have fine-tuned the app for smoother navigation. We have squashed those pesky bugs.',
  },
  {
    id: 6,
    title: 'Broker Updates',
    icon: 'smile-circle',
    time: 'Today - 02:00 pm',
    description: 'We value your commitment to staying up-to-date with your trading activities.',
  },
];

const Notifications = ({ navigation }) => {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [hiddenButtonIds, setHiddenButtonIds] = useState([]);

  const handleBackPress = () => {
    navigation.navigate('Home');
  };

  const getNotificationColor = (title) => {
    switch (title) {
      case 'New signal received':
        return { backgroundColor: '#d9e5ff', iconColor: '#2a6fff' }; 
      case 'New Updates':
        return { backgroundColor: '#d1f4d7', iconColor: '#02c121' }; 
      case 'Broker Updates':
        return { backgroundColor: '#ffedd4', iconColor: '#fd9b11' }; 
      default:
        return { backgroundColor: '#d9e5ff', iconColor: '#2A6FFF' }; 
    }
  };

  const handleNotificationPress = (id) => {
    if (!hiddenButtonIds.includes(id)) {
      setHiddenButtonIds([...hiddenButtonIds, id]);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'white'} barStyle="dark-content" />
      <View style={styles.header_view}>
        <Header headerText={"Notifications"} onPress={handleBackPress} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {notifications.length === 0 ? (
          <View style={styles.noNotificationsView}>
            <Image source={Images.emptychaticon} style={styles.image} />
            <Text style={styles.empty_text}>Empty</Text>
            <Text style={styles.noNotificationsText}>
              You don't have any notifications at this time
            </Text>
          </View>
        ) : (
          notifications.map(notification => (
            <TouchableOpacity
              key={notification.id}
              style={styles.notificationContainer}
              onPress={() => handleNotificationPress(notification.id)}
            >
              <View style={styles.icon_text_button_view}>
                <View style={styles.icon_view}>
                  <View style={[styles.icon_background_view, { backgroundColor: getNotificationColor(notification.title).backgroundColor }]}>
                    <AIcon name={notification.icon} size={26} color={getNotificationColor(notification.title).iconColor} />
                  </View>
                </View>
                <View style={styles.titile_time_texts_view}>
                  <Text style={styles.title_text}>{notification.title}</Text>
                  <Text style={styles.time_text}>{notification.time}</Text>
                </View>
                {!hiddenButtonIds.includes(notification.id) && (
                  <View style={styles.button_view}>
                    <CustomButton
                      bgColor="#E3B12F"
                      borderRadius={4}
                      txtColor="#FFFFFF"
                      textStyle={{ fontSize: 11, fontWeight: '500', lineHeight: 15 }}
                      paddingLeft={8}
                      paddingRight={5}
                      width={wp('15%')}
                      height={hp('3.2%')}
                      flexDirection={'row'}
                      alignItems={'center'}
                      justifyContent={'space-between'}
                      onPress={() => setHiddenButtonIds([...hiddenButtonIds, notification.id])}
                    >
                      New
                    </CustomButton>
                  </View>
                )}
              </View>

              <View style={styles.description_text_view}>
                <Text style={styles.description_text}>{notification.description}</Text>
              </View>

              <View style={styles.divider_view}>
                <CustomDivider width='90%' />
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </View>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header_view: {
    marginVertical: hp('4%'),
    marginBottom: 20,
    backgroundColor: 'transparent',
  },
  scrollViewContent: {
    flexGrow: 1,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  noNotificationsView: {
    marginVertical: hp('20%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: wp('41%'),
    height: wp('40%'),
    marginBottom: hp('2%'),
  },
  empty_text: {
    fontSize: 24,
    fontWeight: '400',
    lineHeight: 28,
    marginBottom: hp('1%'),
    color: '#333333',
  },
  noNotificationsText: {
    fontSize: 16,
    fontWeight: '300',
    lineHeight: 20,
    color: '#676767',
  },
  notificationContainer: {
    width: '89%',
    backgroundColor: 'white',
    // marginBottom: 4,
    borderRadius: 8,
    paddingVertical: 8,
  },
  icon_text_button_view: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon_view: {
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon_background_view: {
    width: wp('12%'),
    height: hp('6%'),
    borderRadius: 50,
    backgroundColor: '#d9e5ff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titile_time_texts_view: {
    flex: 1,
    paddingLeft: 10,
  },
  title_text: {
    fontSize: 18,
    fontWeight: '500',
    lineHeight: 21,
    color: '#333333',
  },
  time_text: {
    fontSize: 13,
    fontWeight: '300',
    lineHeight: 21,
    color: '#676767',
  },
  button_view: {
    marginLeft: 'auto',
  },
  description_text_view: {
    marginTop: 10,
  },
  description_text: {
    fontSize: 13,
    fontWeight: '200',
    lineHeight: 16,
    color: '#4B4B4B',
  },
  divider_view: {
    marginTop: 10,
    alignItems: 'flex-end'
  },
});
