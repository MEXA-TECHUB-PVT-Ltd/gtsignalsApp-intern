import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import FAIcon from 'react-native-vector-icons/FontAwesome6';
import CustomButton from './CustomButton';
import CustomDivider from './CustomDivider';
import Images from '../consts/images';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

const BrokersCard = () => {
    const navigation = useNavigation();

    const handleChatPress = () => {
        navigation.navigate('Chat');
    };

    return (
        <View style={styles.container}>
            <View style={styles.card_view}>
                <View style={styles.card_view1}>
                    <View style={styles.left_view}>
                        <View style={styles.profile_image_view}>
                            <View style={styles.profile_image_round_view}>
                                <Image
                                    source={Images.profileicon}
                                    style={styles.profile_icon}
                                />
                            </View>
                        </View>
                        <Text style={styles.currency_text}>John Doe</Text>
                       
                    </View>
                    <TouchableOpacity
                    onPress={handleChatPress} 
                    style={styles.right_view}>
                        <Image
                            source={Images.brokerschaticon}
                            style={styles.right_icon}
                        />
                    </TouchableOpacity>
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
                        <Text style={styles.profit_loss_text}>loss </Text>
                        <Text style={styles.net_numbers_loss}>0.59038</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default BrokersCard

const styles = StyleSheet.create({
    container: {
        // position: 'absolute',
        // top: hp('2%'),
        // left: '50%',
        // transform: [{ translateX: -wp('45%') }],
        // zIndex: 1000,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',

    },
    card_view: {
        width: wp('88%'),
        height: hp('15.5%'),
        resizeMode: 'contain',
        backgroundColor: '#FFFFFF',
        borderRadius: 11,
        borderWidth: 0.5,
        borderColor: '#949494',
        overflow: 'hidden',
        padding: 10,
        justifyContent: 'space-between',
        marginBottom: 10,
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
    profile_image_view: {
        justifyContent: 'center',
        alignItems: 'center',
        // marginVertical: 32,
    },
    profile_image_round_view: {
        width: wp('14%'),
        height: hp('7%'),
        borderRadius: 100,
        borderWidth: 1,
        borderColor: 'gray',
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        marginRight: 10,
    },
    profile_image_round_view_no_border: {
        width: wp('15%'),
        height: hp('7.5%'),
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
    right_view: {
        flexDirection: 'row',
        backgroundColor: 'transparent',
        alignItems: 'center',
    },
    right_icon: {
        justifyContent:'center',
        alignItems: 'center',
        width: wp('12%'),
        height: hp('3.5%'),
        resizeMode: 'contain',
    },
    currency_text: {
        fontSize: 19,
        fontWeight: '600',
        color: '#333333',
        lineHeight: 23,
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
        fontSize: 17,
        fontWeight: '400',
        lineHeight: 19,
        color: '#676767',
        paddingRight: 5,
    },
    net_numbers_profit: {
        fontSize: 17,
        fontWeight: '500',
        lineHeight: 19,
        color: '#02C121',
        paddingRight: 5,
    },
    net_numbers_loss: {
        fontSize: 17,
        fontWeight: '500',
        lineHeight: 19,
        color: '#FF4921',
        paddingRight: 5,
    },
})