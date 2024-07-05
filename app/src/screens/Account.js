import { StyleSheet, Text, View, StatusBar, Modal, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Images from '../consts/images';
import ADIcon from 'react-native-vector-icons/AntDesign';
import IIcon from 'react-native-vector-icons/Ionicons';
import MIIcon from 'react-native-vector-icons/MaterialIcons';
import CustomDivider from '../components/CustomDivider';
import CustomButton from '../components/CustomButton';
import { ScrollView } from 'react-native-gesture-handler';

const Account = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [deletemodalVisible, setDeleteModalVisible] = useState(false);


  const handleEditPress = () => {
    navigation.navigate('EditProfile');
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleLogoutPress = () => {
    setModalVisible(true);
  };

  const handleYesLogout = () => {
    setModalVisible(false);
    navigation.navigate('SignIn');
  };

  const handleLogoutCancel = () => {
    setModalVisible(false);
  };

  const handleDeleteAccountPress = () => {
    setDeleteModalVisible(true);
  };

  const handleDeleteCancel = () => {
    setDeleteModalVisible(false);
  };

  const handleYesDelete = () => {
    setDeleteModalVisible(false);
    navigation.navigate('SignUp');
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
      <TouchableOpacity 
      onPress={() => navigation.navigate('PremiumPlans')}
      style={styles.links_view}>
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

      <TouchableOpacity 
        onPress={() => navigation.navigate('Chat')}
        style={styles.links_view}>
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
        <TouchableOpacity 
        onPress={() => navigation.navigate('WishList')}
        style={styles.links_view}>
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
        <TouchableOpacity 
        onPress={() => navigation.navigate('ChangePassword')}
        style={styles.links_view}>
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
        <TouchableOpacity 
        onPress={() => navigation.navigate('InviteFriends')}
        style={styles.links_view}>
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
        <TouchableOpacity 
        onPress={() => navigation.navigate('PrivacyPolicy')}
        style={styles.links_view}>
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
        <TouchableOpacity 
          onPress={() => navigation.navigate('TermsAndConditions')}
        style={styles.links_view}>
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
        <TouchableOpacity 
        onPress={handleDeleteAccountPress}
        style={styles.links_view}>
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
            onPress={handleLogoutPress}
            padding={10}
            marginVertical={10}
          >
            Logout
          </CustomButton>
      </View>
      
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalWrapper}>
            <View style={styles.first_view}>
              <Text style={styles.createAccount_text}>Logout</Text>
            </View>
            <View style={styles.second_view}>
              <Text style={styles.descriptive_text}>Are you sure you want to logout?</Text>
            </View>
            <View style={styles.third_view}>
              <CustomButton
                bgColor="#f9efd5"
                borderRadius={100}
                txtColor="#E3B12F"
                textStyle={{ fontSize: 13, fontWeight: '500', lineHeight: 19 }}
                onPress={handleLogoutCancel}
                padding={6}
                width={wp('32%')}
                flexDirection={'row'}
                alignItems={'center'}
                justifyContent={'center'}
              >
                Cancel
              </CustomButton>
              <CustomButton
                bgColor="#E3B12F"
                borderRadius={100}
                txtColor="#FFFEFA"
                textStyle={{ fontSize: 13, fontWeight: '500', lineHeight: 19 }}
                onPress={handleYesLogout}
                padding={6}
                width={wp('32%')}
                flexDirection={"row"}
                alignItems={'center'}
                justifyContent={'center'}
              >
                Yes, Logout
              </CustomButton>
            </View>
            
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={deletemodalVisible}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalWrapper}>
            <View style={styles.first_view}>
              <Text style={styles.createAccount_text}>Delete Account</Text>
            </View>
            <View style={styles.second_view}>
              <Text style={styles.descriptive_text}>Are you sure you want to delete your account?</Text>
            </View>
            <View style={styles.third_view}>
              <CustomButton
                bgColor="#f9efd5"
                borderRadius={100}
                txtColor="#E3B12F"
                textStyle={{ fontSize: 13, fontWeight: '500', lineHeight: 19 }}
                onPress={handleDeleteCancel}
                padding={6}
                width={wp('32%')}
                flexDirection={'row'}
                alignItems={'center'}
                justifyContent={'center'}
              >
                Cancel
              </CustomButton>
              <CustomButton
                bgColor="#E3B12F"
                borderRadius={100}
                txtColor="#FFFEFA"
                textStyle={{ fontSize: 13, fontWeight: '500', lineHeight: 19 }}
                onPress={handleYesDelete}
                padding={6}
                width={wp('32%')}
                flexDirection={"row"}
                alignItems={'center'}
                justifyContent={'center'}
              >
                Yes, Delete
              </CustomButton>
            </View>

          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Account;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 20,
  },
  scroll_view: {

  },
  headerContainer: {
    height: hp('10%'),
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

  modalOverlay: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalWrapper: {
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    width: wp('100%'),
    minHeight: hp('22%'),
    maxHeight: hp('95%'),
  },
  first_view: {
    marginVertical: 5,
  },
  second_view: {
    marginVertical: 15,
  },
  third_view: {
    width: wp('70%'),
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
    marginVertical: 15,

  },
  fourth_view: {
    marginVertical: 5,

  },
  createAccount_text: {
    fontSize: 18,
    fontWeight: '500',
    color: '#E3B12F',
    textAlign: 'center',
    lineHeight: 31,
  },
  descriptive_text: {
    fontSize: 14,
    fontWeight: '300',
    color: '#676767',
    textAlign: 'center',
    lineHeight: 18,
    paddingHorizontal: 36,
    backgroundColor: 'transparent'
  },
});