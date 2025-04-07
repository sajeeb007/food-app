import React from "react";
import { View, Text, StyleSheet, Button, TouchableOpacity, Pressable, Image, FlatList } from "react-native";
import ResultItemDetails from "./ResultItemDetails";

const RestaurantListDetails = ({ title, navigation, results })=>{

    if (results.length == 0){
        return null;
    }

    return(
        <View style={Styles.listStyle}>
            <Text style={Styles.titleStyle}>{title}</Text>
            <FlatList 
                showsHorizontalScrollIndicator={false}
                horizontal
                data={results}
                keyExtractor={(results)=>{
                    return results.id
                }}
                renderItem={({item})=>{
                    return (
                        <ResultItemDetails 
                            navigation={navigation} 
                            // name={item.name} 
                            // rating={item.rating} 
                            // reviewCount={item.review_count}
                            // image_url = {item.image_url}
                            // results = {item}
                            sendResults = {item}
                        />
                    );
                    
                }}
            />
        </View>
        
    );
}

const Styles = StyleSheet.create({
    titleStyle:{
        fontSize: 20,
        fontWeight: "bold",
        marginLeft: 5,
        marginBottom: 10,
    },

    listStyle:{
        marginVertical: 5
    },
});

export default RestaurantListDetails;