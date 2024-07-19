import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import CustomButton from './CustomButton';
import CustomDivider from './CustomDivider';
import { useNavigation } from '@react-navigation/native';

const SignalCard = ({ signal }) => {
    const navigation = useNavigation();
    const { signal_id, title, price, date, time, action, stop_loss, profit_loss, take_profit } = signal;

    const isBuy = action === 'BUY';

    const handleDetailsPress = () => {
        navigation.navigate('SignalDetails', { signal });
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={handleDetailsPress} style={styles.card_view}>
                <View style={styles.card_view1}>
                    <View style={styles.left_view}>
                        <Text style={styles.currency_text}>{title}</Text>
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
                    <View style={styles.right_view}>
                        <Text style={styles.price_text}>${price}</Text>
                    </View>
                </View>
                <View style={styles.card_view2}>
                    <View style={styles.left_view}>
                        <Text style={styles.date_text}>{date}, {time}</Text>
                    </View>
                    <View style={styles.right_view}>
                        <CustomButton
                            bgColor="#E3B12F"
                            borderRadius={6}
                            txtColor="#FFFFFF"
                            textStyle={{ fontSize: 13, fontWeight: '500', lineHeight: 15 }}
                            onPress={() => { }}
                            icon="copy-outline"
                            iconSize={16}
                            iconColor={"#FFFFFF"}
                            marginRight={100}
                            paddingLeft={8}
                            paddingRight={5}
                            width={wp('21.5%')}
                            height={hp('3.8%')}
                            flexDirection={'row'}
                            alignItems={'center'}
                            justifyContent={'space-between'}
                            disableFeedback={true}
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
                        <Text style={styles.net_numbers_profit}>{profit_loss}</Text>
                    </View>
                    <View style={styles.right_view}>
                        <Text style={styles.profit_loss_text}>Stop loss </Text>
                        <Text style={styles.net_numbers_loss}>{stop_loss}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
};

export default SignalCard;

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
