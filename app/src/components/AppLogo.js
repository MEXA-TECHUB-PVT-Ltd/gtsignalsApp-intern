import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Images from '../consts/images';

const AppLogo = () => {
    return (
        <View style={styles.container}>
            <Image
                source={Images.applogo}
                style={styles.image}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        width: wp('50%'),
        height: hp('16%'),
    },
    image: {
       width: wp('50%'),
       height: hp('50%'),
       resizeMode: 'contain',
    },
});

export default AppLogo;