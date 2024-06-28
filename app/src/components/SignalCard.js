import { StyleSheet, Text, View } from 'react-native'
import React from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import FAIcon from 'react-native-vector-icons/FontAwesome6';
import CustomButton from './CustomButton';
import CustomDivider from './CustomDivider';
import Images from '../consts/images';

const SignalCard = ({ navigation }) => {

    return (
        <View style={styles.container}>
            <View style={styles.card_view}>
                <View style={styles.card_view1}>
                    <View style={styles.left_view}>
                        <Text style={styles.currency_text}>NZD/USD</Text>
                        <CustomButton
                            bgColor="#FFFFFF"
                            borderColor="#02C121"
                            borderWidth={0.8}
                            borderRadius={6}
                            txtColor="#02C121"
                            textStyle={{ fontSize: 13, fontWeight: '400', lineHeight: 15 }}
                            // onPress={handleGoogle}
                            icon="trending-up"
                            iconSize={20}
                            iconColor={"#02C121"}
                            // padding={10}
                            paddingLeft={8}
                            paddingRight={5}
                            width={wp('19%')}
                            height={hp('4%')}
                            flexDirection={'row'}
                            alignItems={'center'}
                            justifyContent={'space-between'}
                        >
                            BUY
                        </CustomButton>
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
                        borderRadius={6}
                        txtColor="#FFFFFF"
                        textStyle={{ fontSize: 13, fontWeight: '500', lineHeight: 15 }}
                        // onPress={handleGoogle}
                        icon="copy-outline"
                        iconSize={16}
                        iconColor={"#FFFFFF"}
                        // padding={10}
                        paddingLeft={8}
                        paddingRight={5}
                        width={wp('23%')}
                        height={hp('4%')}
                        flexDirection={'row'}
                        alignItems={'center'}
                        justifyContent={'space-between'}
                    >
                        Copy
                    </CustomButton>
                    </View>
                </View>
                <View style={styles.card_view3}>
                    <CustomDivider width='100%' height='5%' color='#949494' />
                </View>
                <View style={styles.card_view4}>
                    <View style={styles.left_view}>
                        <Text style={styles.profit_loss_text}>Profit </Text>
                        <Text style={styles.net_numbers_profit}>0.59038</Text>
                    </View>
                    <View style={styles.right_view}>
                        <Text style={styles.profit_loss_text}>Stop loss </Text>
                        <Text style={styles.net_numbers_loss}>0.59038</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default SignalCard

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: hp('2%'),
        left: '50%',
        transform: [{ translateX: -wp('45%') }],
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
        backgroundColor: 'transparent',

    },
    card_view: {
        width: wp('90%'),
        height: hp('18%'),
        resizeMode: 'contain',
        backgroundColor: '#FFFFFF',
        borderRadius: 11,
        borderWidth: 0.5,
        borderColor: '#949494',
        overflow: 'hidden',
        padding: 10,
        justifyContent: 'space-between'
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
        fontSize: 19,
        fontWeight: '600',
        color: '#333333',
        paddingRight: 5,
    },
    price_text: {
        fontSize: 19,
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
    card_view3: {
        height: hp('1%'),
        flexDirection: 'row',
        backgroundColor: 'transparent',
        alignItems: 'center',
    },
    card_view4: {
        flexDirection: 'row',
        backgroundColor: 'transparent',
        justifyContent: 'space-between',
    },
    profit_loss_text: {
        fontSize: 13,
        fontWeight: '400',
        lineHeight: 15,
        color: '#676767',
        paddingRight: 5,
    },
    net_numbers_profit: {
        fontSize: 13,
        fontWeight: '400',
        lineHeight: 15,
        color: '#02C121',
        paddingRight: 5,
    },
    net_numbers_loss: {
        fontSize: 13,
        fontWeight: '400',
        lineHeight: 15,
        color: '#FF4921',
        paddingRight: 5,
    },
})