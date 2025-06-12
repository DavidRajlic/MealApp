import { FlatList, View, StyleSheet, Pressable } from "react-native";
import Avatar from "../components/UI/Avatar";
import Button from "../components/UI/Button";
import Container from "../components/UI/Container";
import CustomNavbar from "../components/UI/CustomNavbar";
import Text from "../components/UI/Text";
import TextInput from "../components/UI/TextInput";
import Ionicons from "@expo/vector-icons/Ionicons";
import RestaurantListCard from "../components/UI/RestaurantListCard";
import { useTheme } from "../context/ThemeContext";
import { LinearGradient } from 'expo-linear-gradient';
import { useUser } from "../context/UserContext";
import { useUserQuery, useUserReviewsQuery } from "../http/queries";
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { StackNavParamList } from "../Navigation";

function getTrustDisplay(trustStatus: number) {
    switch (trustStatus) {
        case -1:
            return { label: "Untrusted", color: "red" };
        case 0:
            return { label: "Normal", color: "blue" };
        case 1:
            return { label: "Trusted", color: "green" };
        case 2:
            return { label: "Admin", color: "navy" };
        default:
            return { label: "Unknown", color: "gray" };
    }
}

function calculateTrustStatus(reviews: any[]) {
    if (reviews.length === 0) return -1;
    const minReviews = 30;
    if (reviews.length < minReviews) return 0;
    const goodReviewsCount = reviews.filter(
        (r) => (r.upvotes ?? 0) >= 2 * (r.downvotes ?? 0)
    ).length;
    const ratio = goodReviewsCount / reviews.length;
    if (ratio >= 0.9) return 1;
    return 0;
}

type ProfileScreenRouteProp = NativeStackScreenProps<StackNavParamList, "ProfileScreen">;

function ProfileScreen({ route }: ProfileScreenRouteProp) {
    const { colors } = useTheme();
    const userCtx = useUser();
    const navigation = useNavigation<NativeStackNavigationProp<StackNavParamList>>();
    const id = route?.params?.id;
    const { data: user2 } = useUserQuery(id ?? "0");
    const user = id === undefined ? userCtx.user : user2;
    const { data: reviews = [] } = useUserReviewsQuery(user?._id ?? "0");
    const trustStatus = user?.trusted_status === 2 ? 2 : calculateTrustStatus(reviews);
    const { label: trustLabel, color: trustColor } = getTrustDisplay(trustStatus);
    const totalUpvotes = reviews.reduce((acc, review) => acc + (review.upvotes ?? 0), 0);
    const totalDownvotes = reviews.reduce((acc, review) => acc + (review.downvotes ?? 0), 0);

    return (
        <LinearGradient
            colors={[colors.primary, colors.background]}
            style={[styles.gradient, { padding: 8 }]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 0.2 }}
        >
            <Container style={styles.container}>
                {id === undefined && (
                    <View style={styles.logoutContainer}>
                        <Button mode="TRANSPARENT" onPress={() => userCtx.logout()} style={styles.logoutText}>Logout</Button>
                    </View>
                )}
                <View style={styles.avatarContainer}>
                    <Avatar size={128} />
                    <Text style={[styles.avatarText, { backgroundColor: colors.surface, color: colors.shadow }]}>
                        {user?.name}
                    </Text>
                </View>
                <View style={[styles.statsContainer, { backgroundColor: colors.surface }]}>
                    <View style={[styles.statItemLeft, { borderRightColor: colors.surface }]}>
                        <Ionicons name="analytics-outline" size={58} color="black" style={styles.statIcon} />
                        <View style={styles.statNumbers}>
                            <Text style={styles.statPositive}>{totalUpvotes}</Text>
                            <Text style={styles.statDivider}> : </Text>
                            <Text style={styles.statNegative}>{totalDownvotes}</Text>
                        </View>
                    </View>
                    <View style={[styles.statItemRight, { borderLeftColor: "black" }]}>
                        <Ionicons name="trophy" size={48} color="black" style={styles.statIcon} />
                        <Text style={[styles.statRole, { color: trustColor }]}>{trustLabel}</Text>
                    </View>
                    {user?.trusted_status === 2 && (
                        <View style={styles.buttonContainer}>
                            <Button>
                                <Ionicons name="shield-half" size={32} color="black" style={styles.buttonIcon} />
                            </Button>
                            <Text style={[styles.notificationBadge, { backgroundColor: colors.onPrimary, borderColor: colors.onBackground }]}>
                                9+
                            </Text>
                        </View>
                    )}
                </View>
                <Text>Recent reviews</Text>
                <FlatList
                    data={reviews}
                    renderItem={({ item }) => (
                        <Pressable onPress={() => navigation.navigate("RestaurantScreen", { id: item.restaurant._id })}>
                            <RestaurantListCard key={item._id} review={item} isProfile={true} secondary={undefined}>
                                <Text>{item.restaurant.name}</Text>
                            </RestaurantListCard>
                        </Pressable>
                    )}
                    keyExtractor={item => item._id}
                    contentContainerStyle={styles.flatListContent}
                />
            </Container>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    gradient: {
        flex: 1,
    },
    container: {
        rowGap: 8,
        flexDirection: "column",
        backgroundColor: "transparent",
    },
    logoutContainer: {
        flexDirection: "row",
        justifyContent: "flex-end",
        marginBottom: 8,
    },
    logoutText: {
        padding: 8,
    },
    avatarContainer: {
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 42,
    },
    avatarText: {
        fontSize: 32,
        borderRadius: 48,
        padding: 8,
        position: "absolute",
        top: "90%",
        paddingLeft: 12,
        paddingRight: 12,
    },
    statsContainer: {
        flexDirection: "row",
        borderRadius: 24,
        margin: 8,
    },
    statItemLeft: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 12,
        paddingBottom: 12,
        borderRightWidth: 1
    },
    statItemRight: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 12,
        paddingBottom: 12,
        borderLeftWidth: 1
    },
    statIcon: {
        paddingRight: 8,
    },
    statNumbers: {
        flexDirection: "row",
    },
    statPositive: {
        color: "green",
        fontSize: 24,
    },
    statDivider: {
        color: "black",
        fontSize: 24,
    },
    statNegative: {
        color: "red",
        fontSize: 24,
    },
    statRole: {
        fontSize: 24,
    },
    buttonContainer: {
        position: "absolute",
        top: "-20%",
        left: "83%",
    },
    buttonIcon: {
        paddingRight: 8,
        paddingBottom: 4,
    },
    notificationBadge: {
        position: "absolute",
        padding: 8,
        borderRadius: 48,
        borderWidth: 1,
        top: "-50%",
        left: "20%",
        zIndex: -1,
    },
    flatListContent: {
        paddingBottom: 100,
    },
});

export default ProfileScreen;
