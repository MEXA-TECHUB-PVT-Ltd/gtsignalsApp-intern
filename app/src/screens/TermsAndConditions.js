import { StyleSheet, Text, StatusBar, ScrollView, View } from 'react-native'
import React from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Header from '../components/Header';

const TermsAndConditions = ({ navigation }) => {

  const handleBackPress = () => {
    navigation.navigate('Account');
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <View style={styles.header_view}>
        <Header
          onPress={handleBackPress}
          headerText="Terms & Conditions" />
      </View>
      <ScrollView 
      showsVerticalScrollIndicator={false}
      style={styles.scroll_view}>

        <View style={styles.description_texts_view}>
          <Text
            style={styles.description_text}
          >
            The following terminology applies to these
            Terms and Conditions, Privacy Statement and
            Disclaimer Notice and all Agreements: •Client",
            'You' and "Your" refers to you. the person log
            on this website and compliant to the
            Company's terms and conditions- 'The
            Company", 'Ourselves', "We', 'Our' and EUs",
            refers to our Company_ 'Party', "Parties', or
            'Us", refers to both the Client and ourselves. All
            terms refer to the offer, acceptance and
            consideration of payment necessary to
            undertake the process of our assistance to the
            Client in the most appropriate manner for the
            express purpose of meeting the Client's needs
            in respect of provision of the Company's stated
            services, in accordance with and subject to,
            prevailing law of Netherlands, Any use of the
            above terminology or other words in the
            singular, plural, capitalization and/or he/she or
            they, are taken as interchangeable and
            therefore as referring to same.
          </Text>
        </View>
        <View style={styles.heading_text_view}>
          <Text style={styles.heading_text}>
            Cookies
          </Text>
        </View>
        <View style={styles.description_texts_view}>
          <Text
            style={styles.description_text}
          >
            We employ the use of cookies. By accessing M
            techub Ile. you agreed to use cookies in
            agreement with the product's Privacy Policy.
            Most interactive websites use cookies to let us
            retrieve the user's details for each visit.
            Cookies are used by our website to enable the
            functionality of certain areas to make it easier
            for people visiting our website. Some Of our
            affiliate/advcrtising partners rnay also use
            cookies.
          </Text>
        </View>
        <View style={styles.heading_text_view}>
          <Text style={styles.heading_text}>
            License
          </Text>
        </View>
        <View style={styles.description_texts_view}>
          <Text
            style={styles.description_text}
          >
            Unless otherwise stated,product and/or its
            licensors own the intellectual property rights
            for all material on All intellectual property rights
            are reserved. You may access this for your
            own personal use subjected to restrictions set
            in these terms and conditions
            This Agreement shall begin on the date hereof,
            Our Terms and Conditions were created with
            the help of the Free Terms and Conditions
            Generator.
            Parts of this website offer an opportunity for
            users to post and exchange opinions and
            information in certain areas of the website.
            product does not filter, edit, publish or review
            Comments prior to their presence on the
            website. Comments do not reflect the views
            and opinions Of product.its agents and/or
            affiliates. Comments reflect the views and
            opinions of the person who post their views
            and opinions. To the extent permitted by
            applicable laws, product shall not be liable for
            the Comments or for any liability damages or
            expenses caused and/or suffered as a result of
            any use Of and/or posting Of and/or
            appearance of the Comments on this website.
            product reserves the right to monitor all
            Comments and to remove any Comments
            which can be considered inappropriate,
            offensive or causes breach of these Terms and
            Conditions,{'\n'}
            You warrant and represent that:{'\n'}
            {'\u2022\t\t'}You are entitled to post the Comments on
            our website and have all necessary licenses
            and consents to do so;{'\n'}
            The Comments do not invade any
            intellectual property right, including without
            limitation copyright, patent or trademark of
            any third party:{'\n'}
            {'\u2022\t\t'}The Comments do not contain any
            defamatory, libelous, offensive, indecent or
            otherwise unlawful material which is an
            invasion of privacy{'\n'}
            {'\u2022\t\t'}The Comments will not be used to solicit or
            promote business or custom or present
            commercial activities or unlawful activity.{'\n'}
            You hereby grant product a non-exclusive
            license to use. reproduce, edit and authorize
            others to use. reproduce and edit any of your
            Comments in any and all forms, formats or
            media.
          </Text>
        </View>
      </ScrollView>
    </View>
  )
}

export default TermsAndConditions

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

