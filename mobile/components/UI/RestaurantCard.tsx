import React from 'react'
import { View, Image, StyleSheet, Pressable } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'
import Text from "../UI/Text"
import { useTheme } from "../../context/ThemeContext"
import { FontAwesome, FontAwesome6 } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

type Props = {
    name: string
    distance: string
    rating: number
    price: string
    imageUrl: string
    isBottomSheet: boolean
    id: string
}

export default function RestaurantCard({ name, distance, rating, price, imageUrl, isBottomSheet,id }: Props) {
    const { colors } = useTheme()
        const navigation = useNavigation()
    const filledStars = Math.floor(rating)
    const emptyStars = 5 - filledStars

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image source={{ uri: imageUrl }} style={styles.image} resizeMode="cover" />
                {isBottomSheet ? (
                    <Pressable
                        onPress={() => navigation.navigate("RestaurantScreen", { id })}
                        style={styles.externalIcon}
                    >
                        <Ionicons name="open-outline" size={48} color="white" />
                    </Pressable>
                ) : (
                    <Ionicons name="pencil-outline" size={48} color="white" style={styles.externalIcon} />
                )}
            </View>

            <View style={styles.infoSection}>
                <View style={styles.titleRow}>
                    <Text style={styles.title}>{name}</Text>
                    <View style={styles.distanceRow}>
                        <Ionicons name="walk-outline" size={24} color={colors.onBackground} />
                        <Text style={[styles.distanceText, { color: colors.onBackground }]}>{distance}</Text>
                    </View>
                </View>

                <View style={styles.ratingRow}>
                    {[...Array(filledStars)].map((_, i) => (
                        <Ionicons key={i} name="star" size={32} color="#a8562c" />
                    ))}
                    {[...Array(emptyStars)].map((_, i) => (
                        <Ionicons key={i + filledStars} name="star-outline" size={32} color="#a8562c" />
                    ))}
                    <Text style={styles.ratingText}>{rating.toFixed(1)}</Text>
                </View>

                <View style={styles.iconsRow}>
                    <FontAwesome6 name="wheat-awn-circle-exclamation" size={32} color={colors.onBackground} />
                    <Ionicons name="leaf-outline" size={32} color={colors.onBackground} />
                    <View style={styles.priceRow}>
                        <Ionicons name="wallet-outline" size={32} color={colors.onBackground} />
                        <Text style={[styles.priceText, { color: colors.onBackground }]}>{price}</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        borderRadius: 12,
        overflow: 'hidden',
    },
    imageContainer: {
        width: '100%',
        height: 120,
        position: 'relative',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    externalIcon: {
        position: 'absolute',
        top: 8,
        right: 8,
        backgroundColor: 'rgba(0,0,0,0.4)',
        padding: 4,
        borderRadius: 8,
    },
    infoSection: {
        padding: 16,
        gap: 8,
    },
    titleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    distanceRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    distanceText: {
        fontSize: 12,
        marginLeft: 4,
    },
    ratingRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    ratingText: {
        marginLeft: 8,
        fontSize: 32,
        fontWeight: '600',
    },
    iconsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    priceRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    priceText: {
        marginLeft: 4,
        fontSize: 14,
        fontWeight: '500',
    },
})
