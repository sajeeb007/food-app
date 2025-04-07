import React, {useState, useEffect} from "react";
import { View, Text, StyleSheet, Button, ScrollView } from "react-native";
import RestaurantDetails from "../components/ResultItemDetails";
import SearchBoxDetails from "../components/SearchBoxDetails";
import RestaurantListDetails from "../components/RestaurantListDetails";

import useResults from "../hooks/useResults";





const SearchScreen = (props) => {

    const [searchText, setSearchText] = useState("");
    const [HandleSearchRequest, results, error] = useResults();
    

    const filterResultsByPrice = (price)=>{
        //price = "$" || "$$" || "$$$"
        return results.filter((results)=>{
            return results.price === price;
        });

    };

    

    return (
        <>
            <SearchBoxDetails 
                onSearchTextChange = {(searchText)=>{ //when invoked, it sets the state of the searchText, this is passed as a prop to the SearchBoxDetails component
                    setSearchText(searchText);
                }}
                value = {searchText}
                onTextSubmit = {(finalText)=>{HandleSearchRequest(finalText.nativeEvent.text)}} //when the user presses enter, it invokes the function to handle the search request

            />

            
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                {error ? <Text>Something went Wrong!</Text> : <Text style= {styles.TextStyle}>We have found: {results.length} results</Text>}

                {console.log(searchText)}
                 
                
                {
                    //if there are errors, we show something went wrong
                    //if no errors aand everything goes fine
                    //we show the results
                }

                <View>
                    <RestaurantListDetails title = "Affordable" results={filterResultsByPrice("$")} navigation={props.navigation}/>
                    <RestaurantListDetails title = "A bit pricey" results={filterResultsByPrice("$$")} navigation={props.navigation}/>
                    <RestaurantListDetails title = "Posh" results={filterResultsByPrice("$$$")} navigation={props.navigation}/>
                </View>  
            </ScrollView>
        </>
        
  );
};

const styles = StyleSheet.create({
    TextStyle:{
        fontSize: 20,
        fontWeight: "bold",
        marginLeft: 5,
    },

    RestaurantAppearance:{
        marginTop: 15,

    },
    container:{
        flex: 1
    }
});

export default SearchScreen;