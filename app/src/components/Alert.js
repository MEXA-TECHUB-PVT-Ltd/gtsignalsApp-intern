import { View, Text, StyleSheet, Image } from 'react-native';
import React from 'react';
import Images from '../consts/images';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const Alert = ({ successMessage, visible, type }) => {
    if (!visible) return null;

    const isError = type === 'error';

    return (
        <View style={styles.container}>
            <View style={styles.popupView}>
                <View style={[styles.image_view, { backgroundColor: isError ? '#FF0000' : '#00CB14' }]}>
                    <Image
                        source={Images.popupicon}
                        style={styles.image}
                    />
                </View>
                <View style={styles.textContainer}>
                    <Text style={[styles.messageTypeText, { color: isError ? '#FF0000' : '#00CB14' }]}>
                        {isError ? 'Failure' : 'Success'}
                    </Text>
                    <Text style={styles.messageText}>{successMessage}</Text>
                </View>
            </View>
        </View>
    );
};

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
    popupView: {
        flexDirection: 'row',
        width: wp('90%'),
        paddingHorizontal: 10,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        borderRadius: 11,
        justifyContent: 'flex-start',
        elevation: 10,
        paddingVertical: 5,
    },
    image_view: {
        top: -3,
        left: 6,
        width: wp('6.8%'),
        height: hp('3.3%'),
        borderRadius: 100,
        marginRight: 20,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 10,
    },
    image: {
        width: wp('4%'),
        height: hp('1.9%'),
        resizeMode: 'contain',
    },
    textContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
    },
    messageTypeText: {
        fontSize: hp('2%'),
        fontWeight: '600',
    },
    messageText: {
        fontSize: hp('2%'),
        fontWeight: '400',
        color: '#333333',
        letterSpacing: 0.5,
    },
});

export default Alert;
