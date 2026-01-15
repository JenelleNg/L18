import React, { useState, useEffect } from 'react';
import { FlatList, StatusBar, Text, TextInput, View, Image } from 'react-native';

let originalData = [];

const App = () => {
    const [mydata, setMydata] = useState([]);

    useEffect(() => {
        const myurl = 'https://hsrcharacterinfo.onrender.com/characters';
        fetch(myurl)
            .then((response) => response.json())
            .then((myJson) => {
                setMydata(myJson);
                originalData = myJson;
            });
    }, []);

    const FilterData = (text) => {
        if (text != '') {
            let myFilteredData = originalData.filter((item) =>
                item.name.toLowerCase().includes(text.toLowerCase())
            );
            setMydata(myFilteredData);
        } else {
            setMydata(originalData);
        }
    };

    const renderItem = ({ item }) => {
        return (
            <View
                style={{
                    borderWidth: 1,
                    padding: 10,
                    marginVertical: 5,
                    flexDirection: 'row',
                    alignItems: 'center'
                }}
            >
                <View style={{ flex: 1 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 24 }}>{item.name}</Text>
                    <Text>Type: {item.combat_type}</Text>
                    <Text>Path: {item.combat_path}</Text>
                    <Text>Rarity: {item.rarity}★</Text>
                </View>

                <Image
                    source={{ uri: item.character_pic }}
                    style={{ width: 180, height: 220 }}
                    resizeMode="contain"
                />
            </View>
        );
    };

    return (
        <View style={{ padding: 10 }}>
            <StatusBar />
            <Text>Search Character:</Text>

            <TextInput
                style={{ borderWidth: 1, marginBottom: 10, padding: 5 }}
                onChangeText={(text) => {
                    FilterData(text);
                }}
            />

            <FlatList
                data={mydata}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    );
};

export default App;
