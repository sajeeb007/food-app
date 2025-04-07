import React from "react";
import { View, Text, StyleSheet, Button, ScrollView } from "react-native";

const RestaurantPage = () => {
  return (
    <ScrollView style={styles.container}>
      <Text>Restaurant Page</Text>
    </ScrollView>
  );
}   

const styles = StyleSheet.create({
    
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default RestaurantPage;