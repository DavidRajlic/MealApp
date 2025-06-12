import { type StyleProp, type ViewStyle, StyleSheet, View } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import Avatar from "./Avatar";
import Text from "./Text";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SERVER_URL } from "../../util/constants";
import { Resturant } from "../../util/types";

export type GpsLocation = {
    latitude: number;
    longitude: number;
};


type SearchListCardProps = {
    style?: StyleProp<ViewStyle>;
    restaurant: Resturant;
};

function SearchListCard({ style, restaurant }: SearchListCardProps) {
    const { colors } = useTheme();

    const isOpen = restaurant.additional_payment > 0;
    const statusColor = isOpen ? "green" : "red";
    const statusText = isOpen ? "Odprto" : "Zaprto";

    const priceText = `${restaurant.price} €`;

    const distanceText = "N/A";

    return (
        <View style={[styles.cardContainer, { backgroundColor: colors.surface }, style]}>
            <Avatar
                containerStyle={{ borderRadius: 18 }}
                url={`${SERVER_URL}/${restaurant.image}`}
            />
            <View style={styles.textContainer}>
                <View style={styles.header}>
                    <Text style={styles.restaurantName}>{restaurant.name}</Text>
                    <Text style={{  fontWeight: "bold" }}>
                        ⭐ {restaurant.averageRating.toFixed(1)}
                    </Text>
                </View>
                <View style={styles.infoRow}>
                    <View style={styles.statusContainer}>
                        <View style={[styles.statusCircle, { backgroundColor: statusColor }]} />
                        <Text>{statusText}</Text>
                    </View>
                    <View style={styles.iconRow}>
                        <Ionicons name="walk-outline" size={18} style={styles.icon} color={colors.onBackground} />
                        <Text>{distanceText}</Text>
                    </View>
                    <View style={styles.iconRow}>
                        <Ionicons name="wallet-outline" size={18} style={styles.icon} color={colors.onBackground} />
                        <Text>{priceText}</Text>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    cardContainer: {
        margin: 6,
        borderRadius: 24,
        padding: 6,
        flexDirection: "row",
        width: "auto",
    },
    textContainer: {
        flex: 1,
        paddingLeft: 8,
        paddingRight: 8,
        justifyContent: "center",
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 8,
    },
    restaurantName: {
        fontWeight: "bold",
        fontSize: 18,
        maxWidth:180
    },
    infoRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
    },
    statusContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
    },
    statusCircle: {
        width: 10,
        height: 10,
        borderRadius: 5,
    },
    iconRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
    },
    icon: {
        paddingRight: 2,
    },
});

export default SearchListCard;
