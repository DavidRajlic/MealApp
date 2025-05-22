import { useState } from "react"
import { View, StyleSheet, Pressable, FlatList } from "react-native"
import MapScreen from "../components/map/MapScreen"
import TextInput from "../components/UI/TextInput"
import Ionicons from "@expo/vector-icons/Ionicons"
import { useTheme } from "../context/ThemeContext"
import Text from "../components/UI/Text"
import SearchListCard from "../components/UI/SearchListCard"
import { useResturantsQuery } from "../http/queries"
import { useNavigation } from "@react-navigation/native"

function SearchScreen() {
  const [showMap, setShowMap] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const { colors } = useTheme()
  const navigation = useNavigation()

  const { data: restaurants, ...restaurantQuery } = useResturantsQuery()
  const filteredRestaurants = restaurants?.filter((restaurant) =>
    restaurant.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {showMap ? (
        <MapScreen restaurants={restaurants} />
      ) : (
        <View style={styles.resultsContainer}>
          <Text style={styles.resultsTitle}>Results</Text>
          <FlatList
            data={filteredRestaurants}
            keyExtractor={(item) => item._id}
              renderItem={({ item }) => (
                <Pressable onPress={() => navigation.navigate("RestaurantScreen", { id:item._id })}>
              <SearchListCard
                style={{ marginVertical: 6 }}
                isOpen={true}
                restaurant={item}
                  />
                </Pressable>
            )}
            contentContainerStyle={styles.resultsList}
          />
        </View>
      )}

      <View style={styles.inputWrapper}>
        <View style={styles.row}>
          <View style={styles.inputFlex}>
            <TextInput
              placeholder="Search"
              hasIcon
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
          <Pressable
            style={[styles.filterButton, { backgroundColor: colors.surface }]}
            onPress={() => setShowMap(!showMap)}
          >
            <Ionicons name="filter" size={20} color={colors.onSurface} />
          </Pressable>
        </View>
      </View>
    </View>
  )
}

export default SearchScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputWrapper: {
    position: "absolute",
    top: 40,
    left: 16,
    right: 16,
    zIndex: 100,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  inputFlex: {
    flex: 1,
  },
  filterButton: {
    width: 50,
    height: 50,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
  },
  resultsContainer: {
    flex: 1,
    paddingTop: 100,
    paddingHorizontal: 16,
  },
  resultsTitle: {
    fontSize: 20,
    marginBottom: 12,
  },
  resultsList: {
    gap: 12,
  },
  resultItem: {
    padding: 16,
    borderRadius: 12,
  },
})
