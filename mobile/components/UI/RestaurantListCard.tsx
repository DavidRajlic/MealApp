import { type ReactNode } from "react";
import { View, type StyleProp, type ViewStyle, StyleSheet, Pressable } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import Avatar from "./Avatar";
import Text from "./Text";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ResturantReviews, UserReviews } from "../../util/types";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackNavParamList } from "../../Navigation";

type RestaurantListCardProps = {
    style?: StyleProp<ViewStyle>;
    review: UserReviews | undefined;
    secondary: ResturantReviews | undefined;
    children?: ReactNode;
    isProfile: boolean;
};

function RestaurantListCard({ children, style, review, secondary, isProfile }: RestaurantListCardProps) {
    const { colors } = useTheme();
    const navigation = useNavigation<NativeStackNavigationProp<StackNavParamList>>()
    const review2 = review == undefined ? secondary : review
    const rating = typeof review2?.rating === 'number' ? review2.rating : 0
    const filledStars = Math.floor(rating)
    const emptyStars = 5 - filledStars


    return (
        <View style={[styles.cardContainer, { backgroundColor: colors.surface }]}>
            <Avatar containerStyle={{ borderRadius: 18 }} size={128} url={"https://upload.wikimedia.org/wikipedia/commons/9/91/Pizza-3007395.jpg"} />
            <View style={styles.textContainer}>
                <View style={styles.header}>
                    {isProfile ? (
                        <>
                            <Text style={styles.restaurantName}>{review?.restaurant.name}</Text>
                            <View style={[styles.ratingContainer, { backgroundColor: colors.surface }]}>
                                <Ionicons name="star" size={16} color="#a8562c" style={styles.starIcon} />
                                <Text style={[styles.ratingText]}>{review?.restaurant.averageRating}</Text>
                            </View>
                        </>
                    ) : (
                        <>
                                <Pressable onPress={() => navigation.navigate("ProfileScreen", { id: secondary?.user._id! })}>
                                    <View style={{ flexDirection: "row", justifyContent: "center", alignItems:"center"}}>
                                <Avatar containerStyle={{ borderRadius: 18 }} size={40} url={"https://upload.wikimedia.org/wikipedia/commons/9/91/Pizza-3007395.jpg"} />

                            <Text style={[styles.restaurantName, { marginLeft: 8 }]}>
                                {secondary?.user.name}
                                        </Text>
                                    </View>
                                </Pressable>
                            </>
                    )}
                </View>
                <View style={[styles.line, { backgroundColor: colors.onBackground }]} />
                <Text style={styles.dishName}>{review2?.comment}</Text>
                <View style={[styles.reviewContainer, { backgroundColor: colors.surface }]}>
                    <View style={styles.ratingRow}>
                        {[...Array(filledStars)].map((_, i) => (
                            <Ionicons key={i} name="star" size={18} color="#a8562c" />
                        ))}
                        {[...Array(emptyStars)].map((_, i) => (
                            <Ionicons key={i + filledStars} name="star-outline" size={18} color="#a8562c" />
                        ))}
                        <Text style={styles.ratingText}>{review2?.rating}</Text>
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
    ratingRow: {
        flexDirection: 'row',
        alignItems: 'center',
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
        justifyContent: "center",
        alignItems: "center",
        borderTopLeftRadius: 8,
        borderTopEndRadius: 8,
    },
    starIcon: {
        paddingRight: 4,
        paddingBottom: 4,
    },
    ratingText: {
        paddingRight: 2,
        paddingLeft: 4,
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
