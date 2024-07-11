import { StyleSheet, Text, View, Image, StatusBar, ImageBackground } from 'react-native';
import React, {useState} from 'react';
import OnboardingBack from '../components/OnboardingBack';
import Images from '../consts/images';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import CustomButton from '../components/CustomButton';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Onboarding = ({navigation}) => {
    const [loadingKey, setLoadingKey] = useState(null);

    const handleButtonPress = (buttonKey, callback) => {
        setLoadingKey(buttonKey);
        // Simulate an API call for button action
        setTimeout(() => {
            // Assuming user validation
            const userValidated = true; // Replace with actual validation logic
            if (userValidated) {
                callback();
            } else {
                setLoadingKey(null);
            }
        }, 1000);
    };

    const handleReset = () => {
        handleButtonPress('Get Started', () => {
            setLoadingKey(null);
            navigation.navigate('SignIn');
        });
    };

    return (
        <View style={styles.main_container}>
        <StatusBar backgroundColor="transparent" translucent={true} barStyle="dark-content" />

        <OnboardingBack>
            <View style={styles.container}>
                <View style={styles.card_view}>
                    <Image
                        source={Images.Onboardingcards}
                        style={styles.card_image}
                    />
                </View>
                <View style={styles.text_image_view}>
                    <View style={styles.bta_image_view}>
                        <ImageBackground
                            source={Images.textbg}
                            style={styles.bta_image_background}
                            imageStyle={styles.bta_image}
                        >
                        </ImageBackground>
                    </View>
                    <View style={styles.bta_text_view}>
                            {/* <Text style={{ fontFamily: "Montserrat-Italic-VariableFont_wght", color: 'black'}}>The Best Trading App</Text> */}

                        <Text style={styles.bta_text}>The Best Trading App</Text>
                    </View>
                </View>
                <View style={styles.descriptive_text_view}>
                    <Text style={styles.descriptive_text}>Elevate your trading experience with the premier currency exchange app  - where every trade tells a story.</Text>
                </View>
                <View style={styles.button_view}>
                    <CustomButton
                        buttonKey="Get Started"
                        isLoading={!!loadingKey}
                        currentLoadingKey={loadingKey}
                        loaderColor="#FFF"
                        bgColor="#E3B12F"
                        borderRadius={100}
                        alignItems='center'
                        txtColor="#FFFFFF"
                        textStyle={{ fontSize: 19, fontWeight: '500', lineHeight: 22 }}
                        onPress={handleReset}
                        padding={10}
                        marginVertical={10}
                        endIcon="keyboard-arrow-right"
                        endIconSize={30}
                        endIconColor="#E3B12F"
                        endIconBgColor="#FFFFFF"
                        endIconBorderRadius={50}    
                        endIconContainerStyle={{justifyContent: 'center', alignItems: 'center', width: wp('10%'), height: hp('5%'), position: 'absolute', right: -104 }}
                    >
                        Get Started
                    </CustomButton>
                </View>
            </View>
        </OnboardingBack>
        </View>
    );
};

export default Onboarding;

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    container: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    card_view: {
        backgroundColor: 'transparent',
        alignItems: 'center',
        marginVertical: hp('2%'),

    },
    card_image: {
        width: wp('90%'),
        height: hp('50%'),
        resizeMode: 'contain',
    },
    text_image_view: {
        backgroundColor: 'transparent',
        justifyContent: 'flex-end',
    },
    bta_image_view: {
        width: wp("80%"),
        backgroundColor: 'transparent',
    },
    bta_image_background: {
        backgroundColor: 'transparent',
    },
    bta_image: {
        resizeMode: 'contain',
        width: wp('26%'),
        height: hp('12%'),
        backgroundColor: 'transparent',
        marginLeft: 170
    },
    bta_text_view: {
        backgroundColor: 'transparent'
    },
    bta_text: {
        fontFamily: 'PlaywriteGBS-ExtraLight',
        fontSize: hp('5%'),
        fontWeight: '700',
        lineHeight: 38,
        color: '#000000',
    },
    descriptive_text_view: {
       
        backgroundColor: 'transparent',
    },
    descriptive_text: {
        fontFamily: 'Roboto-Italic',
        fontSize: hp('2%'),
        fontWeight: '400',
        lineHeight: 20,
        color: '#676767',
        marginVertical: 10,
    },
    button_view: {
        backgroundColor: 'transparent',
        marginVertical: 26,
    },
    
});
