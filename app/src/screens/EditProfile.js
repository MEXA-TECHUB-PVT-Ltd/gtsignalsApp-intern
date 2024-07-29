import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Alert, StatusBar } from 'react-native';
import Header from '../components/Header';
import CustomButton from '../components/CustomButton';
import CustomDivider from '../components/CustomDivider';
import Modal from '../components/Modal';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import CustomTextInput from '../components/CustomTextInput';
import Images from '../consts/images';
import ImagePicker from 'react-native-image-crop-picker';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { useFocusEffect } from '@react-navigation/native';
import AlertComponent from '../components/Alert';
import { Formik } from 'formik';
import * as Yup from 'yup';
import CustomAlert from '../components/Alert';

import { useDispatch, useSelector } from 'react-redux';
import { updateProfile, resetStatus } from '../redux/userSlice';

const validationSchema = Yup.object().shape({
    fullName: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email formate'),
});

const EditProfile = ({ navigation, route }) => {
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState('');
    const [loadingKey, setLoadingKey] = useState(null);

    const [modalVisible, setModalVisible] = useState(false);
    const [focusedInput, setFocusedInput] = useState(false);

    const dispatch = useDispatch();

    const user = useSelector((state) => state.user.user);
    console.log('user data in store in edit profile screen: ', user);

    const userImage = user.image;
    // console.log('image from user object after registration in account screen: ', userImage);
    const userName = user.name;
    // console.log('name from user object after registration in account screen: ', userName);
    const userEmail = user.email;
    // console.log('email from user object after registration in account screen: ', userEmail);
    const userId = user.id;
    // console.log('id from user object after registration in account screen: ', userId);
    const [profileImage, setProfileImage] = useState(userImage || null);


    //for signIN
    // const userId = user.data.id;
    // // console.log('user id from user object in store from signIN: ', userId);
    // const userImage = user.data.image;
    // // console.log('user image from user object in store from signIN: ', userImage);
    // const userName = user.data.name;
    // // console.log('user name from user object in store from signIN: ', userName);
    // const userEmail = user.data.email;
    // // console.log('user email from user object in store from signIN: ', userEmail);
    // const [profileImage, setProfileImage] = useState(userImage || null);

    // for registration
    // const userImage = user.user.image;
    // // console.log('image from user object after registration in account screen: ', userImage);
    // const userName = user.user.name;
    // // console.log('name from user object after registration in account screen: ', userName);
    // const userEmail = user.user.email;
    // // console.log('email from user object after registration in account screen: ', userEmail);
    // const userId = user.user.id;
    // // console.log('id from user object after registration in account screen: ', userId);
    // const [profileImage, setProfileImage] = useState(userImage || null);

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
        navigation.navigate('Account');
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
                // cropperCircleOverlay: true,
            }).then(image => {
                setModalVisible(false);
                setProfileImage(image.path);
                // navigation.navigate('UploadPhoto', { imageUri: image.path, fromCamera: true, fromEdit: true, });
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
                // navigation.navigate('UploadPhoto', { imageUri: image.path, fromCamera: false, fromEdit: true });
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

    const handleEditProfile = (values) => {
        const userData = { id: userId, name: values.fullName, image: profileImage, email: values.email };
        // console.log('data updated from edit profile screen: ', userData);
        handleButtonPress('EditProfile', () => {
            dispatch(updateProfile(userData))
                .unwrap()
                .then((response) => {
                    // console.log(response);
                    setAlertMessage(response.msg);
                    setAlertType('success');
                    setAlertVisible(true);
                    setTimeout(() => {
                        setAlertVisible(false);
                        navigation.navigate('Account');
                        setLoadingKey(null);
                        dispatch(resetStatus());
                    }, 1600);
                })
                .catch((error) => {
                    // console.log(error);
                    console.log(error.msg)
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
        <View style={styles.main_container}>
            <StatusBar backgroundColor="white" barStyle="dark-content" />
            <View style={styles.header_view}>
                <Header
                    headerText={"Edit Profile"}
                    onPress={handleBackPress}
                />
            </View>
            
            <ScrollView 
            showsVerticalScrollIndicator={false}
            style={{ flex: 1 }}>
                <Formik
                    initialValues={{ fullName: userName || '', email: userEmail || '' }}
                    validationSchema={validationSchema}
                    onSubmit={handleEditProfile}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, touched, errors }) => (
                        <View style={styles.container}>
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
                                    textStyle={{ fontSize: 13, fontWeight: '500', lineHeight: 18 }}
                                    onPress={handleAddImage}
                                    marginVertical={10}
                                >
                                    Change Image
                                </CustomButton>
                            </View>
                            <View style={styles.input_container}>
                                <View style={styles.input_label_view}>
                                    <Text style={styles.input_label}>Full Name</Text>
                                </View>
                                <View style={styles.input_view}>
                                    <CustomTextInput
                                        placeholder="Full name"
                                        placeholderTextColor="#ADADAD"
                                        autoCapitalize="none"
                                        keyboardType='default'
                                        onChangeText={handleChange('fullName')}
                                        onBlur={handleBlur('fullName')}
                                        value={values.fullName}
                                        focusedInput={focusedInput}
                                        setFocusedInput={setFocusedInput}
                                    />
                                    {touched.fullName && errors.fullName &&
                                        <Text style={styles.errorText}>{errors.fullName}</Text>
                                    }
                                </View>
                            </View>
                            <View style={styles.input_container}>
                                <View style={styles.input_label_view}>
                                    <Text style={styles.input_label}>Email Address</Text>
                                </View>
                                <View style={styles.input_view_email}>
                                    <CustomTextInput
                                        placeholder="abc@email.com"
                                        placeholderTextColor="#ADADAD"
                                        autoCapitalize="none"
                                        keyboardType='email-address'
                                        onChangeText={handleChange('email')}
                                        onBlur={handleBlur('email')}
                                        value={values.email}
                                        focusedInput={focusedInput}
                                        setFocusedInput={setFocusedInput}
                                    />
                                    {touched.email && errors.email &&
                                        <Text style={styles.errorText}>{errors.email}</Text>
                                    }
                                </View>
                            </View>
                            <View style={styles.create_profile_button_view}>
                                <CustomButton
                                    buttonKey="EditProfile"
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
                                    Edit
                                </CustomButton>
                            </View>
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
            </ScrollView>
            {/* <AlertComponent successMessage="Profile edited successfully" visible={isAlertVisible} /> */}
            <CustomAlert successMessage={alertMessage} visible={alertVisible} type={alertType} />

        </View>
    );
};

export default EditProfile;

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        backgroundColor: 'white',
        marginTop: StatusBar.currentHeight || 0,
    },
    container: {
        // flex: 1,
        backgroundColor: 'transparent',
        padding: 20,
    },
    header_view: {
        marginVertical: hp('2%'),
    },
    profile_image_view: {
        justifyContent: 'center',
        alignItems: 'center',
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
        marginVertical: 5,
    },
    input_container: {
        marginBottom: 10,
    },
    input_label_view: {
        marginBottom: 8,
    },
    input_label: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333333',
    },
    input_view: {
        height: hp('9%'),
    },
    input_view_email: {
        backgroundColor: 'transparent',
        height: hp('9%'),
    },
    create_profile_button_view: {
        marginVertical: 80,
    },
    errorText: {
        color: 'red',
    },
});
