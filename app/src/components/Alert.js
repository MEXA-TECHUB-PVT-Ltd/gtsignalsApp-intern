import { View, Text, StyleSheet, Image } from 'react-native';
import React from 'react';
import Images from '../consts/images';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const Alert = ({ successMessage, visible }) => {
    if (!visible) return null;

    return (
        <View style={styles.container}>
            <View style={styles.popupView}>
                <View style={styles.image_view}>
                    <Image
                        source={Images.popupicon}
                        style={styles.image}
                    />
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.successText}>Success</Text>
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
        backgroundColor: '#00CB14',
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
    successText: {
        fontSize: hp('2%'),
        fontWeight: '600',
        color: '#00CB14',
    },
    messageText: {
        fontSize: hp('2%'),
        fontWeight: '400',
        color: '#333333',
        // marginBottom: 5,
        letterSpacing: 0.5,
    },
});

export default Alert;
