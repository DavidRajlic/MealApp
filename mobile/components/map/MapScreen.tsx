import { MarkerView } from "@maplibre/maplibre-react-native"
import MyMap from "./Map"
import MarkerIcon from "./MarkerIcon"
import { View, Text, StyleSheet, Pressable } from "react-native"
import { useCallback, useRef, useMemo, useState } from "react"
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet"
import { useTheme } from "../../context/ThemeContext"
import RestaurantCard from "../UI/RestaurantCard"
import { Resturant } from "../../util/types"
import { SERVER_URL } from "../../util/constants"

type MapScreenProps = {
  restaurants: Resturant[] | undefined;
};

function MapScreen({ restaurants }: MapScreenProps) {
  const [selectedRestaurant, setSelectedRestaurant] = useState<Resturant | null>(null)
  const bottomSheetRef = useRef<BottomSheet>(null)
  const { colors } = useTheme()
  const snapPoints = ['55%']

  const openBottomSheet = (restaurant: Resturant) => {
    setSelectedRestaurant(restaurant)
    bottomSheetRef.current?.snapToIndex(0)
  }

  const MapMemo = useMemo(() => (<MyMap key={"map"} style={{ flex: 1 }}>
        {restaurants?.map((restaurant) => (
          <MarkerView
            allowOverlap
            key={restaurant._id}
            coordinate={[restaurant.location.longitude, restaurant.location.latitude]}
          >
            <MarkerIcon onPress={() => openBottomSheet(restaurant)} />
          </MarkerView>
        ))}
      </MyMap>)
    , [restaurants])

  return (
    <View style={{ flex: 1 }}>
      {MapMemo}
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        index={-1}
        enablePanDownToClose={true}
        backgroundStyle={{ backgroundColor: colors.bottomSheetBackground }}
      >
        <BottomSheetView style={[styles.contentContainer, { backgroundColor: colors.bottomSheetBackground }]}>
          {selectedRestaurant && (
            <RestaurantCard
              name={selectedRestaurant.name}
              distance="N/A"
              rating={selectedRestaurant.averageRating}
              price={`${selectedRestaurant.price} €`}
              imageUrl={SERVER_URL+"/"+selectedRestaurant.image}
              isBottomSheet={true}
              id={selectedRestaurant._id}
            />
          )}
        </BottomSheetView>
      </BottomSheet>
    </View>
  )
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
})

export default MapScreen
