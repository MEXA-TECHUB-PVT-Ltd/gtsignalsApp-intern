import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IIcon from 'react-native-vector-icons/Ionicons';


const Header = ({ navigation, headerText, onPress, rightIcon }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onPress} style={styles.overlayLeft}>
                <Icon name="arrow-back-ios" size={22} color="#333333" />
            </TouchableOpacity>
            <View style={styles.header}>
                <Text style={styles.headerText}>{headerText}</Text>
            </View>
            {rightIcon && (
                <TouchableOpacity
                    onPress={rightIcon.onPress}
                 style={styles.overlayRight}>
                    <IIcon name={rightIcon.name} size={rightIcon.size || 22} color={rightIcon.color || '#333333'} />
                </TouchableOpacity>
            )}
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
    overlayLeft: {
        position: 'absolute',
        left: 1,
        zIndex: 2,
        paddingLeft: 20,
    },
    overlayRight: {
        position: 'absolute',
        right: 1, // Adjust position as needed
        zIndex: 2,
        paddingRight: 20,
    },
});

export default Header;