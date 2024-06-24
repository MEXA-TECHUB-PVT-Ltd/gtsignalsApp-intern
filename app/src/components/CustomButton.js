import React from 'react';
import { StyleSheet, Text, Pressable, Image, View } from 'react-native';
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
    opacityOnPress,
    endIcon,
    endIconBgColor,
    endIconBorderRadius,
    endIconSize,
    endIconColor,
    endIconContainerStyle,
    
}) => {
    return (
        <Pressable
            onPress={onPress}
            style={({ pressed }) => [
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
            <View style={[{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }]}>
                {image ? (
                    <Image source={image} style={[{ width: iconSize, height: iconSize }, imageStyle]} />
                ) : (
                    icon && (
                        <MaterialIcons name={icon} size={iconSize} color={iconColor} />
                    )
                )}
                {children && (
                    <Text style={[{ flex: 1, textAlign: 'center' }, textStyle, { color: txtColor }]}>
                        {children}
                    </Text>
                )}
                {endIcon && (
                    <View style={[{ backgroundColor: endIconBgColor, borderRadius: endIconBorderRadius }, endIconContainerStyle]}>
                        <MaterialIcons name={endIcon} size={endIconSize} color={endIconColor} />
                    </View>
                )}
            </View>
        </Pressable>
    );
};

export default CustomButton;