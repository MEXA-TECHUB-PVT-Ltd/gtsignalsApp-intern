import React from 'react';
import { StyleSheet, Text, Pressable, Image} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const CustomButton = ({
    buttonStyle,
    width,
    height,
    bgColor,
    borderColor,
    borderWidth,
    borderRadius,
    marginVertical,
    onPress,
    mode,
    children,
    textStyle,
    txtColor,
    icon,
    image,
    imageStyle,
    iconSize,
    iconColor,
    padding,
    paddingLeft,
    paddingRight,
    margin,
    flex,
    flexDirection,
    justifyContent,
    alignItems,
    opacityOnPress
}) => {
    return (
        // <View style={styles.container}>
            <Pressable
                onPress={onPress}
                style={({ pressed }) => [
                    // styles.button_container,
                    buttonStyle,
                    {
                        width: width,
                        height: height,
                        backgroundColor: bgColor,
                        borderColor: borderColor,
                        borderWidth: borderWidth,
                        borderRadius: borderRadius,
                        padding: padding,
                        paddingLeft: paddingLeft,
                        paddingRight: paddingRight,
                        margin: margin,
                        marginVertical: marginVertical,
                        flex: flex,
                        flexDirection: flexDirection,
                        justifyContent: justifyContent,
                        alignItems: alignItems,
                    },
                    mode && {
                        backgroundColor: 'transparent',
                        borderColor: borderColor,
                        borderWidth: borderWidth || 2,
                    },
                    pressed && { opacity: opacityOnPress || 0.5 },
                ]}>
            {image ? (
                <Image source={image} style={[{ width: iconSize, height: iconSize }, imageStyle]} />
            ) : (
                icon && (
                    <MaterialIcons name={icon} size={iconSize} color={iconColor} />
                )
            )}
                {children && (
                    <Text style={[styles.text, textStyle, { color: txtColor }]}>
                        {children}
                    </Text>
                )}
            </Pressable>

        // </View>
    );
};

const styles = StyleSheet.create({
    // container: {
    //     flexDirection: 'row',
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //     flexDirection: 'row',
    //     backgroundColor: 'green'
    // },
    // button_container: {
    //     // flex: 1,
    //     flexDirection: 'row',
    //     justifyContent: 'center',
    //     alignItems: 'center',
    // },
});

export default CustomButton;