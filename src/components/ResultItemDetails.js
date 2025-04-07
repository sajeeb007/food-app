import React from "react";
import { View, Text, StyleSheet, Button, TouchableOpacity, Pressable, Image, FlatList } from "react-native";

const ResultItemDetails = ({ navigation, sendResults })=>{
    const {name, rating, review_count, image_url} = sendResults;

    return(
            <View style={styles.parentView}>
                <Pressable
                    onPress={() => {
                        //navigation.navigate("RestaurantHomePage", {sendResults: sendResults});
                        navigation.navigate("RestaurantHomepageMe", {id: sendResults.id})
                    }}>
                    <View>
                        <Image source={{uri: image_url}} style={styles.imageStyle}/>
                        <Text style={styles.RestaurantName}>{name}</Text>
                        <Text style={styles.ratingStyle}>Rating: {rating} ({review_count})</Text>
                    </View>
                </Pressable>
            </View>
        
    );
}

const styles = StyleSheet.create({
    parentView:{
        height: 185,
        width: 250,
        marginLeft: 5,
        marginRight: 5,
        
    },
    RestaurantName:{
        fontSize: 18,
        marginTop: 5,
        fontWeight: "bold",
    },
    ratingStyle:{
        fontWeight: "bold",
        color: "gray"
    },

    titleStyle:{
        fontSize: 20,
        fontWeight: "bold",
        marginLeft: 5,
        marginBottom: 2,
    },

    imageStyle:{
        width: 250, 
        height: 125, 
        borderRadius: 10,
        marginBottom: 2
    }
});

export default ResultItemDetails;