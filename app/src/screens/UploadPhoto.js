import { StyleSheet, Text, View, StatusBar, Image, Alert } from 'react-native';
import React from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Header from '../components/Header';
import CustomButton from '../components/CustomButton';
import ImagePicker from 'react-native-image-crop-picker';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

const UploadPhoto = ({ route, navigation }) => {
  const { imageUri, fromCamera, fromEdit, fromCreate } = route.params;

  const requestCameraPermission = async () => {
    const result = await request(PERMISSIONS.ANDROID.CAMERA);
    return result === RESULTS.GRANTED;
  };

  const openCamera = async () => {
    const isCameraPermitted = await requestCameraPermission();
    if (isCameraPermitted) {
      ImagePicker.openCamera({
        width: wp('100%'),
        height: hp('90%'),
        cropping: true,
      }).then(image => {
        navigation.navigate('UploadPhoto', { imageUri: image.path, fromCamera: true });
      }).catch(error => {
        console.log(error);
        Alert.alert('Error', 'Could not open camera.');
      });
    } else {
      Alert.alert('Permission Denied', 'Camera permission is required to take a photo.');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="transparent" translucent barStyle="dark-content" />
      {fromCamera && (
        <View style={styles.headerContainer}>
          <Header
            headerText="Upload Photo"
            onPress={openCamera}
          />
        </View>
      )}
      <View style={styles.image_container}>
        {imageUri && <Image source={{ uri: imageUri }} style={styles.uploaded_image} />}
      </View>
      <View style={styles.button_container}>
        {fromCamera && (
        <CustomButton
          width={wp('32%')}
          height={hp('5%')}
          bgColor="#f9efd5"
          borderRadius={100}
          justifyContent="center"
          alignItems='center'
          txtColor="#e3b12f"
          textStyle={{ fontSize: 14, fontWeight: '500', lineHeight: 18 }}
          onPress={openCamera}
          marginVertical={10}
        >
          Change Photo
        </CustomButton>
        )}
        <CustomButton
          width={fromCamera ? wp('32%') : wp('75%')}
          height={hp('5%')}
          bgColor="#E3B12F"
          borderRadius={100}
          justifyContent="center"
          alignItems='center'
          txtColor="#FFFFFF"
          textStyle={{ fontSize: 14, fontWeight: '500', lineHeight: 18 }}
          onPress={() => (
            fromCreate
              ? navigation.navigate('CreateProfile', { imageUri })
              : navigation.navigate('EditProfile', { imageUri })
          )}
          marginVertical={10}
        >
          Add Photo
        </CustomButton>
      </View>
    </View>
  );
};

export default UploadPhoto;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerContainer: {
    justifyContent: 'center',
    backgroundColor: 'transparent',
    marginTop: 40,
    marginVertical: 14,
    paddingLeft: 20,
  },
  image_container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    overflow: 'hidden',
  },
  uploaded_image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  button_container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 22,
  },
});
