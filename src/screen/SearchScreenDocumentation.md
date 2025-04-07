# Documentation for `SearchScreen.js` and `useResults.js`

## Overview
This documentation explains the functionality of the `SearchScreen.js` and `useResults.js` files in the `food-app` project. These files work together to implement a search feature that allows users to search for restaurants and display results categorized by price levels.

---

## `SearchScreen.js`

### Purpose
The `SearchScreen.js` file is a React Native component that serves as the main screen for searching restaurants. It provides a search box for user input, displays the number of results found, and organizes the results into three price categories: Affordable, A Bit Pricey, and Posh.

### Key Features
1. **Search Box**: Allows users to input search terms.
2. **API Integration**: Fetches restaurant data from an external API using the `useResults` custom hook.
3. **Error Handling**: Displays an error message if the API call fails.
4. **Categorized Results**: Displays restaurants grouped by price levels.

---

### Code Breakdown

#### Imports
```javascript
import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import RestaurantDetails from "../components/RestaurantDetails";
import SearchBoxDetails from "../components/SearchBoxDetails";
import useResults from "../hooks/useResults";
```
- **React and React Native**: Provides core functionality for building the UI.
- **Custom Components**:
  - `RestaurantDetails`: Displays individual restaurant details.
  - `SearchBoxDetails`: Handles the search input box.
- **Custom Hook**: `useResults` manages the API call and state for search results.

#### State Management
```javascript
const [searchText, setSearchText] = useState("");
const [HandleSearchRequest, results, error] = useResults();
```
- `searchText`: Stores the current text entered in the search box.
- `HandleSearchRequest`: Function to fetch search results from the API.
- `results`: Array of restaurants returned by the API.
- `error`: Stores any error message from the API call.

#### JSX Structure
1. **Search Box**
```javascript
<SearchBoxDetails 
    onSearchTextChange={(searchText) => setSearchText(searchText)}
    value={searchText}
    onTextSubmit={(finalText) => HandleSearchRequest(finalText.nativeEvent.text)}
/>
```
- `onSearchTextChange`: Updates `searchText` state as the user types.
- `value`: Binds the `searchText` state to the input field.
- `onTextSubmit`: Triggers the API call when the user submits the search.

2. **Error and Results Count**
```javascript
{error ? <Text>Something went Wrong!</Text> : <Text style={styles.TextStyle}>We have found: {results.length} results</Text>}
```
- Displays an error message if the API call fails.
- Shows the number of results found if the API call succeeds.

3. **Categorized Results**
```javascript
<View style={styles.PriceSectionWiseView}>
    <Text style={styles.TextStyle}>Affordable</Text>
    <ScrollView style={styles.RestaurantAppearance} horizontal={true} showsHorizontalScrollIndicator={false}>
        <RestaurantDetails navigation={props.navigation} />
        {/* Repeat RestaurantDetails for other restaurants */}
    </ScrollView>
    <View style={[{ height: 1, width: "100%", backgroundColor: 'black' }]}></View>
</View>
```
- Displays restaurants in horizontal scrollable sections categorized by price levels.

#### Styles
```javascript
const styles = StyleSheet.create({
    TextStyle: {
        fontSize: 20,
        fontWeight: "bold",
        marginLeft: 5,
    },
    RestaurantAppearance: {
        marginTop: 15,
    },
    PriceSectionWiseView: {
        marginTop: 10,
    },
});
```
- Defines styles for text, scrollable sections, and price categories.

---

## `useResults.js`

### Purpose
The `useResults.js` file is a custom React hook that handles the API call to fetch restaurant data. It manages the state for search results and error messages.

### Key Features
1. **API Call**: Fetches restaurant data from the Yelp API.
2. **State Management**: Manages `results` and `error` states.
3. **Reusable Logic**: Encapsulates API logic for reuse in other components.

---

### Code Breakdown

#### Imports
```javascript
import { useEffect, useState } from "react";
import yelp from "../api/yelp";
```
- **React Hooks**: `useState` and `useEffect` for state and lifecycle management.
- **Yelp API**: Configured Axios instance for making API requests.

#### State Management
```javascript
const [results, setResults] = useState([]);
const [error, setError] = useState("");
```
- `results`: Stores the array of restaurants returned by the API.
- `error`: Stores any error message from the API call.

#### API Call Function
```javascript
const HandleSearchRequest = async (finalSubmittedText) => {
    try {
        setError(""); // Clear previous errors
        const response = await yelp.get("/search", {
            params: {
                term: finalSubmittedText,
                limit: 50,
                location: 'san jose',
            },
        });
        setResults(response.data.businesses); // Update results state
    } catch (err) {
        setError(err); // Update error state
    }
};
```
- Sends a GET request to the Yelp API with search parameters.
- Updates `results` with the data returned from the API.
- Handles errors by updating the `error` state.

#### Initial API Call
```javascript
useEffect(() => {
    HandleSearchRequest('biriani');
}, []);
```
- Automatically fetches results for "biriani" when the component mounts.

#### Return Values
```javascript
return [HandleSearchRequest, results, error];
```
- Exposes the API call function, results, and error state for use in other components.

---

## How They Work Together
1. **Search Input**: The user enters a search term in the `SearchBoxDetails` component.
2. **API Call**: The `HandleSearchRequest` function in `useResults` is triggered, fetching data from the Yelp API.
3. **Results Display**: The `SearchScreen` component displays the results categorized by price levels.
4. **Error Handling**: If the API call fails, an error message is displayed.

---

## Key Concepts for Beginners
1. **React Hooks**:
   - `useState`: Manages component state.
   - `useEffect`: Handles side effects like API calls.
2. **Custom Hooks**: Encapsulate reusable logic (e.g., `useResults`).
3. **Props**: Pass data and functions between components (e.g., `SearchBoxDetails`).
4. **API Integration**: Use Axios to fetch data from external APIs.

---

## Suggested Improvements
1. **Dynamic Categorization**: Categorize restaurants based on their actual price levels from the API.
2. **Loading Indicator**: Show a spinner while the API call is in progress.
3. **Error Details**: Display more specific error messages to the user.

---

This documentation should help beginners understand the purpose, structure, and functionality of the `SearchScreen.js` and `useResults.js` files.