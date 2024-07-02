import { StyleSheet, Text, View, StatusBar, Image, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Images from '../consts/images';
import ADIcon from 'react-native-vector-icons/AntDesign';
import IIcon from 'react-native-vector-icons/Ionicons';
import MIIcon from 'react-native-vector-icons/MaterialIcons';
import CustomDivider from '../components/CustomDivider';
import CustomButton from '../components/CustomButton';
import { ScrollView } from 'react-native-gesture-handler';

const Account = ({navigation}) => {

  const handleEditPress = () => {
    navigation.navigate('EditProfile');
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'white'} barStyle="dark-content" />
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>My Account</Text>
      </View>
      <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.scroll_view}
      >

      <View style={styles.card_view1}>
        <View style={styles.left_view}>
          <View style={styles.profile_image_view}>
            <View style={styles.profile_image_round_view}>
              <Image
                source={Images.profileicon}
                style={styles.profile_icon}
              />
            </View>
          </View>
          <View style={styles.name_email_view}>
            <Text style={styles.profile_name_text}>Andrew Ainsley</Text>
            <Text style={styles.profile_email_text}>andrew-ainsley@gmail.com</Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={handleEditPress}
          style={styles.right_view}>
            <ADIcon name='edit' size={24} color="#E3B12F" />
        </TouchableOpacity>
      </View>
      <View style={styles.divider_view}>
        <CustomDivider />
      </View>
      <TouchableOpacity style={styles.links_view}>
        <View style={styles.links_left_view}>
          <View style={styles.links_profile_image_view}>
            <MIIcon name='workspace-premium' size={20} color="#E3B12F" />
          </View>
          <View style={styles.links_name_view}>
            <Text style={styles.links_profile_name_text}>Go Premium</Text>
          </View>
        </View>
        <View
          // onPress={handleChatPress}
          style={styles.right_view}>
          <MIIcon name='arrow-forward-ios' size={14} color="#000" />
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.links_view}>
        <View style={styles.links_left_view}>
          <View style={styles.links_profile_image_view}>
            <IIcon name='chatbubble-ellipses-sharp' size={20} color="#E3B12F" />

          </View>
          <View style={styles.links_name_view}>
            <Text style={styles.links_profile_name_text}>Live Chat</Text>
          </View>
        </View>
          <View
          // onPress={handleChatPress}
          style={styles.right_view}>
          <MIIcon name='arrow-forward-ios' size={14} color="#000" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.links_view}>
        <View style={styles.links_left_view}>
          <View style={styles.links_profile_image_view}>
            <IIcon name='heart-sharp' size={20} color="#E3B12F" />

          </View>
          <View style={styles.links_name_view}>
            <Text style={styles.links_profile_name_text}>My Wishlist</Text>
          </View>
        </View>
          <View
          // onPress={handleChatPress}
          style={styles.right_view}>
          <MIIcon name='arrow-forward-ios' size={14} color="#000" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.links_view}>
        <View style={styles.links_left_view}>
          <View style={styles.links_profile_image_view}>
            <MIIcon name='lock' size={20} color="#E3B12F" />

          </View>
          <View style={styles.links_name_view}>
            <Text style={styles.links_profile_name_text}>Change Password</Text>
          </View>
        </View>
          <View
          // onPress={handleChatPress}
          style={styles.right_view}>
          <MIIcon name='arrow-forward-ios' size={14} color="#000" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.links_view}>
        <View style={styles.links_left_view}>
          <View style={styles.links_profile_image_view}>
            <IIcon name='mail' size={20} color="#E3B12F" />

          </View>
          <View style={styles.links_name_view}>
            <Text style={styles.links_profile_name_text}>Invite Friends</Text>
          </View>
        </View>
          <View
          // onPress={handleChatPress}
          style={styles.right_view}>
          <MIIcon name='arrow-forward-ios' size={14} color="#000" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.links_view}>
        <View style={styles.links_left_view}>
          <View style={styles.links_profile_image_view}>
            <ADIcon name='exclamationcircle' size={20} color="#E3B12F" />

          </View>
          <View style={styles.links_name_view}>
            <Text style={styles.links_profile_name_text}>Privacy Policy</Text>
          </View>
        </View>
          <View
          // onPress={handleChatPress}
          style={styles.right_view}>
          <MIIcon name='arrow-forward-ios' size={14} color="#000" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.links_view}>
        <View style={styles.links_left_view}>
          <View style={styles.links_profile_image_view}>
            <MIIcon name='insert-drive-file' size={20} color="#E3B12F" />

          </View>
          <View style={styles.links_name_view}>
            <Text style={styles.links_profile_name_text}>Terms & Conditions</Text>
          </View>
        </View>
          <View
          // onPress={handleChatPress}
          style={styles.right_view}>
          <MIIcon name='arrow-forward-ios' size={14} color="#000" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.links_view}>
        <View style={styles.links_left_view}>
          <View style={styles.links_profile_image_view}>
            <MIIcon name='delete' size={20} color="#E3B12F" />

          </View>
          <View style={styles.links_name_view}>
            <Text style={styles.links_profile_name_text}>Delete Account</Text>
          </View>
        </View>
          <View
          // onPress={handleChatPress}
          style={styles.right_view}>
          <MIIcon name='arrow-forward-ios' size={14} color="#000" />
          </View>
        </TouchableOpacity>
      <View style={styles.create_button_view}>
          <CustomButton
            // buttonKey="signIn"
            // isLoading={!!loadingKey}
            // currentLoadingKey={loadingKey}
            // loaderColor="#FFF"
            // icon="heart"
            // iconSize={24}
            // iconColor="#FFFFFF"
            centerIcon="logout"
            centerIconSize={24}
            centerIconColor="#FFFFFF"
            // endIcon="logout"
            // endIconSize={24}
            // endIconColor="#FFFFFF"
            bgColor="#E3B12F"
            borderRadius={100}
            alignItems='center'
            txtColor="#FFFFFF"
            textStyle={{ fontSize: 19, fontWeight: '400', lineHeight: 20 }}
            // onPress={handleSubmit}
            padding={10}
            marginVertical={10}
          >
            Logout
          </CustomButton>
      </View>
      </ScrollView>
    </View>
  );
};

