import React, { useState } from 'react';
import { StyleSheet, Text, View, StatusBar, ScrollView } from 'react-native';
import Header from '../components/Header';
import AppLogo from '../components/AppLogo';
import CustomButton from '../components/CustomButton';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import PagerView from 'react-native-pager-view';

const PremiumPlans = ({ navigation }) => {
    const [activePlanIndex, setActivePlanIndex] = useState(0);

    const handleBackPress = () => {
        navigation.navigate('Account');
    };

    const plans = [
        {
            title: 'Basic Plan',
            price: '$ 100',
            features: [
                'Access to a limited number of trading signals',
                'Advertisements displayed within the app.',
                'Basic market analysis tools.',
                'Limited customer support.'
            ]
        },
        {
            title: 'Premium Plan',
            price: '$ 700',
            features: [
                'Access to an extending range trading signals',
                'No advertisements within the app.',
                'Advanced market analysis tools.',
                'Priority customer support.'
            ]
        },
        {
            title: 'Pro Plan',
            price: '$ 300',
            features: [
                'Access to all trading signals',
                'Exclusive content and tools.',
                'Full customer support.',
                'Personalized trading recommendations.'
            ]
        }
    ];

    const renderPlan = (plan, index) => (
        <View key={index} style={styles.pageContainer}>
            <Text style={styles.basic_premium_pro_text}>{plan.title}</Text>
            <Text style={styles.dollar_text}>{plan.price}</Text>
            {plan.features.map((feature, idx) => (
                <Text key={idx} style={styles.one_line_text}>
                    <Text style={{ fontSize: 20, color: 'gold' }}>{`\u25CF`}</Text>
                    {'\t\t'}{feature}
                </Text>
            ))}
        </View>
    );

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="white" translucent={true} barStyle="dark-content" />
            <View style={styles.header_view}>
                <Header onPress={handleBackPress} headerText="Go Premium" />
            </View>
            <View style={styles.logo_view}>
                <AppLogo />
            </View>
            <PagerView
                style={styles.viewPager}
                initialPage={0}
                onPageSelected={(event) => {
                    setActivePlanIndex(event.nativeEvent.position);
                }}
            >
                {plans.map((plan, index) => (
                    <View key={index}>
                        {renderPlan(plan, index)}
                    </View>
                ))}
            </PagerView>
            <View style={styles.pagination}>
                {plans.map((plan, index) => (
                    <View
                        key={index}
                        style={[
                            styles.paginationDot,
                            index === activePlanIndex ? styles.activeDot : null
                        ]}
                    />
                ))}
            </View>
            <View style={styles.button_view}>
                <CustomButton
                    bgColor="#E3B12F"
                    borderRadius={100}
                    alignItems='center'
                    txtColor="#FFFFFF"
                    textStyle={{ fontSize: 19, fontWeight: '500', lineHeight: 22 }}
                    padding={10}
                    marginVertical={10}
                >
                    Buy Subscription
                </CustomButton>
            </View>
        </View>
    );
};

export default PremiumPlans;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        marginTop: hp('3%'),
    },
    header_view: {
        marginVertical: hp('3%'),
        backgroundColor: 'transparent'
    },
    logo_view: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent'
    },

    viewPager: {
        flex: 1,
    },
    pagination: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    paginationDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#CCCCCC',
        marginHorizontal: 5,
    },
    activeDot: {
        backgroundColor: '#E3B12F',
    },
    pageContainer: {
        width: wp('100%'),
        padding: 30,
        backgroundColor: 'transparent',
    },
    basic_premium_pro_text: {
        fontSize: 19,
        fontWeight: '500',
        lineHeight: 22,
        marginVertical: 6,
        color: '#222222',
    },
    dollar_text: {
        fontSize: 22,
        fontWeight: '600',
        marginVertical: 5,
        color: '#E3B12F',
        marginTop: 10,
    },
    one_line_text: {
        fontSize: 14,
        lineHeight: 20,
        color: '#333333',
        marginTop: 10,
        marginBottom: 10,
        width: wp('80%')
    },
    button_view: {
        marginVertical: 40,
        padding: 20,
        backgroundColor: 'transparent',
    },
});
