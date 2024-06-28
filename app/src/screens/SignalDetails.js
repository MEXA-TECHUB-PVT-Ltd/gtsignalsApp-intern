import { StyleSheet, Text, View, StatusBar, ScrollView, TouchableOpacity } from 'react-native'
import React, {useState, useEffect} from 'react';
import Header from '../components/Header';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import CustomDivider from '../components/CustomDivider';
import CustomButton from '../components/CustomButton';
import AlertComponent from '../components/Alert';

const SignalDetails = ({ navigation }) => {
    const [isAlertVisible, setAlertVisible] = useState(false);

    const showAlert = () => {
        setAlertVisible(true);
        setTimeout(() => {
            setAlertVisible(false);
        }, 1600);
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" height={10} />
            
            <View style={styles.header_view}>
                <Header
                    navigation={navigation}
                    headerText="Signal Details"
                    onPress={() => navigation.navigate('Home')}
                    rightIcon={{ name: 'heart-outline', size: 22, color: '#333333' }}
                />
              
            </View>
            <ScrollView 
            showsVerticalScrollIndicator={false}
            style={styles.scrollable_view}>
                <View style={styles.signal_details_view}> 
                <TouchableOpacity
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
                                onPress={showAlert}
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
                </TouchableOpacity>
                </View>
                <View style={styles.charts_view}>

                </View>
                <View style={styles.tradeinfo_text_view}>
                    <Text style={styles.trade_info}>Trade Info</Text>
                </View>
                <View style={styles.info_view}>
                    <Text style={styles.left_text}>Action</Text>
                    <CustomButton
                        bgColor="#FFFFFF"
                        borderColor={ "#02C121"}
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
                <AlertComponent
                    successMessage="Signal copied successfully"
                    visible={isAlertVisible}
                />
            </ScrollView>
            
        </View>
    )
}

export default SignalDetails

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    header_view: {
        backgroundColor: 'transparent',
        height: hp('12%'),
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
        backgroundColor: 'gray',
        opacity: 0.1,
        height: hp('36%'),
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
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
    
})