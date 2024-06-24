import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Images from '../consts/images';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Header = ({headerText}) => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>{headerText}</Text>
            </View>
            <TouchableOpacity style={styles.overlay}>
                <Icon name="arrow-back-ios" size={22} color="#333333" />
                {/* <View style={styles.overlay}>
                    
                </View> */}
            </TouchableOpacity>
          
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: hp('6%'),
        backgroundColor: 'transparent',
    },
    header: {
        position: 'absolute',
        zIndex: 1,
    },
    headerText: {
        color: '#333333',
        fontSize: hp('3%'),
        fontWeight: '500',
        lineHeight: 28,
        letterSpacing: 1,
    },
    overlay: {
        position: 'absolute',
        left: 1,
        zIndex: 2,
    },
    image: {
        width: wp('4%'),
        height: hp('1.9%'),
        resizeMode: 'contain',

    },
});

export default Header;