export default Account;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  headerContainer: {
    height: hp('8%'),
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',

  },
  headerText: {
    color: 'black',
    fontSize: 20,
    fontWeight: '500',
    lineHeight: 28,
    letterSpacing: 1,
    textAlign: 'center',
  },
  card_view1: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 6,

  },
  left_view: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    justifyContent: 'flex-start',
    alignItems: 'center',

  },
  profile_image_view: {
    justifyContent: 'center',
    alignItems: 'center',
    // marginVertical: 32,
  },
  profile_image_round_view: {
    width: wp('17%'),
    height: hp('8.5%'),
    borderRadius: 100,
    borderWidth: 1,
    borderColor: 'gray',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    marginRight: 10,
  },
  profile_image_round_view_no_border: {
    width: wp('20%'),
    height: hp('10.5%'),
    borderRadius: 100,
    borderWidth: 0,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  profile_image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',

  },
  profile_icon: {
    width: '46%',
    height: '46%',
    resizeMode: 'contain',
  },
  name_email_view: {
    // width: wp('55%'),
    maxWidth: wp('55%'),
    flexDirection: 'column',
    backgroundColor: 'transparent',
    overflow: 'hidden'
  },
  profile_name_text: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
    lineHeight: 22,
  },
  profile_email_text: {
    fontSize: 14,
    fontWeight: '400',
    color: '#808080',
    lineHeight: 24,
  },
  right_view: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    alignItems: 'center',
  },
  right_icon: {
    justifyContent: 'center',
    alignItems: 'center',
    width: wp('12%'),
    height: hp('3.5%'),
    resizeMode: 'contain',
  },
  divider_view: {
    marginVertical: 10,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    height: hp('2%'),
  },

  links_view: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 6,
    marginVertical: 6,

  },
  links_left_view: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    justifyContent: 'flex-start',
    alignItems: 'center',

  },
  links_profile_image_view: {
    width: wp('11%'),
    height: hp('5.5%'),
    borderRadius: 50,
    backgroundColor: '#f9efd5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  links_name_view: {
    // width: wp('55%'),
    maxWidth: wp('55%'),
    flexDirection: 'column',
    backgroundColor: 'transparent',
    overflow: 'hidden'
  },
  links_profile_name_text: {
    fontSize: 17,
    fontWeight: '400',
    color: '#5F5F5F',
    lineHeight: 21,
  },
  links_right_view: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    alignItems: 'center',
  },
  links_right_icon: {
    justifyContent: 'center',
    alignItems: 'center',
    width: wp('12%'),
    height: hp('3.5%'),
    resizeMode: 'contain',
  },
  create_button_view: {
    marginVertical: 14,
  },
});