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
import { RouteProp, useNavigation } from "@react-navigation/native";
import { StackNavParamList } from "../Navigation";
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";

function getTrustDisplay(trustStatus: number): { label: string; color: string } {
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

type ProfileScreenRouteProp = NativeStackScreenProps<StackNavParamList, "ProfileScreen">;

function ProfileScreen({ route }: ProfileScreenRouteProp) {
    const { colors } = useTheme();
    const userCtx = useUser()
    const navigation = useNavigation<NativeStackNavigationProp<StackNavParamList>>()
    const id = route?.params?.id;
    const { data: user2, ...userQuery } = useUserQuery(id ?? "0")
    const user = id==undefined ? userCtx.user : user2;
    const { data: reviews, ...restaurantQuery } = useUserReviewsQuery(user?._id ?? "0")
    const trustStatus = user?.trusted_status ?? 0
    const { label: trustLabel, color: trustColor } = getTrustDisplay(trustStatus)

    return (
        <LinearGradient
            colors={[colors.primary, colors.background]}
            style={[styles.gradient, { padding: 8 }]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 0.2 }}
        >
            <Container style={styles.container}>
                {id == undefined ? <>
                    <View style={styles.logoutContainer}>
                        <Button mode="TRANSPARENT" onPress={() => userCtx.logout()} style={styles.logoutText}>Logout</Button>
                    </View>
                </> : <></>
                }
                <View style={styles.avatarContainer}>
                    <Avatar size={128} />
                    <Text style={[styles.avatarText, { backgroundColor: colors.onBackground, color: colors.shadow }]}>
                        {user?.name}
                    </Text>
                </View>
                <View style={[styles.statsContainer, { backgroundColor: colors.onBackground }]}>
                    <View style={[styles.statItemLeft, { borderRightColor: colors.onBackground }]}>
                        <Ionicons name="analytics-outline" size={58} color="black" style={styles.statIcon} />
                        <View style={styles.statNumbers}>
                            <Text style={styles.statPositive}>688</Text>
                            <Text style={styles.statDivider}> : </Text>
                            <Text style={styles.statNegative}>76</Text>
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
