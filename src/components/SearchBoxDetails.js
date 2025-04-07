import React from "react";
import { View, Text, StyleSheet, Button, ScrollView, TextInput } from "react-native";
import { FontAwesome } from "@expo/vector-icons";


const SearchBoxDetails = ({ value, onSearchTextChange, onTextSubmit }) => {

    return (
        /*
            Box for Search Box
            Has a border radius
            has a border width of 1
            has a background color of #F0EEEE
            has a height of 50
        */
        <View style={Styles.BackgroundStyle}>
            <FontAwesome name="search" size={20} style={Styles.SearchIconStyle}/>

            <View style={Styles.InputViewStyle}>
                <TextInput 
                    style={Styles.TextInputStyle}
                    placeholder="Search for Restaurant"
                    placeholderTextColor="gray"
                    autoCorrect={false}
                    autoCapitalize="none"
                    value = {value}
                    onChangeText={(newValue) => onSearchTextChange(newValue)} //sets the state of the search text on the parent
                    onEndEditing ={(finalText)=> onTextSubmit(finalText)} //when the user presses enter, it invokes the function to handle the search request

                    /*
                        Or we could write it like this:
                        onChangeText = {onSearchTextChange}
                        onEndEditing = {onTextSubmit}

                        on ChangeText or onEndEditing, we call on those functions and the values would be invoked from parent
                    */
                
                
                />
            </View>
        </View>
    );
};

const Styles = StyleSheet.create({
    BackgroundStyle:{
        backgroundColor: "#F0EEEE", //F0EEEE
        height: 50,
        width: 380,
        marginVertical: 10,
        marginLeft: 5,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#000",
        flexDirection: "row",
    },
    InputViewStyle:{    
        marginLeft: 5,
        marginTop: 2,
        flex: 1 //takes the remaining space in the row according to the flexDirection
    },

    TextInputStyle:{
        marginTop: 15
    },
    
    SearchIconStyle:{
        marginLeft: 10,
        alignSelf: "center",
    }
});

export default SearchBoxDetails;