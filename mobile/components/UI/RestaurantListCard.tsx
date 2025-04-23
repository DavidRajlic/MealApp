import { type ReactNode } from "react";
import { View, type StyleProp, type ViewStyle, StyleSheet } from "react-native";
import { useTheme } from "../../store/ThemeContext";
import { SafeAreaView } from 'react-native-safe-area-context';
import Container from "./Container";
import Text from "./Text";
import Ionicons from "@expo/vector-icons/Ionicons";
import Avatar from "./Avatar";

type RestaurantListCardProps = {
    style?: StyleProp<ViewStyle>;
    children?: ReactNode;
};

function RestaurantListCard({ children, style }: RestaurantListCardProps) {
    const { colors } = useTheme();

    return (
        <View style={{ backgroundColor: colors.surface, margin: 18, borderRadius: 24, padding: 8, flexDirection: "row", justifyContent: "space-evenly", width: "auto" }}>
            <Avatar />
            <View style={{ flex: 1, paddingLeft: 8, paddingRight: 8 }}>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <Text style={{ fontWeight: "bold" }}>Gostilna Ozmec</Text>
                    <View style={{ flexDirection: "row" }}>
                        <Ionicons name="star" size={24} color="gold" style={{ paddingRight: 8, paddingBottom: 4 }} />
                        <Text>4.1</Text>
                    </View>
                </View>
                <View style={[styles.line, { backgroundColor: colors.onBackground }]} />
                <Text style={{ paddingTop: 4, fontStyle: "italic" }}>Pizza Margarita</Text>
                <View style={{ backgroundColor: colors.onSurface, borderRadius: 16, padding: 8, margin: 8 }}>
                    <View>
                        <View style={{ flexDirection: "row" }}>
                            <Ionicons name="star" size={24} color="gold" style={{ paddingRight: 8, paddingBottom: 4 }} />
                            <Ionicons name="star" size={24} color="gold" style={{ paddingRight: 8, paddingBottom: 4 }} />
                            <Ionicons name="star" size={24} color="gold" style={{ paddingRight: 8, paddingBottom: 4 }} />
                            <Ionicons name="star" size={24} color="gold" style={{ paddingRight: 8, paddingBottom: 4 }} />
                            <Ionicons name="star" size={24} color="gray" style={{ paddingRight: 8, paddingBottom: 4 }} />
                            <Text style={{ fontSize: 24, fontWeight: "bold", paddingLeft: 8, color: colors.shadow }}>4</Text>
                        </View>
                        <Text style={{ fontSize: 18, fontWeight: "bold", paddingLeft: 8, color: colors.shadow }}>Super Pica!</Text>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    line: {
        height: 1,
        width: '100%',
    },
});

export default RestaurantListCard;
