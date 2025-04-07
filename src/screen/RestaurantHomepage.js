import React from "react";
import { View, Text, StyleSheet, Image, ScrollView, SafeAreaView, StatusBar } from "react-native";
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';

const RestaurantHomepage = ({ route }) => {
    // Add error handling for missing route params
    if (!route.params || !route.params.sendResults) {
        return (
            <SafeAreaView style={styles.errorContainer}>
                <MaterialIcons name="error-outline" size={50} color="#ff6b6b" />
                <Text style={styles.errorText}>Restaurant information not available</Text>
            </SafeAreaView>
        );
    }

    // Extract the restaurant from the results
    const restaurant = route.params.sendResults;

    const {
        name,
        image_url,
        location,
        display_phone,
        rating,
        price,
        review_count,
        business_hours,
        is_closed,
    } = restaurant;

    // Function to render rating stars
    const renderRatingStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 >= 0.5;
        
        for (let i = 0; i < 5; i++) {
            if (i < fullStars) {
                stars.push(<FontAwesome key={i} name="star" size={16} color="#FFD700" />);
            } else if (i === fullStars && halfStar) {
                stars.push(<FontAwesome key={i} name="star-half-o" size={16} color="#FFD700" />);
            } else {
                stars.push(<FontAwesome key={i} name="star-o" size={16} color="#FFD700" />);
            }
        }
        
        return <View style={styles.ratingContainer}>{stars}</View>;
    };

    const renderBusinessHours = () => {
        if (!business_hours || !business_hours.open) {
            return <Text style={styles.infoText}>Business hours not available.</Text>;
        }

        return business_hours.open.map((hour, index) => {
            const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            // Format hours from military time to standard time
            const formatTime = (time) => {
                const hours = time.substring(0, 2);
                const minutes = time.substring(2);
                let period = "AM";
                let hour = parseInt(hours, 10);
                
                if (hour >= 12) {
                    period = "PM";
                    if (hour > 12) hour -= 12;
                }
                if (hour === 0) hour = 12;
                
                return `${hour}:${minutes} ${period}`;
            };
            
            return (
                <View key={index} style={styles.hourRow}>
                    <Text style={styles.dayText}>{days[hour.day]}</Text>
                    <Text style={styles.timeText}>{formatTime(hour.start)} - {formatTime(hour.end)}</Text>
                </View>
            );
        });
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" />
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                {/* Restaurant Image */}
                <Image source={{ uri: image_url }} style={styles.image} />
                
                {/* Status Badge */}
                <View style={[styles.statusBadge, is_closed ? styles.closedBadge : styles.openBadge]}>
                    <Text style={styles.statusText}>{is_closed ? "CLOSED" : "OPEN NOW"}</Text>
                </View>

                {/* Restaurant Info Section */}
                <View style={styles.infoSection}>
                    {/* Restaurant Name */}
                    <Text style={styles.name}>{name}</Text>
                    
                    {/* Rating Section */}
                    <View style={styles.ratingRow}>
                        {renderRatingStars(rating)}
                        <Text style={styles.reviewCount}>({review_count} reviews)</Text>
                        {price && <Text style={styles.price}>{price}</Text>}
                    </View>

                    {/* Contact Info Section */}
                    <View style={styles.contactSection}>
                        <View style={styles.infoRow}>
                            <MaterialIcons name="location-on" size={20} color="#555" />
                            <Text style={styles.infoText}>
                                {location.display_address.join(", ")}
                            </Text>
                        </View>

                        <View style={styles.infoRow}>
                            <MaterialIcons name="phone" size={20} color="#555" />
                            <Text style={styles.infoText}>{display_phone || "Not available"}</Text>
                        </View>
                    </View>

                    {/* Business Hours Section */}
                    <View style={styles.hoursSection}>
                        <Text style={styles.sectionTitle}>Business Hours</Text>
                        <View style={styles.hoursContainer}>
                            {renderBusinessHours()}
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#fff",
    },
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    image: {
        width: "100%",
        height: 250,
        resizeMode: "cover",
    },
    statusBadge: {
        position: "absolute",
        top: 20,
        right: 20,
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 20,
    },
    openBadge: {
        backgroundColor: "#4CAF50",
    },
    closedBadge: {
        backgroundColor: "#ff6b6b",
    },
    statusText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 12,
    },
    infoSection: {
        padding: 16,
    },
    name: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 8,
    },
    ratingRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 16,
    },
    ratingContainer: {
        flexDirection: "row",
        marginRight: 8,
    },
    reviewCount: {
        fontSize: 14,
        color: "#666",
        marginRight: 12,
    },
    price: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#2E8B57",
    },
    contactSection: {
        marginBottom: 20,
        backgroundColor: "#f9f9f9",
        padding: 16,
        borderRadius: 12,
    },
    infoRow: {
        flexDirection: "row",
        alignItems: "flex-start",
        marginBottom: 12,
    },
    infoText: {
        fontSize: 16,
        color: "#333",
        marginLeft: 10,
        flex: 1,
        lineHeight: 22,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 12,
        color: "#333",
    },
    hoursSection: {
        backgroundColor: "#f9f9f9",
        padding: 16,
        borderRadius: 12,
    },
    hoursContainer: {
        backgroundColor: "#fff",
        borderRadius: 8,
        padding: 10,
    },
    hourRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: "#f0f0f0",
    },
    dayText: {
        fontSize: 16,
        fontWeight: "500",
        color: "#333",
    },
    timeText: {
        fontSize: 16,
        color: "#555",
    },
    errorText: {
        fontSize: 18,
        color: "#ff6b6b",
        textAlign: "center",
        marginTop: 12,
    },
});

export default RestaurantHomepage;