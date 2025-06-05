import { ActivityIndicator, FlatList, Pressable, View, StyleSheet, Alert } from "react-native";
import RestaurantCard from "../components/UI/RestaurantCard";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { StackNavParamList } from "../Navigation";
import { useTheme } from "../context/ThemeContext";
import { useResturantQuery, useResturantReviewsQuery } from "../http/queries";
import { SERVER_URL } from "../util/constants";
import Text from "../components/UI/Text";
import RestaurantListCard from "../components/UI/RestaurantListCard";
import Ionicons from '@expo/vector-icons/Ionicons';
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { useCallback, useMemo, useRef, useState } from "react";
import TextInput from "../components/UI/TextInput";
import MultilineInput from "../components/UI/MultilineTextInput";
import MultilineTextInput from "../components/UI/MultilineTextInput";
import { Resturant } from "../util/types";
import { postReview } from "../http/api";
import { useUser } from "../context/UserContext";
import { useCreateReviewMutation } from "../http/mutations";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type RestaurantScreenRouteProp = RouteProp<StackNavParamList, "RestaurantScreen">;

type Props = {
    route: RestaurantScreenRouteProp;
};

function RestaurantScreen({ route }: Props) {
    const { colors } = useTheme();
    const userCtx = useUser()
    const [selectedStars, setSelectedStars] = useState(0);
    const [description, setDescription] = useState("");
    const [dishName, setDishName] = useState("");
    const [isPosting, setIsPosting] = useState(false);
    const { id } = route.params;
    const navigation = useNavigation<NativeStackNavigationProp<StackNavParamList>>();
    const { data: restaurant, isLoading, isError } = useResturantQuery(id);
    const { data: reviews, ...restaurantQuery } = useResturantReviewsQuery(id);
    const bottomSheetRef = useRef<BottomSheet>(null)
    const snapPoints = useMemo(() => ['45%'], [])
      const createReview = useCreateReviewMutation()

    const handleSheetChanges = useCallback((index: number) => {
        console.log('handleSheetChanges', index)
    }, [])

    const openBottomSheet = () => {
        bottomSheetRef.current?.snapToIndex(0)
    }

    const handleSubmitReview = async () => {
        if (!userCtx.user)
            return

        if (!dishName.trim()) {
            Alert.alert("Validation", "Please enter the dish name.");
            return;
        }
        if (selectedStars === 0) {
            Alert.alert("Validation", "Please select a rating.");
            return;
        }
        setIsPosting(true);
        try {
            await createReview.mutateAsync({
                comment: description,
                rating: selectedStars,
                restaurant: id,
                user: userCtx.user._id
              })


            setDishName("");
            setDescription("");
            setSelectedStars(0);

            bottomSheetRef.current?.close();
        } catch (error) {
            Alert.alert("Error", "Failed to post review.");
            console.error(error);
        } finally {
            setIsPosting(false);
        }
    };


    return (
        <View style={{ flex: 1, paddingTop: 42, backgroundColor: colors.background }}>
            {isLoading && <ActivityIndicator size="large" color={colors.primary} />}
            {isError && <Text style={{ color: colors.onBackground }}>Failed to load restaurant data.</Text>}
            {restaurant ? (
                <RestaurantCard
                    name={restaurant.name}
                    distance="N/A"
                    rating={restaurant.averageRating}
                    price={restaurant.additional_payment + "€"}
                    imageUrl={SERVER_URL + "/" + restaurant.image}
                    isBottomSheet={false}
                    id={id}
                />
            ) : !isLoading && !isError ? (
                <Text style={{ color: colors.onBackground }}>Restaurant not found.</Text>
            ) : null}
            <Text style={{ paddingLeft: 12, color: colors.onBackground, marginTop: 8 }}>Recent reviews</Text>
            <FlatList
                data={reviews}
                renderItem={({ item }) => (
                        <RestaurantListCard key={item._id} />
                )}
                keyExtractor={item => item._id}
                contentContainerStyle={{ paddingBottom: 140 }}
            />
            {(userCtx != undefined) ? <>
                <Pressable
                    style={[styles.floatingButton, { backgroundColor: colors.primary }]}
                    onPress={() => {
                        openBottomSheet();
                    }}
                >
                    <Ionicons name="star" size={48} color="#a8562c" />
                </Pressable>
            </> : <></>
            }
            <BottomSheet
                ref={bottomSheetRef}
                snapPoints={snapPoints}
                index={-1}
                onChange={handleSheetChanges}
                enablePanDownToClose={true}
                backgroundStyle={{ backgroundColor: colors.bottomSheetBackground }}
            >
                <BottomSheetView style={[styles.contentContainer, { backgroundColor: colors.bottomSheetBackground }]}>
                    <View style={{ flexDirection: "row", justifyContent: "space-evenly", alignItems: "center", padding: 8 }}>
                        <View style={{ backgroundColor: colors.surface, borderRadius: 20, padding: 8 }}>
                            <Ionicons name="camera-outline" size={64} color={colors.onSurface} />
                        </View>

                        <View style={{ flex: 1, padding: 6 }}>
                            <View>
                                <TextInput placeholder="Dish Name" value={dishName} onChangeText={setDishName}></TextInput>
                            </View>

                            <View style={{ flexDirection: "row", justifyContent: "center", backgroundColor: colors.surface, padding: 8, borderRadius: 20, marginTop: 8 }}>
                                {[...Array(5)].map((_, i) => {
                                    const filled = i < selectedStars;
                                    return (
                                        <Pressable key={i} onPress={() => setSelectedStars(i + 1)} hitSlop={8}>
                                            <Ionicons
                                                name={filled ? "star" : "star-outline"}
                                                size={28}
                                                color="#a8562c"
                                                style={{ marginHorizontal: 2 }}
                                            />
                                        </Pressable>
                                    );
                                })}
                            </View>
                        </View>
                        <Pressable
                            style={{ backgroundColor: colors.surface, borderRadius: 20, padding: 8 }}
                            onPress={handleSubmitReview}
                            disabled={isPosting}
                        >
                            {isPosting ? (
                                <ActivityIndicator size="large" color={colors.onSurface} />
                            ) : (
                                <Ionicons
                                    name="paper-plane-outline"
                                    size={64}
                                    color={colors.onSurface}
                                />
                            )}
                        </Pressable>
                    </View>
                    <MultilineTextInput style={{ width: "90%", backgroundColor: colors.surface, color: colors.onBackground }} placeholder="Description..." value={description}
                        onChangeText={setDescription}></MultilineTextInput>
                </BottomSheetView>
            </BottomSheet>
        </View>

    );
}

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        alignItems: 'center',
    },
    floatingButton: {
        position: "absolute",
        bottom: 30,
        right: 20,
        width: 72,
        height: 72,
        borderRadius: 28,
        justifyContent: "center",
        alignItems: "center",
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
});

export default RestaurantScreen;
