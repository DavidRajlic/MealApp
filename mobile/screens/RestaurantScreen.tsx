import { View } from "react-native"
import RestaurantCard from "../components/UI/RestaurantCard"

type RestaurantScreenProps = {
    id: string
}

function RestaurantScreen({ id }: RestaurantScreenProps) {
    return (
        <View style={{ flex: 1, padding: 16 }}>
            <RestaurantCard
                name="Gostilna marta"
                distance="133 KM"
                rating={4.1}
                price="3.9 €"
                imageUrl="https://i.redd.it/g9q10ff0nwq81.jpg"
            />
        </View>
    )
}

export default RestaurantScreen
