import { type ReactNode } from "react";
import { View, type StyleProp, type ViewStyle, StyleSheet } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import Avatar from "./Avatar";
import Text from "./Text";
import Ionicons from "@expo/vector-icons/Ionicons";

type RestaurantListCardProps = {
    style?: StyleProp<ViewStyle>;
    children?: ReactNode;
};

function RestaurantListCard({ children, style }: RestaurantListCardProps) {
    const { colors } = useTheme();

    return (
        <View style={[styles.cardContainer, { backgroundColor: colors.surface }]}>
            <Avatar containerStyle={{borderRadius: 18 }} size={128} />
            <View style={styles.textContainer}>
                <View style={styles.header}>
                    <Text style={styles.restaurantName}>Gostilna Ozmec</Text>
                    <View style={[styles.ratingContainer, { backgroundColor: colors.onSurface }]}>
                        <Ionicons name="star" size={16} color="#B0803D" style={styles.starIcon} />
                        <Text style={[styles.ratingText, { color: colors.shadow }]}>4.1</Text>
                    </View>
                </View>
                <View style={[styles.line, { backgroundColor: colors.onBackground }]} />
                <Text style={styles.dishName}>Pizza Margarita</Text>
                <View style={[styles.reviewContainer, { backgroundColor: colors.onSurface }]}>
                    <View>
                        <View style={styles.stars}>
                            <Ionicons name="star" size={18} color="#B0803D" style={styles.starIcon} />
                            <Ionicons name="star" size={18} color="#B0803D" style={styles.starIcon} />
                            <Ionicons name="star" size={18} color="#B0803D" style={styles.starIcon} />
                            <Ionicons name="star" size={18} color="#B0803D" style={styles.starIcon} />
                            <Ionicons name="star" size={18} color={colors.surface} style={styles.starIcon} />
                            <Text style={[styles.reviewCount, { color: colors.shadow }]}>4</Text>
                        </View>
                        <Text style={[styles.reviewText, { color: colors.shadow }]}>Super Pica!</Text>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    cardContainer: {
        margin: 12,
        borderRadius: 24,
        padding: 6,
        flexDirection: "row",
        justifyContent: "space-evenly",
        width: "auto",
    },
    textContainer: {
        flex: 1,
        paddingLeft: 8,
        paddingRight: 8,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    restaurantName: {
        fontWeight: "bold",
    },
    ratingContainer: {
        flexDirection: "row",
        borderTopLeftRadius: 8,
        borderTopEndRadius: 8,
    },
    starIcon: {
        paddingRight: 4,
        paddingBottom: 4,
    },
    ratingText: {
        paddingRight: 2,
    },
    line: {
        height: 1,
        width: "100%",
    },
    dishName: {
        paddingTop: 4,
        fontStyle: "italic",
    },
    reviewContainer: {
        borderRadius: 16,
        padding: 8,
        margin: 2,
        marginTop: 12,
    },
    stars: {
        flexDirection: "row",
        alignItems: 'center'
    },
    reviewCount: {
        fontSize: 18,
        fontWeight: "bold",
        paddingLeft: 4,
    },
    reviewText: {
        fontSize: 18,
        fontWeight: "bold",
        paddingLeft: 8,
    },
});

export default RestaurantListCard;
