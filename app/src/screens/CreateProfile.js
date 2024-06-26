import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import Background from '../components/Background';
import Header from '../components/Header';
import CustomButton from '../components/CustomButton';
import CustomDivider from '../components/CustomDivider';
import Modal from '../components/Modal';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import CustomTextInput from '../components/CustomTextInput';
import Images from '../consts/images';
import ImagePicker from 'react-native-image-crop-picker';
import { launchImageLibrary } from 'react-native-image-picker';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { useFocusEffect } from '@react-navigation/native';
import AlertComponent from '../components/Alert';
import { Formik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
    fullName: Yup.string().required('name is required'),
});

const CreateProfile = ({ navigation, route }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [isAlertVisible, setAlertVisible] = useState(false);
    const [focusedInput, setFocusedInput] = useState(false);
    const [profileImage, setProfileImage] = useState(null);

    useFocusEffect(
        React.useCallback(() => {
            if (route.params?.imageUri) {
                setProfileImage(route.params.imageUri);
            }
        }, [route.params?.imageUri])
    );

    const handleBackPress = () => {
        navigation.navigate('SignUp');
    };

    const handleClose = () => {
        setModalVisible(false);
    };

    const handleAddImage = () => {
        setModalVisible(true);
    };


    const requestCameraPermission = async () => {
        const result = await request(PERMISSIONS.ANDROID.CAMERA);
        return result === RESULTS.GRANTED;
    };

    const requestPhotoLibraryPermission = async () => {
        const result = await request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
        return result === RESULTS.GRANTED;
    };

    const handleTakePhoto = async () => {
        const isCameraPermitted = await requestCameraPermission();
        if (isCameraPermitted) {
            ImagePicker.openCamera({
                width: wp('100%'),
                height: hp('90%'),
                cropping: true,
                cropperCircleOverlay: true,
                
            }).then(image => {
                setModalVisible(false);
                navigation.navigate('UploadPhoto', { imageUri: image.path, fromCamera: true });
            }).catch(error => {
                console.log(error);
                setModalVisible(false);
            });
        } else {
            Alert.alert('Permission Denied', 'Camera permission is required to take a photo.');
        }
    };

    // const handleChoosePhoto = () => {
    //     // Launch image library to select a photo
    //     launchImageLibrary({
    //         mediaType: 'photo', // Only select images, not videos
    //         maxHeight: 800,
    //         maxWidth: 800,
    //         quality: 1,
    //     }, (response) => {
    //         if (response.didCancel) {
    //             console.log('User cancelled image picker');
    //         } else if (response.error) {
    //             console.log('ImagePicker Error: ', response.error);
    //         } else {
    //             // Set selected image URI to state
    //             setProfileImage(response.uri);
    //             setModalVisible(true);
    //             // navigation.navigate('UploadPhoto', { imageUri: response.uri });
    //         }
    //     });
    // };

    const handleChoosePhoto = async () => {
        const isPhotoLibraryPermitted = await requestPhotoLibraryPermission();
        if (isPhotoLibraryPermitted) {
            ImagePicker.openPicker({
                width: wp('100%'),
                height: hp('100%'),
                cropping: true,
                cropperCircleOverlay: true,
            }).then(image => {
                setModalVisible(false);
                navigation.navigate('UploadPhoto', { imageUri: image.path, fromCamera: false });
            }).catch(error => {
                console.log(error);
                setModalVisible(false);
            });
        } else {
            Alert.alert('Permission Denied', 'Photo library permission is required to choose a photo.');
        }
    };

    const renderDivider = () => (
        <CustomDivider
            height={1}
            color="#e6e6e6"
            marginVertical={10} />
    );

    return (
        <ScrollView style={{ flex: 1}}>
            <Background>
                <Formik
                    initialValues={{ fullName: '' }}
                    validationSchema={validationSchema}
                    onSubmit={(values, actions) => {
                        actions.validateForm().then(() => {
                            actions.setSubmitting(false);
                            setAlertVisible(true);
                            setTimeout(() => {
                                setAlertVisible(false);
                                navigation.navigate('SignIn');
                            }, 1600);
                        });
                    }}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, touched, errors }) => (
                        <View style={styles.container}>
                            <View style={styles.header_view}>
                                <Header
                                    headerText={"Create Profile"}
                                    onPress={handleBackPress}
                                />
                            </View>
                          
                            <View style={styles.profile_image_view}>
                                <View style={profileImage ? styles.profile_image_round_view_no_border : styles.profile_image_round_view}>
                                    <Image
                                        source={profileImage ? { uri: profileImage } : Images.profileicon}
                                        style={profileImage ? styles.profile_image : styles.profile_icon}
                                    />
                                </View>
                            </View>
                            <View style={styles.add_button_view}>
                                <CustomButton
                                    width={wp('30%')}
                                    height={hp('4.5%')}
                                    bgColor="#E3B12F"
                                    borderRadius={100}
                                    justifyContent="center"
                                    alignItems='center'
                                    txtColor="#FFFFFF"
                                    textStyle={{ fontSize: 15, fontWeight: '500', lineHeight: 18 }}
                                    onPress={handleAddImage}
                                    marginVertical={10}
                                >
                                    Add Image
                                </CustomButton>
                            </View>
                            <View style={styles.input_view}>
                                <CustomTextInput
                                    placeholder="Full name"
                                    placeholderTextColor="#ADADAD"
                                    autoCapitalize="none"
                                    keyboardType='email-address'
                                    onChangeText={handleChange('fullName')}
                                    onBlur={handleBlur('fullName')}
                                    value={values.fullName}
                                    focusedInput={focusedInput}
                                    setFocusedInput={setFocusedInput}
                                />
                                {touched.fullName && errors.fullName &&
                                    <Text style={{ color: 'red' }}>{errors.fullName}</Text>
                                }
                            </View>
                            <View style={styles.create_profile_button_view}>
                                <CustomButton
                                    bgColor="#E3B12F"
                                    borderRadius={100}
                                    alignItems='center'
                                    txtColor="#FFFFFF"
                                    textStyle={{ fontSize: 19, fontWeight: '500', lineHeight: 22 }}
                                    onPress={handleSubmit}
                                    padding={10}
                                    marginVertical={10}
                                >
                                    Create Profile
                                </CustomButton>
                            </View>
                            <AlertComponent
                                successMessage="Profile created successfully"
                                visible={isAlertVisible} />
                        </View>
                    )}
                </Formik>
                <Modal
                    visible={modalVisible}
                    onClose={handleClose}
                    onTakePhoto={handleTakePhoto}
                    onChoosePhoto={handleChoosePhoto}
                    crossIcon="close"
                    crossIconSize={24}
                    crossIconColor="black"
                    leftIcon="camera"
                    leftIconColor="#E3B12F"
                    leftIconSize={24}
                    leftIconStyle={{ marginRight: 10 }}
                    text={"Take a Photo"}
                    textStyle={{ fontSize: 22, fontWeight: '400', color: '#333333', lineHeight: 30, }}
                    divider={renderDivider}
                    secondLeftIcon="picture"
                    secondLeftIconColor="#E3B12F"
                    secondLeftIconSize={24}
                    secondLeftIconStyle={{ marginRight: 10 }}
                    secondText={"Choose a Photo"}
                    secondTextStyle={{ fontSize: 22, fontWeight: '400', color: '#333333', lineHeight: 30, }}
                
                >
                </Modal>
                
            </Background>
        </ScrollView>
    );
};

export default CreateProfile;

const styles = StyleSheet.create({
    container: {
        height: hp('96.7%'),
        backgroundColor: 'transparent',
    },
    header_view: {
        marginVertical: hp('3%'),
    },
    profile_image_view: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 32,
    },
    profile_image_round_view: {
        width: wp('30%'),
        height: hp('15%'),
        borderRadius: 100,
        borderWidth: 1,
        borderColor: 'gray',
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    profile_image_round_view_no_border: {
        width: wp('30%'),
        height: hp('15%'),
        borderRadius: 100,
        borderWidth: 0, // No border when the image is set
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
        width: '50%',
        height: '55%',
        resizeMode: 'contain',
    },
    add_button_view: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    input_view: {
        height: hp('9%'),
        marginVertical: 40,
    },
    create_profile_button_view: {
        marginVertical: 140,
    },
});
