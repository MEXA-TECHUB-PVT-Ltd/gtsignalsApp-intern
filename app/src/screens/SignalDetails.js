import { StyleSheet, Text, View, AppRegistry, processColor, StatusBar, ScrollView, Button, Modal, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import CustomDivider from '../components/CustomDivider';
import CustomButton from '../components/CustomButton';
import AlertComponent from '../components/Alert';

import { LineChart, CandleStick } from 'react-native-charts-wrapper';

const SignalDetails = ({ navigation }) => {
    const [isAlertVisible, setAlertVisible] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [isFavorite, setIsFavorite] = useState(false);
    const [isUserSignedIn, setIsUserSignedIn] = useState(false);
    const [isAccountCreated, setIsAccountCreated] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    
    const showAlert = (message) => {
        setAlertMessage(message);
        setAlertVisible(true);
        setTimeout(() => {
            setAlertVisible(false);
        }, 1600);
    };

    // const handleFavoritePress = () => {
    //     if (isFavorite) {
    //         showAlert("Signal removed from wishlist");
    //     } else {
    //         showAlert("Signal added to wishlist");
    //     }
    //     setIsFavorite(!isFavorite);
    // };

    const handleFavoritePress = () => {
        if (isUserSignedIn && isAccountCreated) {
            if (isFavorite) {
                showAlert("Signal removed from wishlist");
            } else {
                showAlert("Signal added to wishlist");
            }
            setIsFavorite(!isFavorite);
        } else {
            setModalVisible(true);
        }
    };

    const handleModalSignInPress = () => {
        setModalVisible(false);
        navigation.navigate('SignIn');
    };
    
    const handleModalCreateAccountPress = () => {
        setModalVisible(false);
        navigation.navigate('SignUp');
    };

    const handleCloseModal = () => {
        setModalVisible(false);
    };

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={'white'} barStyle="dark-content" />

            <View style={styles.header_view}>
                <Header
                    navigation={navigation}
                    headerText="Signal Details"
                    onPress={() => navigation.navigate('Home')}
                    rightIcon={{
                        name: isFavorite ? 'heart' : 'heart-outline',
                        size: 22,
                        color: isFavorite ? '#E3B12F' : '#333333',
                        onPress: handleFavoritePress
                    }}
                />
            </View>
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={styles.scrollable_view}>
                <View style={styles.signal_details_view}>
                    <View
                        style={styles.card_view}>
                        <View style={styles.card_view1}>
                            <View style={styles.left_view}>
                                <Text style={styles.currency_text}>NZD/USD</Text>
                            </View>
                            <View style={styles.right_view}>
                                <Text style={styles.price_text}>$113.22</Text>
                            </View>
                        </View>
                        <View style={styles.card_view2}>
                            <View style={styles.left_view}>
                                <Text style={styles.date_text}>27-oct-2023, 08:20 AM</Text>
                            </View>
                            <View style={styles.right_view}>
                                <CustomButton
                                    bgColor="#E3B12F"
                                    borderRadius={4}
                                    txtColor="#FFFFFF"
                                    textStyle={{ fontSize: 11, fontWeight: '500', lineHeight: 15 }}
                                    onPress={() => showAlert("Signal copied successfully")}
                                    icon="copy-outline"
                                    iconSize={12}
                                    iconColor={"#FFFFFF"}
                                    paddingLeft={8}
                                    paddingRight={5}
                                    width={wp('17%')}
                                    height={hp('3.2%')}
                                    flexDirection={'row'}
                                    alignItems={'center'}
                                    justifyContent={'space-between'}
                                >
                                    Copy
                                </CustomButton>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.charts_view}>
                    <LineChart style={styles.chart}
                        data={{ dataSets: [{ label: "demo", values: [{ y: 1 }, { y: 2 }, { y: 1 }] }] }}
                    />
                </View>
                <View style={styles.tradeinfo_text_view}>
                    <Text style={styles.trade_info}>Trade Info</Text>
                </View>
                <View style={styles.info_view}>
                    <Text style={styles.left_text}>Action</Text>
                    <CustomButton
                        bgColor="#FFFFFF"
                        borderColor={"#02C121"}
                        borderWidth={0.8}
                        borderRadius={6}
                        txtColor={"#02C121"}
                        textStyle={{ fontSize: 13, fontWeight: '400', lineHeight: 15 }}
                        // onPress={handle_buy_press}
                        icon={"trending-up"}
                        iconSize={18}
                        iconColor={"#02C121"}
                        paddingLeft={8}
                        paddingRight={5}
                        width={wp('18%')}
                        height={hp('3.5%')}
                        flexDirection={'row'}
                        alignItems={'center'}
                        justifyContent={'space-between'}
                    >
                        BUY
                    </CustomButton>
                </View>
                <View style={styles.info_view}>
                    <Text style={styles.left_text}>Status</Text>
                    <Text style={styles.right_text}>Active</Text>
                </View>
                <View style={styles.divider_view}>
                    <CustomDivider />
                </View>
                <View style={styles.info_view}>
                    <Text style={styles.left_text}>Open price</Text>
                    <Text style={styles.right_text}>1.67890</Text>
                </View>
                <View style={styles.info_view}>
                    <Text style={styles.left_text}>Take profit 1</Text>
                    <Text style={styles.right_text}>1.67890</Text>
                </View>
                <View style={styles.info_view}>
                    <Text style={styles.left_text}>Take profit 2</Text>
                    <Text style={styles.right_text}>1.67890</Text>
                </View>
                <View style={styles.info_view}>
                    <Text style={styles.left_text}>Take profit 3</Text>
                    <Text style={styles.right_text}>1.67890</Text>
                </View>
                <View style={styles.divider_view}>
                    <CustomDivider />
                </View>
                <View style={styles.info_view}>
                    <Text style={styles.left_text}>Stop loss</Text>
                    <Text style={styles.right_text}>1.67890</Text>
                </View>
                <View style={styles.info_view}>
                    <Text style={styles.left_text}>Profit/Loss</Text>
                    <Text style={styles.right_text}>1.67890</Text>
                </View>
                <View style={styles.info_view}>
                    <Text style={styles.left_text}>Trade Result</Text>
                    <Text style={styles.right_text}>1.67890</Text>
                </View>
                <View style={styles.divider_view}>
                    <CustomDivider />
                </View>
                <View style={styles.info_view}>
                    <Text style={styles.left_text}>Trade Probability</Text>
                    <Text style={styles.right_text}>70 %</Text>
                </View>
                <View style={styles.info_view}>
                    <Text style={styles.left_text}>Time Frame</Text>
                    <Text style={styles.right_text}>H - 1</Text>
                </View>
                <View style={styles.info_view_last}>
                    <Text style={styles.left_text}>Last Update</Text>
                    <Text style={styles.right_text}>26-0ct-2023</Text>
                </View>

            </ScrollView>
            <AlertComponent
                successMessage={alertMessage}
                visible={isAlertVisible}
            />
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={handleCloseModal}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalWrapper}>
                        <View style={styles.first_view}>
                            <Text style={styles.createAccount_text}>Create Account</Text>
                        </View>
                        <View style={styles.second_view}>
                            <Text style={styles.descriptive_text}>Please Create an account to add this trade to you Wishlist</Text>
                        </View>
                        <View style={styles.third_view}>
                            <CustomButton
                                bgColor="#E3B12F"
                                borderRadius={100}
                                txtColor="#FFFEFA"
                                textStyle={{ fontSize: 13, fontWeight: '500', lineHeight: 19 }}
                                onPress={handleModalSignInPress}
                                padding={6}
                                width={wp('32%')}
                                flexDirection={'row'}
                                alignItems={'center'}
                                justifyContent={'center'}
                            >
                                Sign In
                            </CustomButton>
                            <CustomButton
                                bgColor="#E3B12F"
                                borderRadius={100}
                                txtColor="#FFFEFA"
                                textStyle={{ fontSize: 13, fontWeight: '500', lineHeight: 19 }}
                                onPress={handleModalCreateAccountPress}
                                padding={6}
                                width={wp('32%')}
                                flexDirection={"row"}
                                alignItems={'center'}
                                justifyContent={'center'}
                            >
                                Create Account
                            </CustomButton>
                        </View>
                        <View style={styles.fourth_view}>
                            <CustomButton
                                bgColor="#f9efd5"
                                borderRadius={100}
                                txtColor="#E3B12F"
                                textStyle={{ fontSize: 12, fontWeight: '500', lineHeight: 22 }}
                                onPress={handleCloseModal}
                                padding={6}
                                width={wp('72%')}
                                flexDirection={"row"}
                                alignItems={'center'}
                                justifyContent={'center'}
                            >
                                Cancel
                            </CustomButton>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

