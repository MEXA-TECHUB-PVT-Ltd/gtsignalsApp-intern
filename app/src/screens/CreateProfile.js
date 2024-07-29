import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Alert, ScrollView, StatusBar, TouchableWithoutFeedback, Keyboard } from 'react-native';
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
import { Formik } from 'formik';
import * as Yup from 'yup';
import CustomAlert from '../components/Alert';

import { useDispatch, useSelector } from 'react-redux';
import { updateProfile, resetStatus } from '../redux/userSlice';

const validationSchema = Yup.object().shape({
    fullName: Yup.string().required('Name is required'),
});

const CreateProfile = ({ navigation, route }) => {
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState('');
    const [loadingKey, setLoadingKey] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [focusedInput, setFocusedInput] = useState(false);
    const [profileImage, setProfileImage] = useState(null);

    const dispatch = useDispatch();

    const userId = useSelector((state) => state.user.user.id);
    // console.log('user id from user object in store afer registration: ', userId);
    const userEmail = useSelector((state) => state.user.user.email);
    // console.log('user email from user object in store after registration: ', userEmail);

    const handleButtonPress = (buttonKey, callback) => {
        setLoadingKey(buttonKey);
        setTimeout(() => {
            const userValidated = true;
            if (userValidated) {
                callback();
            } else {
                setLoadingKey(null);
            }
        }, 300);
    };

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
        Keyboard.dismiss();
        setModalVisible(true);
        setLoadingKey(null);
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
                // cropperCircleOverlay: true,
            }).then(image => {
                setModalVisible(false);
                setProfileImage(image.path);
                // navigation.navigate('UploadPhoto', { imageUri: image.path, fromCamera: true, fromCreate: true });
            }).catch(error => {
                console.log(error);
                setModalVisible(false);
            });
        } else {
            Alert.alert('Permission Denied', 'Camera permission is required to take a photo.');
        }
    };

    const handleChoosePhoto = async () => {
        const isPhotoLibraryPermitted = await requestPhotoLibraryPermission();
        if (isPhotoLibraryPermitted) {
            ImagePicker.openPicker({
                width: wp('100%'),
                height: hp('100%'),
                cropping: true,
                // cropperCircleOverlay: true,
            }).then(image => {
                setModalVisible(false);
                setProfileImage(image.path);
                // navigation.navigate('UploadPhoto', { imageUri: image.path, fromCamera: false, fromCreate: true });
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
            marginVertical={10}
        />
    );

    const handleCreateProfile = (values) => {
        const userData = { id: userId, name: values.fullName, image: profileImage };
        // console.log('data being sent to store from create profile screen: ', userData);
        handleButtonPress('CreateProfile', () => {
        dispatch(updateProfile(userData))
            .unwrap()
            .then((response) => {
                // console.log(response);
                // setAlertMessage(response.msg);
                setAlertMessage('Profile Created Successfully!');
                setAlertType('success');
                setAlertVisible(true);
                setTimeout(() => {
                    setAlertVisible(false);
                    navigation.navigate('Tab');
                    setLoadingKey(null);
                    dispatch(resetStatus());
                }, 1600);
            })
            .catch((error) => {
                console.log(error);
                // console.log(error.msg)
                setLoadingKey(null);
                setAlertMessage(error.msg);
                setAlertType('error');
                setAlertVisible(true);
                setTimeout(() => {
                    setAlertVisible(false);
                    setLoadingKey(null);
                }, 1600);
            });
        });
    };

    return (
        <TouchableWithoutFeedback>
            <Background>
                <StatusBar backgroundColor="transparent" translucent={true} barStyle="dark-content" />
                <Formik
                    initialValues={{ fullName: '' }}
                    validationSchema={validationSchema}
                    onSubmit={handleCreateProfile}
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
                                    buttonKey="AddImage"
                                    isLoading={!!loadingKey}
                                    currentLoadingKey={loadingKey}
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
                                    buttonKey="CreateProfile"
                                    isLoading={!!loadingKey}
                                    currentLoadingKey={loadingKey}
                                    loaderColor="#FFF"
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
                            <CustomAlert successMessage={alertMessage} visible={alertVisible} type={alertType} />
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
                />
            </Background>
        </TouchableWithoutFeedback>
    );
};

export default CreateProfile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
        // marginTop: hp('3%'),
    },
    header_view: {
        backgroundColor: 'transparent',
        marginVertical: hp('2.2%'),
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
        marginVertical: hp('6%'),
    },
    create_profile_button_view: {
        marginVertical: hp('14%'),
    },
});
