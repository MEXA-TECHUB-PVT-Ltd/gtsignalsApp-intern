import React, { useState, useRef } from 'react';
import { StyleSheet, TextInput, View, Pressable, TouchableWithoutFeedback, Keyboard } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const CustomTextInput = ({
    leftIcon,
    leftIconSize = 24,
    leftIconColor = '#000',
    rightIcon = 'visibility',
    rightIconSize = 22,
    rightIconColor = '#949494',
    placeholder = '',
    placeholderTextColor = '#ADADAD',
    value,
    onChangeText,
    secureTextEntry = false,
    keyboardType = 'default',
    autoCapitalize = 'none',
    maxLength,
    multiline = false,
    onRightIconPress,
    focusedInput,
    setFocusedInput,
}) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(!secureTextEntry);
    const textInputRef = useRef(null);

    const handleTogglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
        if (onRightIconPress) {
            onRightIconPress();
        }
    };

    const handleFocus = () => {
        setFocusedInput(textInputRef.current);
    };

    const handleOutsidePress = () => {
        console.log('Pressed Outside');
        setFocusedInput(null);
        Keyboard.dismiss();
    };

    const isFocused = focusedInput === textInputRef.current;
    const shouldShowPlaceholder = !value && !isFocused;

    return (
        <TouchableWithoutFeedback onPress={handleOutsidePress}>
            <View style={styles.wrapper}>
                <View style={[styles.container, isFocused && styles.focusedContainer]}>
                    <Pressable onPress={handleFocus}>
                        {leftIcon && (
                            <MaterialIcons
                                name={leftIcon}
                                size={leftIconSize}
                                color={isFocused ? '#E3B12F' : leftIconColor}
                                style={styles.leftIconStyle}
                            />
                        )}
                    </Pressable>
                    <TextInput
                        ref={textInputRef}
                        style={[
                            styles.input,
                            { color: value ? 'black' : placeholderTextColor },
                            isFocused && { borderColor: '#E3B12F' },
                        ]}
                        placeholder={shouldShowPlaceholder ? placeholder : ''}
                        placeholderTextColor={placeholderTextColor}
                        value={value}
                        onChangeText={onChangeText}
                        secureTextEntry={!isPasswordVisible && secureTextEntry}
                        keyboardType={keyboardType}
                        autoCapitalize={autoCapitalize}
                        maxLength={maxLength}
                        multiline={multiline}
                        onTouchStart={handleFocus}
                    />
                    {rightIcon && secureTextEntry && (
                        <Pressable onPress={handleTogglePasswordVisibility}>
                            <MaterialIcons
                                name={isPasswordVisible ? 'visibility' : 'visibility-off'}
                                size={rightIconSize}
                                color={isFocused ? '#E3B12F' : rightIconColor}
                                style={styles.rightIconStyle}
                            />
                        </Pressable>
                    )}
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    },
    container: {
        backgroundColor: 'transparent',
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ADADAD',
        borderRadius: 12,
        paddingHorizontal: 10,
    },
    focusedContainer: {
        borderColor: '#E3B12F',
    },
    input: {
        backgroundColor: 'transparent',
        height: hp('6%'),
        flex: 1,
        fontSize: 14,
    },
    leftIconStyle: {
        marginRight: 10,
    },
    rightIconStyle: {
        marginLeft: 10,
    },
});

export default CustomTextInput;
