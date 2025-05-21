import { type ReactNode } from "react";
import { View, type StyleProp, type ViewStyle, StyleSheet } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import Avatar from "./Avatar";
import Text from "./Text";
import Ionicons from "@expo/vector-icons/Ionicons";

type SearchListCardProps = {
    style?: StyleProp<ViewStyle>;
    isOpen: boolean;
};

function SearchListCard({ style, isOpen }: SearchListCardProps) {
    const { colors } = useTheme();

    const statusColor = isOpen ? "green" : "red";
    const statusText = isOpen ? "Odprto" : "Zaprto";

    return (
        <View style={[styles.cardContainer, { backgroundColor: colors.surface }, style]}>
            <Avatar containerStyle={{ borderRadius: 18 }} size={64} />
            <View style={styles.textContainer}>
                <View style={styles.header}>
                    <Text style={styles.restaurantName}>Gostilna Ozmec</Text>
                </View>
                <View style={styles.infoRow}>
                    <View style={styles.statusContainer}>
                        <View style={[styles.statusCircle, { backgroundColor: statusColor }]} />
                        <Text>{statusText}</Text>
                    </View>
                    <View style={styles.iconRow}>
                        <Ionicons name="walk-outline" size={18} style={styles.icon} color={colors.onBackground} />
                        <Text>100m</Text>
                    </View>
                    <View style={styles.iconRow}>
                        <Ionicons name="wallet-outline" size={18} style={styles.icon} color={colors.onBackground} />
                        <Text>3.9 €</Text>
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
