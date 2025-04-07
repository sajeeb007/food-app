import React, { useEffect, useState } from "react";
import {View, Text, Image, StyleSheet, FlatList} from "react-native";
import yelp from "../api/yelp";

const RestaurantHomepageMe = ({ route })=>{

    const [results, setResults] = useState(null);

    const id  = route.params.id;
    console.log(id);

    const getRestaurantBio = async(id) =>{
        const response = await yelp.get(`/${id}`);
        setResults(response.data)
        console.log(response.data.photos)
    }

    useEffect(()=>{
        getRestaurantBio(id);
    }, [])


    if (!results){
        console.log("no results yet")
        return null;
    }


    return (
        <View>
            <Text>{results.name}</Text>
            <FlatList 
                showsVerticalScrollIndicator={false}
                data={results.photos}
                keyExtractor={(item)=>{
                    return item;
                }}
                renderItem={({item})=>{
                    return (
                        <Image style={Style.image} source={{uri: item}}/>
                    );
                }}
                
            />
        </View>
    );
};

const Style = StyleSheet.create({
    textStyle:{
        fontSize: 15
    },

    image:{
        height: 100,
        width: 150,
    }
});

export default RestaurantHomepageMe;