import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, TouchableOpacity, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IIcon from 'react-native-vector-icons/Ionicons';
import SignalCard from '../components/SignalCard';

const SearchSignal = ({ navigation }) => {
    const [searchText, setSearchText] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const dummyData = [
        { title: 'NZD/USD' },
        { title: 'EUR/USD' },
        { title: 'GBP/USD' },
        { title: 'USD/JPY' },
        { title: 'AUD/USD' },
        { title: 'USD/CAD' },
     
    ];

    const filteredData = dummyData.filter(item =>
        item.title.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={'white'} barStyle={'dark-content'} />
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                    <Icon name="arrow-back-ios-new" size={24} color="black" />
                </TouchableOpacity>

                <View style={[styles.searchContainer, isFocused && styles.searchContainerFocused]}>
                    <IIcon name="search" size={20} color={isFocused ? 'black' : 'gray'} style={styles.searchIcon} />
                    <TextInput
                        style={[styles.searchInput]}
                        placeholder={isFocused ? '' : 'Search here'}
                        placeholderTextColor="gray"
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        onChangeText={setSearchText}
                        value={searchText}
                    />
                </View>
            </View>
            {searchText.length > 0 && (
                <>
                    <Text style={styles.searchResultsText}>Search Results</Text>
                    <FlatList
                        data={filteredData}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => <SignalCard style={styles.resultItem}>{item.title}</SignalCard>}
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
    resultItem: {
        marginTop: 14,
        padding: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 10,
        color: 'black',
    },
});
