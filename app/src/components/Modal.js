import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, FlatList } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SlIcon from 'react-native-vector-icons/SimpleLineIcons';
import CustomDivider from './CustomDivider';

const Modal = ({
    onClose,
    crossIcon,
    onTakePhoto,
    onChoosePhoto,
    crossIconSize,
    crossIconColor,
    leftIcon,
    leftIconSize,
    leftIconColor,
    leftIconStyle,
    text,
    textStyle,
    divider,
    secondLeftIcon,
    secondLeftIconSize,
    secondLeftIconColor,
    secondLeftIconStyle,
    secondText,
    secondTextStyle,
    children,
    visible,
}) => {
    if (!visible) return null;

    return (
        <View style={styles.overlay}>
            <View style={styles.modalWrapper}>
                <View style={styles.header}>
                    {crossIcon && (
                        <TouchableOpacity onPress={onClose} style={styles.cross_iconContainer}>
                            <Icon name={crossIcon} size={crossIconSize} color={crossIconColor} />
                        </TouchableOpacity>
                    )}
                </View>
                <TouchableOpacity
                    onPress={onTakePhoto}
                    style={styles.content}>
                    {leftIcon && (
                        <TouchableOpacity style={[styles.iconContainer, leftIconStyle]}>
                            <SlIcon name={leftIcon} size={leftIconSize} color={leftIconColor} />
                        </TouchableOpacity>
                    )}
                    {text && (
                        <Text style={[styles.text, textStyle]}>
                            {text}
                        </Text>
                    )}
                </TouchableOpacity>
                {divider && divider()}
                <TouchableOpacity
                    onPress={onChoosePhoto}
                    style={styles.content}>
                    {secondLeftIcon && (
                        <TouchableOpacity style={[styles.iconContainer, secondLeftIconStyle]}>
                            <SlIcon name={secondLeftIcon} size={secondLeftIconSize} color={secondLeftIconColor} />
                        </TouchableOpacity>
                    )}
                    {secondText && (
                        <Text style={[styles.text, secondTextStyle]}>
                            {secondText}
                        </Text>
                    )}
                </TouchableOpacity>
                {children}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
    },
    modalWrapper: {
        backgroundColor: 'white',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 10,
        width: wp('100%'),
        minHeight: hp('22%'),
        maxHeight: hp('95%'),
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    cross_iconContainer: {
        backgroundColor: 'transparent',
        padding: 5,
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 2,
        backgroundColor: 'transparent'
    },
    text: {
        fontSize: 16,
        fontWeight: 'normal',
        color: 'black',
    },
    iconContainer: {
        backgroundColor: 'transparent',
        padding: 10,
    },
    imageThumbnail: {
        width: wp('23%'), // Adjust size for four columns grid
        height: wp('23%'), // Adjust size for four columns grid
        margin: wp('1%'), // Adjust margin for four columns grid
    },
});

export default Modal;