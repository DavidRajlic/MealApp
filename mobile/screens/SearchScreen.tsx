import { useState } from "react"
import { View, StyleSheet, Pressable, FlatList } from "react-native"
import MapScreen from "../components/map/MapScreen"
import TextInput from "../components/UI/TextInput"
import Ionicons from "@expo/vector-icons/Ionicons"
import { useTheme } from "../context/ThemeContext"
import Text from "../components/UI/Text"
import SearchListCard from "../components/UI/SearchListCard"

function SearchScreen() {
  const [showMap, setShowMap] = useState<boolean>(true)
  const { colors } = useTheme()

  const data = [
    { id: "1", name: "Gostilna Ozmec", isOpen: true },
    { id: "2", name: "Pizzeria Napoli", isOpen: false },
    { id: "3", name: "Cafe Central", isOpen: true },
  ];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {showMap ? (
        <MapScreen />
      ) : (
        <View style={styles.resultsContainer}>
          <Text style={styles.resultsTitle}>Results</Text>
            <FlatList
              data={data}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <SearchListCard style={{ marginVertical: 6 }} isOpen={item.isOpen}/>
              )}
              contentContainerStyle={styles.resultsList}
            />
        </View>
      )}

      <View style={styles.inputWrapper}>
        <View style={styles.row}>
          <View style={styles.inputFlex}>
            <TextInput placeholder="Search" hasIcon />
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
