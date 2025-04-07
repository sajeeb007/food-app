import './gesture-handler';

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from "@react-navigation/native";

import SearchScreen from './src/screen/SearchScreen';
import RestaurantHomePage from './src/screen/RestaurantHomepage';
import RestaurantHomepageMe from './src/screen/RestaurantHomepageMe';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Search"
        screenOptions={{
          headerTitle: "Restaurant Search"
        }}
      >
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="RestaurantHomePage" component={RestaurantHomePage} />
        <Stack.Screen name="RestaurantHomepageMe" component={RestaurantHomepageMe} />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});