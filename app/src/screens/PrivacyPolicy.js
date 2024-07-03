import { StyleSheet, Text, StatusBar, ScrollView, View } from 'react-native'
import React from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Header from '../components/Header';

const PrivacyPolicy = ({navigation}) => {

  const handleBackPress = () => {
    navigation.navigate('Account');
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <View style={styles.header_view}>
        <Header 
          onPress={handleBackPress}
        headerText="Privacy Policy" />
      </View>
      <ScrollView style={styles.scroll_view}>
       
        <View style={styles.description_texts_view}>
          <Text
            style={styles.description_text}
          >
            This Privacy Policy applies only to our online activities and is valid for visitors to our website with regards to the information that they shared and/or collect in mtechub llc. This policy is not applicable to any information collected offline or via channels other than this website.
          </Text>
        </View>
        <View style={styles.heading_text_view}>
          <Text style={styles.heading_text}>
            Infromation we collect
          </Text>
        </View>
        <View style={styles.description_texts_view}>
          <Text
            style={styles.description_text}
          >
            The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information.
            If you contact us directly, we may receive additional information about you such as your name, email address, phone number, the contents of the message and/or attachments you may send us, and any other information you may choose to provide.
            When you register for an Account, we may ask for your contact information, including items such as name, company name, address, email address, and telephone number.
          </Text>
        </View>
        <View style={styles.heading_text_view}>
          <Text style={styles.heading_text}>
            How we use your Infromation
          </Text>
        </View>
        <View style={styles.description_texts_view}>
          <Text
            style={styles.description_text}
          >
            We use the information we collect in various ways, including to:{'\n'}
            {'\u2022\t\t'}Provide, operate, and maintain our website{'\n'}
            {'\u2022\t\t'}Improve, personalize, and expand our website{'\n'}
            {'\u2022\t\t'}Understand and analyze how you use our website{'\n'}
            {'\u2022\t\t'}Develop new products, services, features, and functionality{'\n'}
            {'\u2022\t\t'}Communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the website, and for marketing and promotional purposes{'\n'}
            {'\u2022\t\t'}Send you emails{'\n'}
            {'\u2022\t\t'}Find and prevent fraud
          </Text>
        </View>
        <View style={styles.heading_text_view}>
          <Text style={styles.heading_text}>
            Log Files
          </Text>
        </View>
        <View style={styles.description_texts_view}>
          <Text
            style={styles.description_text}
          >
            standard procedure of using log files.These
            files log visitors when they visit websites All
            hosting companies do this and a part of
            hosting services' analytics. The information
            collected by log files include internet protocol
            (IP) addresses, browser type, Internet Service
            Provider date and stamp, referring /
            exit pages, and possibly the number of clicks.
            These are not linked to any information that is
            personally identifiable.The purpose of the
            information is for analyzing trends,
            administering the site.tracking users'
            movement on thc website, and gathering
            demographic information.
          </Text>
        </View>
        <View style={styles.heading_text_view}>
          <Text style={styles.heading_text}>
            Cookies and Web Beacons
          </Text>
        </View>
        <View style={styles.description_texts_view}>
          <Text
            style={styles.description_text}
          >
            Like any other website, mtechub Ilc uses
            'cookies'. These cookies are used to store
            information including visitors preferences, and
            the pages on the website that the visitor
            accessed or visited. The information is used to
            optimize the users' experience by customizing
            our web page content based on visitors'
            browser type and/or other informatin.
          </Text>
        </View>
        
      </ScrollView>
    </View>
  )
}

export default PrivacyPolicy

const styles = StyleSheet.create({
  container: {
    flex: 1,
  backgroundColor: 'white',
  },
  header_view: {
    marginVertical: 30,
    height: hp('4%'),
    backgroundColor: 'transparent',
  },
  scroll_view: {
    flex: 1,
    paddingHorizontal: 20,
  },
  description_texts_view: {
    
  },
  description_text: {
    fontSize: 14,
    fontWeight: '300',
    lineHeight: 22,
    color: '#676767',
  },
  heading_text_view: {
   marginVertical: 3,
  },
  heading_text: {
    fontSize: 20,
    fontWeight: '500',
    lineHeight: 40,
    color: '#333333',
  },
})

