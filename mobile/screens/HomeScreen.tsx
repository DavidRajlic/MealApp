// homeScreen.tsx
import React from 'react'
import { View, Text, ScrollView } from 'react-native'
import RestaurantCard from '../components/UI/RestaurantCard'
import { useResturantsQuery } from '../http/queries'
import { SERVER_URL } from '../util/constants'
import { useTheme } from '../context/ThemeContext'

const Section = ({ title, restaurants }: { title: string; restaurants: any[] }) => {
    const { colors } = useTheme()

    return (
        <View>
            <Text style={{ color: colors.onBackground, fontSize: 20, fontWeight: 'bold', marginLeft: 16, marginBottom: 8 }}>
                {title}
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {restaurants.map((restaurant, index) => (
                    <View
                        key={index}
                        style={{
                            width: 300,
                            height: 300,
                            backgroundColor: colors.surface,
                            margin: 8,
                            borderRadius: 20,
                        }}
                    >
                        <RestaurantCard
                            name={restaurant.name}
                            distance="N/A"
                            rating={restaurant.averageRating}
                            price={restaurant.additional_payment}
                            imageUrl={`${SERVER_URL}/${restaurant.image}`}
                            isBottomSheet={true}
                            id={restaurant._id}
                        />
                    </View>
                ))}
            </ScrollView>
        </View>
    )
}

function shuffleArray<T>(array: T[]): T[] {
    const result = [...array]
    for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
            ;[result[i], result[j]] = [result[j], result[i]]
    }
    return result
}

const HomeScreen = () => {
    const { data: restaurants = [] } = useResturantsQuery()
    const { colors } = useTheme()

    const featured = restaurants
    const nearby = shuffleArray(restaurants)
    const highlyRated = [...restaurants].sort((a, b) => b.averageRating - a.averageRating)

    return (
        <ScrollView
            style={{ backgroundColor: colors.background, padding: 8, paddingTop: 32 }}
            contentContainerStyle={{ paddingBottom: 120 }}
        >
            <Section title="Featured" restaurants={featured} />
            <Section title="Nearby" restaurants={nearby} />
            <Section title="Highly rated" restaurants={highlyRated} />
        </ScrollView>
    )
}

export default HomeScreen
