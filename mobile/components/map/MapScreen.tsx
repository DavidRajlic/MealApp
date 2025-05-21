import { MarkerView } from "@maplibre/maplibre-react-native"
import MyMap from "./Map"
import MarkerIcon from "./MarkerIcon"
import { View, Text, StyleSheet, Pressable } from "react-native"
import { useCallback, useRef, useMemo } from "react"
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet"
import { useTheme } from "../../context/ThemeContext"
import RestaurantCard from "../UI/RestaurantCard"

function MapScreen() {
  const bottomSheetRef = useRef<BottomSheet>(null)
  const { colors } = useTheme()
  const snapPoints = useMemo(() => ['55%'], [])

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index)
  }, [])

  const openBottomSheet = () => {
    console.log("hey")
    bottomSheetRef.current?.snapToIndex(0)
  }

  return (
    <View style={{ flex: 1 }}>
      <MyMap style={{ flex: 1 }}>
        <MarkerView coordinate={[15.64667, 46.55472]}>
            <MarkerIcon onPress={openBottomSheet}/>
        </MarkerView>
      </MyMap>
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        index={-1}
        onChange={handleSheetChanges}
        enablePanDownToClose={true}
        backgroundStyle={{ backgroundColor: colors.background }}
      >
        <BottomSheetView style={[styles.contentContainer, { backgroundColor: colors.background }]}>
          <RestaurantCard
            name="Gostilna marta"
            distance="133 KM"
            rating={4.1}
            price="3.9 €"
            imageUrl="https://i.redd.it/g9q10ff0nwq81.jpg"
          />
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
