import { StyleSheet, Text, View } from 'react-native'
import React from 'react';
import Background from '../components/Background';
import Header from '../components/Header';
import CustomButton from '../components/CustomButton';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


const CreateProfile = ({ navigation, headerText }) => {
    return (
        <Background>
            <View style={styles.container}>
                <Header
                    headerText={"Create Profile"}
                />
                <View>

                </View>
                <View>
                    <CustomButton
                        width={wp('36%')}
                        height={hp('4%')}
                        bgColor="#E3B12F"
                        borderRadius={100}
                        alignItems='center'
                        txtColor="#FFFFFF"
                        textStyle={{ fontSize: 15, fontWeight: '500', lineHeight: 18 }}
                        onPress={() => console.log('code sent')}
                        // padding={10}
                        marginVertical={10}
                    >
                        Add Image
                    </CustomButton>
                </View>
            </View>
        </Background>
    )
}

export default CreateProfile

const styles = StyleSheet.create({})