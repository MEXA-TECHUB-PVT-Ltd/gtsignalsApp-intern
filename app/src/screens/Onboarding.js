import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react';
import OnboardingBack from '../components/OnboardingBack';
import Images from '../consts/images';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


const Onboarding = () => {
    return (
        <OnboardingBack>
            <View style={styles.container}>
                <View style={styles.card_view}>
                    <Image
                        source={Images.Onboardingcards}
                        style={styles.card_image}
                    />
                </View>

            </View>
            <Text>Onboarding</Text>
        </OnboardingBack>
    )
}

export default Onboarding

const styles = StyleSheet.create({
    container: {

    },
    card_view: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    card_image: {
        width: wp('90%'),
        height: hp('90%'),
        resizeMode: 'contain',
    }
})