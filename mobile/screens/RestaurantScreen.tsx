import { ActivityIndicator, FlatList, Pressable, View, StyleSheet, Alert, Image } from "react-native";
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
import MultilineTextInput from "../components/UI/MultilineTextInput";
import { useUser } from "../context/UserContext";
import { useCreateReviewMutation } from "../http/mutations";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import * as ImagePicker from 'expo-image-picker';
import { useVoteReviewMutation } from "../http/mutations";
import type { ResturantReviews } from "../util/types";

type RestaurantScreenRouteProp = RouteProp<StackNavParamList, "RestaurantScreen">;

type Props = {
    route: RestaurantScreenRouteProp;
};

function RestaurantScreen({ route }: Props) {
    const { colors } = useTheme();
    const userCtx = useUser();
    const [selectedStars, setSelectedStars] = useState(0);
    const [description, setDescription] = useState("");
    const [dishName, setDishName] = useState("");
    const [isPosting, setIsPosting] = useState(false);
    const [selectedReview, setSelectedReview] = useState<ResturantReviews | null>(null);
    const { id } = route.params;
    const navigation = useNavigation<NativeStackNavigationProp<StackNavParamList>>();
    const { data: restaurant, isLoading, isError } = useResturantQuery(id);
    const { data: reviews } = useResturantReviewsQuery(id);
    const createReview = useCreateReviewMutation();
    const voteReview = useVoteReviewMutation();
    const [images, setImages] = useState<{ uri: string; name: string; type: string }[]>([]);
    const [userVote, setUserVote] = useState(0);

    const addReviewSheetRef = useRef<BottomSheet>(null);
    const viewReviewSheetRef = useRef<BottomSheet>(null);
    const snapPoints = useMemo(() => ['45%'], []);

    const openAddReviewSheet = () => addReviewSheetRef.current?.snapToIndex(0);
    const openViewReviewSheet = (review: ResturantReviews) => {
        const currentVote = review.votes.find(v => v.user === userCtx.user?._id);
        setUserVote(currentVote?.value ?? 0);
        setSelectedReview(review);
        viewReviewSheetRef.current?.snapToIndex(0);
    };

    const handleTakePicture = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission Denied', 'Camera access is required to take a photo.');
            return;
        }

        const result = await ImagePicker.launchCameraAsync({ allowsEditing: true, aspect: [4, 3], quality: 0.7 });
        if (!result.canceled && result.assets.length > 0) {
            const asset = result.assets[0];
            const filename = asset.uri.split('/').pop() || 'photo.jpg';
            const match = /\.(\w+)$/.exec(filename);
            const type = match ? `image/${match[1]}` : 'image';
            setImages([{ uri: asset.uri, name: filename, type }]);
        }
    };

    const handleVote = async (vote: 1 | -1) => {
        if (!selectedReview?._id || !userCtx.user) return;

        try {
            const updated = await voteReview.mutateAsync({
                reviewId: selectedReview._id,
                value: vote,
            });
            const userId = userCtx?.user?._id;
            if (!selectedReview?._id || !userId) return;

            const updatedVotes = selectedReview.votes.filter(v => v.user !== userCtx.user._id);
            updatedVotes.push({ user: userCtx.user._id, value: vote, _id: "temp" });

            const up = updatedVotes.filter(v => v.value === 1).length;
            const down = updatedVotes.filter(v => v.value === -1).length;

            setSelectedReview(prev => prev ? {
                ...prev,
                upvotes: up,
                downvotes: down,
                votes: updatedVotes,
            } : null);
            setUserVote(vote);
        } catch (err) {
            Alert.alert("Error", "Failed to vote on review.");
            console.error(err);
        }
    };



    const handleSubmitReview = async () => {
        if (!userCtx.user) return;
        if (!dishName.trim()) return Alert.alert("Validation", "Please enter the dish name.");
        if (selectedStars === 0) return Alert.alert("Validation", "Please select a rating.");

        setIsPosting(true);
        try {
            await createReview.mutateAsync({
                comment: description,
                rating: selectedStars,
                restaurant: id,
                user: userCtx.user._id,
                anonymous: false,
                images,
            });
            setDishName("");
            setDescription("");
            setSelectedStars(0);
            setImages([]);
            addReviewSheetRef.current?.close();
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
                    <Pressable onPress={() => openViewReviewSheet(item)}>
                        <RestaurantListCard key={item._id} review={item} isProfile={false} secondary={undefined} />
                    </Pressable>
                )}
                keyExtractor={item => item._id}
                contentContainerStyle={{ paddingBottom: 140 }}
            />

            {userCtx && (
                <Pressable
                    style={[styles.floatingButton, { backgroundColor: colors.onBackground }]}
                    onPress={openAddReviewSheet}
                >
                    <Ionicons name="star" size={48} color="#a8562c" />
                </Pressable>
            )}

            <BottomSheet
                ref={addReviewSheetRef}
                snapPoints={snapPoints}
                index={-1}
                enablePanDownToClose
                backgroundStyle={{ backgroundColor: colors.bottomSheetBackground }}
            >
                <BottomSheetView style={[styles.contentContainer, { backgroundColor: colors.bottomSheetBackground }]}>
                    <View style={styles.reviewInputContainer}>
                        <Pressable onPress={handleTakePicture} style={[styles.imagePicker, { backgroundColor: colors.surface }]}>
                            {images.length > 0 ? (
                                <Image source={{ uri: images[0].uri }} style={styles.previewImage} />
                            ) : (
                                <Ionicons name="camera-outline" size={64} color={colors.onSurface} />
                            )}
                        </Pressable>

                        <View style={{ flex: 1, padding: 6 }}>
                            <TextInput placeholder="Dish Name" value={dishName} onChangeText={setDishName} />
                            <View style={[styles.starsContainer, { backgroundColor: colors.surface }]}>
                                {[...Array(5)].map((_, i) => (
                                    <Pressable key={i} onPress={() => setSelectedStars(i + 1)}>
                                        <Ionicons
                                            name={i < selectedStars ? "star" : "star-outline"}
                                            size={28}
                                            color="#a8562c"
                                            style={{ marginHorizontal: 2 }}
                                        />
                                    </Pressable>
                                ))}
                            </View>
                        </View>

                        <Pressable
                            style={[styles.imagePicker, { backgroundColor: colors.surface }]}
                            onPress={handleSubmitReview}
                            disabled={isPosting}
                        >
                            {isPosting ? (
                                <ActivityIndicator size="large" color={colors.onSurface} />
                            ) : (
                                <Ionicons name="paper-plane-outline" size={64} color={colors.onSurface} />
                            )}
                        </Pressable>
                    </View>
                    <MultilineTextInput
                        style={{ width: "90%", backgroundColor: colors.surface, color: colors.onBackground }}
                        placeholder="Description..."
                        value={description}
                        onChangeText={setDescription}
                    />
                </BottomSheetView>
            </BottomSheet>


            <BottomSheet
                ref={viewReviewSheetRef}
                snapPoints={snapPoints}
                index={-1}
                enablePanDownToClose
                backgroundStyle={{ backgroundColor: colors.bottomSheetBackground }}
            >
                <BottomSheetView style={[styles.contentContainer, { backgroundColor: colors.bottomSheetBackground }]}>
                    {selectedReview && (
                        <View style={styles.reviewInputContainer}>
                            <Image source={{ uri: `${SERVER_URL}/uploads/${selectedReview.images[0]}` }} style={styles.previewImage} />
                            <View style={{ flex: 1, padding: 6 }}>
                                <Text style={{ color: colors.onBackground, fontWeight: 'bold' }}>{selectedReview.user.name}</Text>
                                <Text style={{ color: colors.onBackground }}>{selectedReview.comment}</Text>
                            </View>
                            <View style={[styles.starsContainer, { backgroundColor: colors.surface, alignItems: 'center' }]}>
                                <Pressable onPress={() => handleVote(1)}>
                                    <Ionicons name={userVote === 1 ? "arrow-up-circle" : "arrow-up-circle-outline"} size={32} color={colors.onSurface} />
                                </Pressable>
                                <Text style={{ color: colors.onBackground, marginHorizontal: 8 }}>
                                    {selectedReview.upvotes - selectedReview.downvotes}
                                </Text>
                                <Pressable onPress={() => handleVote(-1)}>
                                    <Ionicons name={userVote === -1 ? "arrow-down-circle" : "arrow-down-circle-outline"} size={32} color={colors.onSurface} />
                                </Pressable>
                            </View>
                        </View>
                    )}
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
    reviewInputContainer: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        padding: 8,
    },
    imagePicker: {
        borderRadius: 20,
        padding: 8,
    },
    starsContainer: {
        flexDirection: "row",
        justifyContent: "center",
        padding: 8,
        borderRadius: 20,
        marginTop: 8,
    },
    previewImage: {
        width:120,
        height: 120,
        borderRadius: 12,
    },
});

export default RestaurantScreen;