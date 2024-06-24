import React, { useState, useRef } from 'react';
import { StyleSheet, TextInput, View, Pressable } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const CustomTextInput = ({
    leftIcon,
    leftIconSize = 24,
    leftIconColor = '#000',
    rightIcon = 'visibility',
    rightIconSize = 24,
    rightIconColor = '#000',
    placeholder = '',
    placeholderTextColor = '#ADADAD',
    value,
    color,
    onChangeText,
    secureTextEntry = false,
    keyboardType = 'default',
    autoCapitalize = 'none',
    maxLength,
    multiline = false,
    onRightIconPress,
}) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(!secureTextEntry);
    const textInputRef = useRef(null);

    const handleTogglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
        if (onRightIconPress) {
            onRightIconPress();
        }
    };

    return (
        <View style={styles.container}>
            {leftIcon && (
                <MaterialIcons
                    name={leftIcon}
                    size={leftIconSize}
                    color={leftIconColor}
                    style={styles.leftIconStyle}
                />
            )}
            <TextInput
                ref={textInputRef}
                style={styles.input}
                placeholder={placeholder}
                placeholderTextColor={placeholderTextColor}
                value={value}
                color={color}
                onChangeText={onChangeText}
                secureTextEntry={!isPasswordVisible && secureTextEntry}
                keyboardType={keyboardType}
                autoCapitalize={autoCapitalize}
                maxLength={maxLength}
                multiline={multiline}
                // onFocus={() => console.log('Input Focused')}
                // onBlur={() => console.log('Input Blurred')}
            />
            {rightIcon && secureTextEntry && (
                <Pressable onPress={handleTogglePasswordVisibility}>
                    <MaterialIcons
                        name={isPasswordVisible ? 'visibility' : 'visibility-off'}
                        size={rightIconSize}
                        color={rightIconColor}
                        style={styles.rightIconStyle}
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
        borderColor: '#ADADAD',
        borderRadius: 12,
        paddingHorizontal: 10,
    },
    input: {
        height: hp('6%'),
        flex: 1,
    },
    leftIconStyle: {
        marginRight: 10,
    },
    rightIconStyle: {
        marginLeft: 10,
    },
});

export default CustomTextInput;
