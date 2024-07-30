import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, TouchableOpacity, TextInput, Text, StatusBar, Button, ActivityIndicator } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import EmojiPicker from 'rn-emoji-keyboard';
import io from 'socket.io-client';

const SOCKET_URL = 'http://192.168.18.120:4000/';

const Chat = ({ navigation, route }) => {
    // const { brokerId } = route.params;
    const brokerId = 5;
    const adminId = 1;
    const [messages, setMessages] = useState([]);
    const [showEmojiKeyboard, setShowEmojiKeyboard] = useState(false);
    const [inputText, setInputText] = useState('');
    const [isConnected, setIsConnected] = useState(false);
    const [isUser, setIsUser] = useState(true); //true pe user false pe admin
    const socket = React.useRef(null);

    useEffect(() => {
        socket.current = io(SOCKET_URL);

        socket.current.on('connect', () => {
            setIsConnected(true);
            socket.current.emit(isUser ? 'user_connect' : 'admin_connect', brokerId);

            socket.current.on('initial_messages', (initialMessages) => {
                // console.log('Initial Messages:', initialMessages);

                const formattedMessages = initialMessages.map(msg => ({
                    _id: msg.id,
                    text: msg.message,
                    createdAt: new Date(msg.timestamp),
                    user: {
                        _id: msg.sender_type === 'user' ? brokerId : adminId,
                        name: msg.sender_type === 'user' ? 'User' : 'Admin',
                    },
                }));
                setMessages(formattedMessages.reverse());
            });
        });

        socket.current.on('message_from_user', (data) => {
            const incomingMessage = {
                _id: new Date().getTime(),
                text: data.message,
                createdAt: new Date(),
                user: {
                    _id: brokerId,
                    name: 'User',
                },
            };
            setMessages(previousMessages => GiftedChat.append(previousMessages, incomingMessage));
        });

        socket.current.on('message_from_admin', (message) => {
            const incomingMessage = {
                _id: new Date().getTime(),
                text: message,
                createdAt: new Date(),
                user: {
                    _id: adminId,
                    name: 'Admin',
                },
            };
            setMessages(previousMessages => GiftedChat.append(previousMessages, incomingMessage));
        });

        return () => {
            socket.current.disconnect();
        };
    }, [isUser, brokerId]);

    const handleSend = useCallback((messages = []) => {
        const messagesWithId = messages.map(msg => ({
            ...msg,
            _id: new Date().getTime(),
            createdAt: new Date(),
            user: {
                _id: isUser ? brokerId : adminId,
                name: isUser ? 'User' : 'Admin',
            }
        }));
        setMessages(previousMessages => GiftedChat.append(previousMessages, messagesWithId));
        const message = messagesWithId[0].text;

        if (isUser) {
            socket.current.emit('user_message', message);
        } else {
            socket.current.emit('admin_message', { userId: adminId, message });
        }
        setInputText('');
    }, [isUser, brokerId]);

    if (!isConnected) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    const toggleKeyboard = () => {
        setShowEmojiKeyboard(!showEmojiKeyboard);
    };

    const handleEmojiSelected = (emojiObject) => {
        const emoji = emojiObject.emoji;
        setInputText(prevText => prevText + emoji);
    };

    const formatTimestamp = (date) => {
        // Add 5 hours to the date
        const adjustedDate = new Date(date.getTime() + 5 * 60 * 60 * 1000);

        // Get hours and minutes in 24-hour format
        const hours = adjustedDate.getUTCHours();
        const minutes = adjustedDate.getUTCMinutes();
        const formattedHours = hours.toString().padStart(2, '0'); // Ensure hours are two digits
        const formattedMinutes = minutes.toString().padStart(2, '0'); // Ensure minutes are two digits

        // Return formatted time in 24-hour format
        return `${formattedHours}:${formattedMinutes}`;
    };

    const renderMessage = (props) => {
        const { currentMessage } = props;
        const formattedTime = formatTimestamp(new Date(currentMessage.createdAt));
        
        if (props.currentMessage.user._id === adminId) {
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
                        {formattedTime}
                    </Text>
                </View>
            );
        } else {
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
                        {formattedTime}
                    </Text>

                </View>
            );
        }
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
                    multiline={true}
                    onChangeText={setInputText}
                />
            </View>
            <TouchableOpacity style={styles.sendButton} onPress={() => handleSend([{ text: inputText }])}>
                <FAIcon name="send" size={20} color="#FFFFFF" />
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="transparent" translucent barStyle="dark-content" />
            <View style={styles.backicon_view}>
                <TouchableOpacity
                    style={styles.icon_view}
                    onPress={() => navigation.goBack()}>
                    <Icon name="arrow-back-ios" size={22} color="#333333" />
                </TouchableOpacity>
            </View>

            {/* <Button title={`Switch to ${isUser ? 'Admin' : 'User'}`} onPress={toggleUserAdmin} /> */}

            <GiftedChat
                messages={messages}
                onSend={messages => handleSend(messages)}
                renderInputToolbar={renderInputToolbar}
                renderMessage={renderMessage}
                user={{
                    _id: brokerId, // User/Admin ID
                    // name: isUser ? 'User' : 'Admin',
                }}
            />


            {/* <GiftedChat
                messages={messages}
                onSend={handleSend}
                renderInputToolbar={renderInputToolbar}
                renderMessage={renderMessage}
                user={{
                    _id: 1,
                }}
            /> */}

            {showEmojiKeyboard && (
                <EmojiPicker
                    onEmojiSelected={handleEmojiSelected}
                    open={showEmojiKeyboard}
                    onClose={() => setShowEmojiKeyboard(false)}
                    categoryPosition="top"
                    allowMultipleSelections
                />
            )}
        </View>
    );
};

export default Chat;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 24,
        paddingBottom: 10,
    },
    backicon_view: {
        backgroundColor: 'transparent',
        marginTop: hp('2%'),
        // marginHorizontal: 10,
        marginVertical: 10,
    },
    icon_view: {
        alignSelf: 'flex-start',
        backgroundColor: 'transparent',
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