export default SignalDetails

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        marginTop: 20,
    },
    header_view: {
        backgroundColor: 'transparent',
        height: hp('10%'),
        justifyContent: 'flex-end',
        paddingBottom: 10,
    },
    scrollable_view: {
        flex: 1,
        margin: 20,
        marginTop: 0,
        marginBottom: 0,
        backgroundColor: 'transparent',
    },
    signal_details_view: {
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 14,
    },

    card_view: {
        width: wp('89%'),
        height: hp('8%'),
        backgroundColor: '#FFFFFF',
        overflow: 'hidden',
        justifyContent: 'space-between',
        backgroundColor: "transparent",

    },
    card_view1: {
        flexDirection: 'row',
        backgroundColor: 'transparent',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    left_view: {
        flexDirection: 'row',
        backgroundColor: 'transparent',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    right_view: {
        flexDirection: 'row',
        backgroundColor: 'transparent',
        alignItems: 'center',
    },
    currency_text: {
        fontSize: 17,
        fontWeight: '600',
        color: '#333333',
    },
    price_text: {
        fontSize: 17,
        fontWeight: '600',
        color: '#E3B12F'
    },
    card_view2: {
        flexDirection: 'row',
        backgroundColor: 'transparent',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    date_text: {
        fontSize: 13,
        fontWeight: '400',
        lineHeight: 15,
        color: '#A0A0A0',
        alignItems: 'center',
        justifyContent: 'center',
    },
    charts_view: {
        backgroundColor: 'pink',
        opacity: 0.8,
        height: hp('36%'),
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    chart: {
        width: 250,
        height: 230,
    },
    tradeinfo_text_view: {
        height: hp('5%'),
        backgroundColor: 'transparent',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 10,
    },
    trade_info: {
        fontSize: 26,
        fontWeight: '600',
        lineHeight: 31,
        color: '#E3B12F',
        letterSpacing: 1,
    },
    info_view: {
        flexDirection: 'row',
        backgroundColor: 'transparent',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
    },
    info_view_last: {
        flexDirection: 'row',
        backgroundColor: 'transparent',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 30,
    },
    divider_view: {
        flexDirection: 'row',
        backgroundColor: 'transparent',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
    },
    left_text: {
        fontSize: 17,
        fontWeight: '300',
        lineHeight: 20,
        color: '#676767',
        // letterSpacing: 1,
    },
    right_text: {
        fontSize: 18,
        fontWeight: '500',
        lineHeight: 21,
        color: '#333333',
        // letterSpacing: 1,
    },
    divider_view: {
        marginTop: 10,
        marginBottom: 5,
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
        justifyContent:'center',
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
        justifyContent:'space-between',
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
})
