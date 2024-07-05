import { StyleSheet, Text, View, Image, StatusBar } from 'react-native'
import React, { useState } from 'react';
import Header from '../components/Header';
import Images from '../consts/images';
import CustomButton from '../components/CustomButton';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Alert from '../components/Alert';
import IIcon from 'react-native-vector-icons/Ionicons';
import Modal from '../components/Modal';


const InviteFriends = ({ navigation }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [isAlertVisible, setAlertVisible] = useState(false);

    const firstRowOptions = [
        { icon: Images.whatsappicon, label: 'Whatsapp' },
        { icon: Images.facebookimage, label: 'Facebook' },
        { icon: Images.twittericon, label: 'Twitter' },
        { icon: Images.instagramicon, label: 'Instagram' },
    ];

    const secondRowOptions = [
        { icon: Images.gmailimage, label: 'Gmail' },
        { icon: Images.telegramimage, label: 'Telegram' },
        { icon: Images.linkedinimage, label: 'LinkedIn' },
        { icon: Images.threedotsimage, label: 'Others' },

    ];

    const handleBackPress = () => {
        navigation.navigate('Account');
    };

    const handleCopyLink = () => {
        setAlertVisible(true);
        setTimeout(() => {
            setAlertVisible(false);
        }, 2000);
    };

    const handleShare = () => {
        setModalVisible(true);
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="white" />
            <View style={styles.main_view}>

                <View style={styles.header_view}>
                    <Header
                        onPress={handleBackPress}
                    />
                </View>
                <View style={styles.image_view}>
                    <Image
                        source={Images.invitefriendsimage}
                        style={styles.friends_image}
                    />
                </View>
                <View style={styles.heading_text_view}>
                    <Text style={styles.heading_text}>Invite Friends!</Text>
                </View>
                <View style={styles.description_text_view}>
                    <Text style={styles.description_text}>
                        Invite your friends to join our trading community and reap the benefits together. Share the love of trading and help each other succeed.
                    </Text>
                </View>
                <View style={styles.third_view}>
                    <CustomButton
                        bgColor="#E3B12F"
                        borderRadius={100}
                        txtColor="#FFFEFA"
                        textStyle={{ fontSize: 13, fontWeight: '500', lineHeight: 19 }}
                        onPress={handleCopyLink}
                        centerIcon="file-copy"
                        centerIconSize={14}
                        centerIconColor="#FFFFFF"
                        padding={6}
                        width={wp('36%')}
                        height={hp('6%')}
                        flexDirection={'row'}
                        alignItems={'center'}
                        justifyContent={'center'}
                    >
                        Copy Link
                    </CustomButton>
                    <CustomButton
                        bgColor="#E3B12F"
                        borderRadius={100}
                        txtColor="#FFFEFA"
                        textStyle={{ fontSize: 13, fontWeight: '500', lineHeight: 19 }}
                        onPress={handleShare}
                        centerIcon="share"
                        centerIconSize={16}
                        centerIconColor="#FFFFFF"
                        padding={6}
                        width={wp('36%')}
                        height={hp('6%')}
                        flexDirection={"row"}
                        alignItems={'center'}
                        justifyContent={'center'}
                    >
                        Share
                    </CustomButton>
                </View>
            </View>
            <Alert successMessage="Link copied successfully" visible={isAlertVisible} />
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalWrapper}>
                        <View style={styles.row_view}>
                            {firstRowOptions.map((option, index) => (
                                <View key={option.label} style={styles.icon_text_view}>
                                    <View style={styles.icon_backgrounnd}>
                                        <Image
                                            source={option.icon}
                                            style={styles.image}
                                        />
                                    </View>
                                    <Text style={styles.text}>{option.label}</Text>
                                </View>
                            ))}
                        </View>
                        <View style={styles.row_view}>
                            {secondRowOptions.map((option, index) => (
                                <View key={index} style={styles.icon_text_view}>
                                    <View style={styles.icon_backgrounnd}>
                                        <Image
                                            source={option.icon}
                                            style={styles.image}
                                        />
                                    </View>
                                    <Text style={styles.text}>{option.label}</Text>
                                </View>
                            ))}
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

export default InviteFriends

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        marginTop: 20,
    },
    main_view: {
        flex: 1,
        backgroundColor: 'transparent',
        padding: 20,
    },
    header_view: {
        // marginVertical: 20,
        backgroundColor: 'transparent',
        height: hp('6%'),
    },
    image_view: {
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 30,
    },
    friends_image: {
        width: wp('85%'),
        height: hp('25%'),
        resizeMode: 'contain',
    },
    heading_text_view: {
        marginVertical: 10,
    },
    heading_text: {
        alignSelf: 'center',
        color: '#333333',
        fontSize: 22,
        fontWeight: '500',
    },
    description_text_view: {
        marginVertical: 10,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: wp('5%'),
    },
    description_text: {
        textAlign: 'center',
        color: '#676767',
        fontSize: 14,
        fontWeight: '300',
        lineHeight: 23,
        width: '100%',
    },
    third_view: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: 'transparent',
        marginVertical: 40,
    },

    row_view: {
        backgroundColor: 'transparent',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginVertical: 20,
    },
    icon_text_view: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon_backgrounnd: {
        width: wp('12%'),
        height: wp('12%'),
        backgroundColor: '#f5f5f5',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
    },
    image: {
        width: wp('7%'),
        height: wp('7%'),
        // borderRadius: 50,
        resizeMode: 'contain',
    },
    text: {
        fontSize: 12,
        fontWeight: '400',
        lineHeight: 16,
        color: 'black',
        textAlign: 'center',
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
        padding: 10,
        width: wp('100%'),
        minHeight: hp('22%'),
        maxHeight: hp('95%'),
    },
})
