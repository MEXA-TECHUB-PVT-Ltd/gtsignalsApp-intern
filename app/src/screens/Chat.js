import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, TouchableOpacity, TextInput, Text, StatusBar, Keyboard } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AppLogo from '../components/AppLogo';

const Chat = ({ navigation }) => {
    const [messages, setMessages] = useState([]);
    const [showEmojiKeyboard, setShowEmojiKeyboard] = useState(false);
    const [inputText, setInputText] = useState('');

    // Define keyword responses
    const keywordResponses = {
        a: "Welcome to GT_Signals app. Hope you would like it.",
        bitcoin: "The current price of Bitcoin is $35,000.",
        ethereum: "Ethereum is trading at $2,500.",
        buy: "Buying opportunities are observed in the current market.",
        sell: "Selling pressures are evident in the market.",
        bullish: "The market sentiment is bullish.",
        bearish: "The market sentiment is bearish.",
        support: "Key support levels are at $30,000.",
        resistance: "Key resistance levels are at $40,000.",
        breakout: "A breakout is anticipated above $35,000.",
        trend: "The current trend is upward.",
        volume: "Trading volume has increased by 20%.",
        indicator: "The RSI indicator shows oversold conditions.",
        strategy: "Consider using a breakout strategy for short-term gains.",
        risk: "Manage your risk carefully during volatile market conditions.",
        news: "Recent news suggests bullish sentiment in the market.",
    };

    useEffect(() => {
        // Initialize with an empty array to start with no messages
        setMessages([]);
    }, []);

    const handleSend = () => {
        if (inputText.trim().length > 0) {
            const newMessage = {
                _id: messages.length + 1,
                text: inputText.trim(),
                createdAt: new Date(),
                user: {
                    _id: 1,
                    name: 'User',
                },
            };
            setMessages(previousMessages =>
                GiftedChat.append(previousMessages, newMessage)
            );
            generateBotResponse(newMessage.text.trim());
            setInputText('');
        }
    };

    const generateBotResponse = useCallback((userMessage) => {
        const userWords = userMessage.toLowerCase().split(/\s+/);
        let responseText = "";

        for (let i = 0; i < userWords.length; i++) {
            const compoundWord = userWords.slice(i).join('');
            if (keywordResponses[compoundWord]) {
                responseText = keywordResponses[compoundWord];
                break;
            }
        }

        if (!responseText) {
            userWords.forEach(word => {
                if (keywordResponses[word]) {
                    responseText = keywordResponses[word];
                    return;
                }
            });
        }

        if (responseText) {
            setTimeout(() => {
                const botResponse = {
                    _id: messages.length + 2,
                    text: responseText,
                    createdAt: new Date(),
                    user: {
                        _id: 2,
                        name: 'Support Bot',
                    },
                };
                setMessages(previousMessages =>
                    GiftedChat.append(previousMessages, botResponse)
                );
            }, 1000);
        }
    }, [keywordResponses, messages]);

      const toggleKeyboard = () => {
        setShowEmojiKeyboard(!showEmojiKeyboard);
    };

    const renderMessage = (props) => {
        if (props.currentMessage.user._id === 2) {
            return (
                <View style={{
                    backgroundColor: '#E3B12F',
                    borderTopLeftRadius: 0,
                    borderRadius: 10,
                    padding: 10,
                    marginBottom: 10,
                    alignSelf: 'flex-start',
                    maxWidth: wp('72%'),
                }}>
                    <Text style={{ color: '#FFFFFF', fontSize: 12, lineHeight: 16, fontWeight: '400' }}>{props.currentMessage.text}</Text>
                    <Text style={{ fontSize: 10, color: '#FFFFFF', marginTop: 5, alignSelf: 'flex-end' }}>
                        {props.currentMessage.createdAt.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true })}
                    </Text>
                </View>
            );
        }

        return (
            <View style={{
                width: 'auto',
                maxWidth: wp('72%'),
                alignSelf: 'flex-end',
                backgroundColor: 'transparent',
                borderTopLeftRadius: 10,
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10,
                borderWidth: 1,
                borderColor: '#e8e8e8',
                padding: 10,
                marginBottom: 10,
            }}>
                <Text style={{ color: '#676767' }}>{props.currentMessage.text}</Text>
                <Text style={{ fontSize: 10, color: '#929292', marginTop: 5, alignSelf: 'flex-end' }}>
                    {props.currentMessage.createdAt.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true })}
                </Text>
            </View>
        );
    };

    const renderMessageText = (props) => {
        return (
            <Text style={{ color: '#676767' }}>{props.currentMessage.text}</Text>
        );
    };

    const renderInputToolbar = props => (
        <View style={styles.textinput_container}>
            <View style={styles.inputToolbar}>
                <TouchableOpacity style={styles.iconButton} onPress={toggleKeyboard}>
                    {showEmojiKeyboard ? (
                        <Icon name="keyboard" size={24} color="#929292" />
                    ) : (
                        <Icon name="insert-emoticon" size={24} color="#929292" />
                    )}
                </TouchableOpacity>
                <TextInput
                    {...props}
                    style={styles.textInput}
                    placeholder="Type a message"
                    placeholderTextColor="#929292"
                    value={inputText}
                    onChangeText={setInputText}
                    keyboardType={showEmojiKeyboard ? 'default' : 'visible-password'} // Use 'visible-password' for emoji keyboard
                />
            </View>
            <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
                <FAIcon name="send" size={20} color="#FFFFFF" />
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="transparent" translucent barStyle="dark-content" />
            <View style={styles.backicon_logo_view}>
                <TouchableOpacity
                    style={styles.icon_view}
                    onPress={() => navigation.navigate('Brokers')}>
                    <Icon name="arrow-back-ios" size={22} color="#333333" />
                </TouchableOpacity>
                <View style={styles.logo_view}>
                    <AppLogo />
                </View>
            </View>
            <View style={styles.lets_talk_view}>
                <Text style={styles.lets_talk_text}>Let's Talk!</Text>
            </View>

            <GiftedChat
                messages={messages}
                onSend={newMessages => handleSend(newMessages)}
                renderInputToolbar={renderInputToolbar}
                renderMessage={renderMessage}
                renderMessageText={renderMessageText}
                user={{
                    _id: 1,
                }}
            />
        </View>
    );
};

export default Chat;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
        padding: 24,
        paddingBottom: 10,
    },
    backicon_logo_view: {
        flexDirection: 'row',
        backgroundColor: 'transparent',
        marginVertical: 30,
    },
    icon_view: {
        position: 'absolute',
        zIndex: 1,
        alignSelf: 'flex-start',
        backgroundColor: 'transparent',
    },
    logo_view: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
        // marginLeft: -22,
    },
    lets_talk_view: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    lets_talk_text: {
        fontSize: 25,
        fontWeight: '500',
        lineHeight: 29,
        color: '#333333',
        marginBottom: 10,
    },
    textinput_container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'transparent',
        marginTop: 8,
    },
    inputToolbar: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        borderRadius: 100,
        borderWidth: 1,
        borderColor: '#cccccc',
        marginRight: 10,
        alignItems: 'center',
        // paddingHorizontal: 10,
    },
    iconButton: {
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 8,
    },
    textInput: {
        flex: 1,
        height: hp('5%'),
        fontSize: 14,
        backgroundColor: 'transparent',
        borderRadius: 100,
        color: '#333333',
        paddingHorizontal: 10,
        padding: 0,
    },
    sendButton: {
        width: wp('10%'),
        height: hp('5%'),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E3B12F',
        borderRadius: 100,
    },
});
