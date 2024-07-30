import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, TouchableOpacity, StatusBar, Keyboard } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IIcon from 'react-native-vector-icons/Ionicons';
import SignalCard from '../components/SignalCard';
import { useDispatch, useSelector } from 'react-redux';
import { searchSignalByName, clearSearchSignals } from '../redux/signalSlice';

const SearchSignal = ({ navigation }) => {
    const [searchText, setSearchText] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const dispatch = useDispatch();
    const { searchSignals } = useSelector(state => state.signal);

    // console.log('signals in search', searchSignals);

    useEffect(() => {
        if (searchText.length > 0) {
            dispatch(searchSignalByName(searchText));
        }
    }, [searchText, dispatch]);

    useEffect(() => {
        return () => {
            dispatch(clearSearchSignals());
        };
    }, [dispatch]);

    const handleInputChange = text => {
        setSearchText(text);
        if (text.length > 0) {
            dispatch(searchSignalByName(text));
        }
    };

    const handleScroll = () => {
        Keyboard.dismiss();
    };

    const handleBlur = () => {
        setIsFocused(false);
        Keyboard.dismiss();
    };

    const handleFocus = () => {
        setIsFocused(true);
    };

    const renderItem = ({ item }) => {
        // console.log("Rendering Item:", item); // Add this log
        return (
            <TouchableOpacity onPress={() => navigation.navigate('SignalDetails', { signal: item })}>
                <SignalCard signal={item} />
            </TouchableOpacity>
        );
    };

    // const renderItem = ({ item }) => {
    //     // console.log("Rendering Item:", item); // Add this log
    //     return <SignalCard signal={item} />;
    // };

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={'white'} barStyle={'dark-content'} />
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="arrow-back-ios-new" size={24} color="black" />
                </TouchableOpacity>

                <View style={[styles.searchContainer, isFocused && styles.searchContainerFocused]}>
                    <IIcon name="search" size={20} color={isFocused ? 'black' : 'gray'} style={styles.searchIcon} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder={isFocused ? '' : 'Search here'}
                        placeholderTextColor="gray"
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        onChangeText={handleInputChange}
                        value={searchText}
                    />
                </View>
            </View>
            {searchText.length > 0 && (
                <>
                    <Text style={styles.searchResultsText}>Search Results</Text>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={searchSignals}
                        keyExtractor={(item) => item.title}
                        renderItem={renderItem}
                        onScroll={handleScroll}
                        ListEmptyComponent={
                            <Text style={styles.noResultsText}>No results found</Text>
                        }
                    />
                </>
            )}
        </View>
    );
};

export default SearchSignal;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
        paddingHorizontal: 7,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 10,
        marginLeft: 10,
        flex: 1,
        paddingHorizontal: 10,
    },
    searchContainerFocused: {
        borderColor: '#E3B12F',
    },
    searchIcon: {
        marginRight: 5,
    },
    searchInput: {
        flex: 1,
        height: 40,
        color: 'black',
    },
    searchResultsText: {
        fontSize: 24,
        fontWeight: '500',
        lineHeight: 28,
        color: '#333333',
        marginTop: 20,
        marginBottom: 10,
        paddingHorizontal: 8,
    },
    noResultsText: {
        fontSize: 16,
        color: '#949494',
        marginTop: 20,
        textAlign: 'center',
    },
});
