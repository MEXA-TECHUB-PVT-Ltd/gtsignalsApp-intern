import React from 'react';
import { StyleSheet, Text, Pressable, Image, View, ActivityIndicator } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import IIcon from 'react-native-vector-icons/Ionicons';
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
    marginRight,
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
    centerIcon,
    centerIconSize,
    centerIconColor,
    isLoading,
    loaderColor,
    buttonKey,
    currentLoadingKey,
    disableFeedback,
}) => {
    const isCurrentLoading = isLoading && currentLoadingKey === buttonKey;

    return (
        <Pressable
            onPress={!isCurrentLoading ? onPress : null}
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
                pressed && !disableFeedback && { opacity: opacityOnPress || 0.5 },
            ]}>
            <View style={[{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }]}>
                {isCurrentLoading ? (
                    <ActivityIndicator size="small" color={loaderColor || "#E3B12F"} />
                ) : (
                    <>
                        {image ? (
                            <Image source={image} style={[{ width: iconSize, height: iconSize }, imageStyle]} />
                        ) : (
                            icon && (
                                <IIcon name={icon} size={iconSize} color={iconColor} marginRight={5} />
                            )
                        )}
                        {children && (
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                {centerIcon && (
                                        <MaterialIcons name={centerIcon} size={centerIconSize} color={centerIconColor} style={{ marginRight: 5, transform: [{ scaleX: -1 }] }} />
                                )}
                                <Text style={[{ textAlign: 'center' }, textStyle, { color: txtColor }]}>
                                    {children}
                                </Text>
                            </View>
                        )}
                        {endIcon && (
                            <View style={[{ backgroundColor: endIconBgColor, borderRadius: endIconBorderRadius, }, endIconContainerStyle]}>
                                <MaterialIcons name={endIcon} size={endIconSize} color={endIconColor} />
                            </View>
                        )}
                    </>
                )}
            </View>
        </Pressable>
    );
};

export default CustomButton;
