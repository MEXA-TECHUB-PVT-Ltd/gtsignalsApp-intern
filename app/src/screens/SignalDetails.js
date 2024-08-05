import { StyleSheet, Text, View, StatusBar, ScrollView, Button, Modal, TouchableOpacity } from 'react-native'
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Header from '../components/Header';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import CustomDivider from '../components/CustomDivider';
import CustomButton from '../components/CustomButton';
import AlertComponent from '../components/Alert';

import { useDispatch, useSelector } from 'react-redux';
import { addToWishlist, removeFromWishlist, getAllWishlist, checkSaveItem } from '../redux/signalSlice';

import { LineChart } from 'react-native-charts-wrapper';
import Clipboard from '@react-native-clipboard/clipboard';

const SignalDetails = ({ route, navigation }) => {
    const { signal } = route.params;
    const {
        signal_id,
        title,
        price,
        date,
        time,
        signal_status,
        action,
        stop_loss,
        profit_loss,
        result,
        image,
        trade_probability,
        time_frame,
        take_profit,
        updated_at,
    } = signal;
    const [isAlertVisible, setAlertVisible] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [isUserSignedIn, setIsUserSignedIn] = useState(true);
    const [isAccountCreated, setIsAccountCreated] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [inWishlist, setInWishlist] = useState(null);

    const dispatch = useDispatch();
    const { checkSaveItemStatus, checkSaveItemResult, error } = useSelector((state) => state.signal);
    const user = useSelector((state) => state.user.user);
    const user_id = user.id;

    useEffect(() => {
        dispatch(checkSaveItem({ user_id: user_id, signal_id: signal_id }));
    }, [dispatch, user_id, signal_id]);

    useEffect(() => {
        if (checkSaveItemStatus === 'succeeded') {
            setInWishlist(checkSaveItemResult.save_status);
            // console.log(`Signal value in user wishlist is:`, checkSaveItemResult.save_status);
        } else if (checkSaveItemStatus === 'failed') {
            console.log(`Error: ${error}`);
        } else if (checkSaveItemStatus === 'loading') {
            // console.log('Loading...');
        }
    }, [checkSaveItemStatus, checkSaveItemResult, error]);

    let open_price_1 = null, open_price_2 = null, open_price_3 = null;
    let take_profit_1 = null, take_profit_2 = null, take_profit_3 = null;

    if (signal && Array.isArray(signal.take_profit)) {
        signal.take_profit.forEach((item, index) => {
            switch (index) {
                case 0:
                    open_price_1 = item.open_price || null;
                    take_profit_1 = item.take_profit || null;
                    break;
                case 1:
                    open_price_2 = item.open_price || null;
                    take_profit_2 = item.take_profit || null;
                    break;
                case 2:
                    open_price_3 = item.open_price || null;
                    take_profit_3 = item.take_profit || null;
                    break;
                default:
                    break;
            }
        });
    }

    // const firstOpenPrice = signal.take_profit.length > 0 ? signal.take_profit[0].open_price : null;
    const firstOpenPrice = signal && Array.isArray(signal.take_profit) && signal.take_profit.length > 0
        ? signal.take_profit[0].open_price
        : null;

    const secondOpenPrice = signal && Array.isArray(signal.take_profit) && signal.take_profit.length > 1
        ? signal.take_profit[1].open_price
        : null;

    const thirdOpenPrice = signal && Array.isArray(signal.take_profit) && signal.take_profit.length > 2
        ? signal.take_profit[2].open_price
        : null;
    const date_ = signal.date;
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'short' });
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };
    const _date = formatDate(date_);
    const updated_AT = signal.updated_at;
    const formatDateTime = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'short' });
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };
    const last_updated = formatDateTime(updated_AT);
    const isBuy = action === 'BUY';
    const resultText = signal.result ? "True" : "False";

    const copySignalDetails = () => {
        const details = `Signal Details:\nTitle: ${signal.title}\nPrice: ${signal.price}\nAction: ${signal.action}`;
        Clipboard.setString(details);
        console.log('signal details copied : ', details);
        showAlert("Signal copied successfully");
    };
    
    const showAlert = (message) => {
        setAlertMessage(message);
        setAlertVisible(true);
        setTimeout(() => {
            setAlertVisible(false);
        }, 1000);
    };

    const addOrRemoveFromWishlist = async () => {
        if (isUserSignedIn && isAccountCreated) {
            try {
                setInWishlist(!inWishlist);
                let response;
                if (inWishlist) {
                    response = await dispatch(removeFromWishlist({ user_id, signal_id: signal.signal_id })).unwrap();
                    showAlert("Signal removed successfully!");
                    // console.log('Backend response for removeFromWishlist : ', response.msg);
                } else {
                    response = await dispatch(addToWishlist({ user_id, signal_id: signal.signal_id })).unwrap();
                    showAlert("Signal added successfully!");
                    // console.log('Backend response for addToWishlist : ', response.msg);
                }
                
            } catch (error) {
                setInWishlist(inWishlist);
                console.error("Error while updating wishlist:", error);
            }
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
                    onPress={() => navigation.goBack()}
                    rightIcon={{
                        name: inWishlist ? 'heart' : 'heart-outline',
                        size: 22,
                        color: inWishlist ? '#E3B12F' : '#333333',
                        onPress: addOrRemoveFromWishlist
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
                                <Text style={styles.currency_text}>{title}</Text>
                            </View>
                            <View style={styles.right_view}>
                                <Text style={styles.price_text}>${price}</Text>
                            </View>
                        </View>
                        <View style={styles.card_view2}>
                            <View style={styles.left_view}>
                                <Text style={styles.date_text}>{_date}  {time}</Text>
                            </View>
                            <View style={styles.right_view}>
                                <CustomButton
                                    bgColor="#E3B12F"
                                    borderRadius={4}
                                    txtColor="#FFFFFF"
                                    textStyle={{ fontSize: 11, fontWeight: '500', lineHeight: 15 }}
                                    onPress={copySignalDetails}
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
                        borderColor={isBuy ? "#02C121" : "#FF0000"}
                        borderWidth={0.8}
                        borderRadius={6}
                        txtColor={isBuy ? "#02C121" : "#FF0000"}
                        textStyle={{ fontSize: 13, fontWeight: '400', lineHeight: 15 }}
                        onPress={() => { }}
                        icon={isBuy ? "trending-up" : "trending-down"}
                        iconSize={18}
                        iconColor={isBuy ? "#02C121" : "#FF0000"}
                        paddingLeft={8}
                        paddingRight={5}
                        width={wp('18%')}
                        height={hp('3.5%')}
                        flexDirection={'row'}
                        alignItems={'center'}
                        justifyContent={'space-between'}
                        disableFeedback={true}
                    >
                        {action}
                    </CustomButton>
                </View>
                <View style={styles.info_view}>
                    <Text style={styles.left_text}>Status</Text>
                    <Text style={styles.right_text}>{signal_status ? signal_status : 'waiting'}</Text>
                </View>
                <View style={styles.divider_view}>
                    <CustomDivider />
                </View>

                <View>
                    <View style={styles.info_view}>
                        <Text style={styles.left_text}>Open price</Text>
                        <Text style={styles.right_text}>{firstOpenPrice ? firstOpenPrice : 'waiting'}</Text>
                    </View>
                    {signal && Array.isArray(signal.take_profit) && signal.take_profit.length > 0 ? (
                        signal.take_profit.map((item, index) => (
                            <View key={item.take_profit_id} style={styles.info_view}>
                                <Text style={styles.left_text}>Take profit {index + 1}</Text>
                                <Text style={styles.right_text}>{item.take_profit}</Text>
                            </View>
                        ))
                    ) : (
                        <Text>No take profit data available</Text>
                    )}
                    {/* {signal.take_profit.map((item, index) => (
                        <View key={item.take_profit_id} style={styles.info_view}>
                            <Text style={styles.left_text}>Take profit {index + 1}</Text>
                            <Text style={styles.right_text}>{item.take_profit}</Text>
                        </View>
                    ))} */}
                </View>
                <View style={styles.divider_view}>
                    <CustomDivider />
                </View>
                <View style={styles.info_view}>
                    <Text style={styles.left_text}>Stop loss</Text>
                    <Text style={styles.right_text}>{stop_loss ? stop_loss : 'waiting'}</Text>
                </View>
                <View style={styles.info_view}>
                    <Text style={styles.left_text}>Profit/Loss</Text>
                    <Text style={styles.right_text}> {profit_loss ? profit_loss : 'waiting'}</Text>
                </View>

                <View style={styles.info_view}>
                    <Text style={styles.left_text}>Trade Result</Text>
                    <Text style={styles.right_text}>{signal.result !== null ? resultText : 'waiting'}</Text>
                </View>

                <View style={styles.divider_view}>
                    <CustomDivider />
                </View>
                <View style={styles.info_view}>
                    <Text style={styles.left_text}>Trade Probability</Text>
                    <Text style={styles.right_text}> {trade_probability ? trade_probability : 'waiting'}</Text>
                </View>
                <View style={styles.info_view}>
                    <Text style={styles.left_text}>Time Frame</Text>
                    <Text style={styles.right_text}>{time_frame ? time_frame : 'waiting'}</Text>
                </View>
                <View style={styles.info_view_last}>
                    <Text style={styles.left_text}>Last Update</Text>
                    <Text style={styles.right_text}>{last_updated ? last_updated : 'waiting'}</Text>
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
        marginTop: StatusBar.currentHeight|| 0,
    },
    header_view: {
        backgroundColor: 'transparent',
        marginVertical: hp('2%'),
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
        backgroundColor: 'transparent',
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
