import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import CustomButton from './CustomButton';
import CustomDivider from './CustomDivider';
import AlertComponent from './Alert';
import { useNavigation } from '@react-navigation/native';

const SignalCardWishList = ({ buttonType, onFavoritePress }) => {
    const isBuy = buttonType === 'buy';
    const [isWishListed, setIsWishListed] = useState(true);
    const navigation = useNavigation();

    // const handleBuyPress = () => {
    //     navigation.navigate('SignalDetails');
    // };

    const handleFavoritePress = () => {
        const message = isWishListed ? "Signal removed from wishlist" : "Signal added to wishlist";
        onFavoritePress(message);
        setIsWishListed(!isWishListed);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => navigation.navigate('SignalDetails')}
                style={styles.card_view}>
                <View style={styles.card_view1}>
                    <View style={styles.left_view}>
                        <Text style={styles.currency_text}>NZD/USD</Text>
                        <CustomButton
                            bgColor="#FFFFFF"
                            borderColor={isBuy ? "#02C121" : "#FF0000"}
                            borderWidth={0.8}
                            borderRadius={6}
                            txtColor={isBuy ? "#02C121" : "#FF0000"}
                            textStyle={{ fontSize: 13, fontWeight: '400', lineHeight: 15 }}
                            // onPress={handleBuyPress}
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
                            {isBuy ? "BUY" : "SELL"}
                        </CustomButton>
                    </View>
                    <View style={styles.right_view}>
                        <TouchableOpacity onPress={handleFavoritePress}>
                            <FAIcon
                                name={isWishListed ? 'heart' : 'heart-o'}
                                size={22}
                                color={isWishListed ? '#E3B12F' : '#A0A0A0'}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.card_view2}>
                    <View style={styles.left_view}>
                        <Text style={styles.date_text}>27-oct-2023, 08:20 AM</Text>
                    </View>
                    <View style={styles.right_view}>
                        <Text style={styles.price_text}>$113.22</Text>
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
            </TouchableOpacity>
        </View>
    );
};

export default SignalCardWishList;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
        marginBottom: 14,
    },
    card_view: {
        width: wp('87%'),
        height: hp('16%'),
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
        fontSize: 18,
        fontWeight: '600',
        color: '#333333',
        paddingRight: 5,
    },
    price_text: {
        fontSize: 18,
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
});
