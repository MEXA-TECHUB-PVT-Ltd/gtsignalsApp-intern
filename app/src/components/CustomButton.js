import React from 'react';
import { StyleSheet, Text, Pressable, View } from 'react-native';
import { MaterialIcons } from 'react-native-paper';

const CustomButton = ({
    containerStyle,
    bgColor,
    borderColor,
    borderWidth,
    borderRadius,
    onPress,
    mode,
    children,
    textStyle,
    txtColor,
    icon,
    iconSize,
    iconColor,
    padding,
    margin,
    opacityOnPress
}) => {
    return (
        <Pressable
            onPress={onPress}
            style={({ pressed }) => [
                styles.container,
                containerStyle,
                {
                    backgroundColor: bgColor,
                    borderColor: borderColor,
                    borderWidth: borderWidth,
                    borderRadius: borderRadius,
                    padding: padding,
                    margin: margin,
                },
                mode && {
                    backgroundColor: 'transparent',
                    borderColor: borderColor,
                    borderWidth: borderWidth || 2,
                },
                pressed && { opacity: opacityOnPress || 0.5 },
            ]}>
            {icon && (
                <MaterialIcons name={icon} size={iconSize} color={iconColor} />
            )}
            {children && (
                <Text style={[styles.text, textStyle, { color: txtColor }]}>
                    {children}
                </Text>
            )}
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    text: {
        fontSize: 16,
    },
});

export default CustomButton;