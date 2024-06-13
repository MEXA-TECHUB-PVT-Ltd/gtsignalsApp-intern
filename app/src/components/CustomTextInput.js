import React, { useState } from 'react';
import { StyleSheet, TextInput, View, Pressable } from 'react-native';
import { MaterialIcons } from 'react-native-paper';

const CustomTextInput = ({
    containerStyle,
    inputStyle,
    leftIcon,
    leftIconSize,
    leftIconColor,
    rightIcon,
    rightIconSize,
    rightIconColor,
    placeholder,
    placeholderTextColor,
    value,
    onChangeText,
    secureTextEntry,
    keyboardType,
    autoCapitalize,
    maxLength,
    multiline,
    onRightIconPress,
}) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(!secureTextEntry);

    const handleTogglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
        if (onRightIconPress) {
            onRightIconPress();
        }
    };

    return (
        <View style={[styles.container, containerStyle]}>
            {leftIcon && (
                <MaterialIcons
                    name={leftIcon}
                    size={leftIconSize}
                    color={leftIconColor}
                    style={styles.leftIcon}
                />
            )}
            <TextInput
                style={[styles.input, inputStyle]}
                placeholder={placeholder}
                placeholderTextColor={placeholderTextColor}
                value={value}
                onChangeText={onChangeText}
                secureTextEntry={!isPasswordVisible && secureTextEntry}
                keyboardType={keyboardType}
                autoCapitalize={autoCapitalize}
                maxLength={maxLength}
                multiline={multiline}
            />
            {rightIcon && (
                <Pressable onPress={handleTogglePasswordVisibility}>
                    <MaterialIcons
                        name={isPasswordVisible ? 'visibility' : 'visibility-off'}
                        size={rightIconSize}
                        color={rightIconColor}
                        style={styles.rightIcon}
                    />
                </Pressable>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        padding: 10,
    },
    leftIcon: {
        marginRight: 10,
    },
    rightIcon: {
        marginLeft: 10,
    },
    input: {
        flex: 1,
        fontSize: 16,
    },
});

export default CustomTextInput;