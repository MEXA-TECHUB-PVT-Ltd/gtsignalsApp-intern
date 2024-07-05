import React, { useState } from 'react';
import { StyleSheet, Text, View, StatusBar, TouchableOpacity, Modal, ScrollView } from 'react-native';
import Header from '../components/Header';
import AppLogo from '../components/AppLogo';
import CustomButton from '../components/CustomButton';
import CustomDivider from '../components/CustomDivider';
import Alert from '../components/Alert';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import PagerView from 'react-native-pager-view';

const PremiumPlans = ({ navigation }) => {
    const [activePlanIndex, setActivePlanIndex] = useState(0);
    const [isModalVisible, setModalVisible] = useState(false);
    const [isAlertVisible, setAlertVisible] = useState(false);

    const handleBackPress = () => {
        navigation.navigate('Account');
    };

    const handleBuySubscription = () => {
        setModalVisible(true);
    };

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const handleBuy = () => {
        setAlertVisible(true);
        setModalVisible(false);
        setTimeout(() =>
            setAlertVisible(false),
            2000);
        setTimeout(() =>
            // navigation.navigate('Account'),
            1000);
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
                'Access to an extended range of trading signals',
                'Ad-free experience for a smoother app.',
                'Priority customer support for quicker issue resolution.',
                'Early access to new features and updates.'
            ]
        },
        {
            title: 'Pro Plan',
            price: '$ 1000',
            features: [
                'Unlimited access to all available trading signals.',
                'Completely ad-free experience.',
                'Dedicated 24/7 premium customer support for immediate assistance.',
                'Priority access to beta testing of new features and trading strategies.'
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
                style={styles.Pager_view}
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
                    onPress={handleBuySubscription}
                    padding={10}
                    marginVertical={10}
                >
                    Buy Subscription
                </CustomButton>
            </View>
            <Modal
                transparent={true}
                visible={isModalVisible}
                animationType="slide"
                onRequestClose={toggleModal}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalText}>Confirm Your In-App Purchase</Text>
                        <Text style={styles.modalText_price}>Do you want to buy one No More Ads for 9,99 $?</Text>
                        <View style={styles.divider_view}>
                            {/* <CustomDivider /> */}
                        </View>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.modalButton} onPress={toggleModal}>
                                <Text style={styles.buttonText}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.modalButton} onPress={handleBuy}>
                                <Text style={styles.buttonText}>Buy</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
            <Alert successMessage="Subscription paid successfully" visible={isAlertVisible} />
        </View>
    );
};

export default PremiumPlans;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        marginTop: StatusBar.currentHeight || 0,
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
    Pager_view: {
        backgroundColor: 'transparent',
    },
    pagination: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',

    },
    paginationDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#CCCCCC',
        marginHorizontal: 5,
    },
    activeDot: {
        paddingHorizontal: 8,
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
        fontSize: 24,
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
        marginVertical: 14,
        padding: 20,
        backgroundColor: 'transparent',
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        paddingHorizontal: 16,
        paddingVertical: 16,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
        margin: 36,
    },
    modalText: {
        color: 'black',
        fontSize: 19,
        fontWeight: '500',
        // marginBottom: 12,
        textAlign: 'center',
        // marginVertical: 5,
    },
    modalText_price: {
        color: 'black',
        fontSize: 16,
        fontWeight: '400',
        textAlign: 'center',
        marginVertical: 10,
    },
    divider_view: {
        // marginVertical: 10,
        backgroundColor: 'red',
        // justifyContent: 'center',
        // alignItems: 'center',
        height: hp('2%'),
    },
    buttonContainer: {
        display: 'flex',
        backgroundColor: 'transparent',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '70%',
    },
    modalButton: {
        backgroundColor: 'transparent'
    },
    buttonText: {
        color: '#007bff',
        fontSize: 20,
        fontWeight: '600',
        textAlign: 'center',
    },
});
