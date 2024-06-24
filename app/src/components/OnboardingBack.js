import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Images from '../consts/images';

const OnboardingBack = ({ children }) => {
    return (
        <View style={styles.container}>
            <Image
                source={Images.Onboardingback}
                style={styles.topLeftImage}
            />
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        position: 'relative',
        padding: 24,
    },
    topLeftImage: {
        position: 'absolute',
        width: wp('100%'),
        height: hp('86%'),
        resizeMode: 'contain',
    },
    bottomLeftImage: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: wp('55%'),
        height: hp('30%'),
        resizeMode: 'contain',
    },
    bottomRightImage: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: wp('70%'),
        height: hp('36%'),
        resizeMode: 'contain',
    },
});

export default OnboardingBack;
