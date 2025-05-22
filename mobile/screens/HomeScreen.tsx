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
            <ScrollView horizontal showsHorizontalScrollIndicator={false} >
                {restaurants.map((restaurant, index) => (
                    <View
                        key={index}
                        style={{
                            width: 300,
                            height:300,
                            backgroundColor: colors.surface,
                            margin: 8,
                            borderRadius:20,
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

const HomeScreen = () => {
    const { data: restaurants = [], ...restaurantQuery } = useResturantsQuery()
    const { colors } = useTheme()

    return (
        <ScrollView style={{ backgroundColor: colors.background, padding: 8, paddingTop: 32 }} contentContainerStyle={{ paddingBottom: 120 }}>
            <Section title="Featured" restaurants={restaurants} />
            <Section title="Nearby" restaurants={restaurants}/>
            <Section title="Highly rated" restaurants={restaurants} />
        </ScrollView>
    )
}

export default HomeScreen
