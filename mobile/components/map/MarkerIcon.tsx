import { View } from "react-native"
import Ionicons from '@expo/vector-icons/Ionicons';

function MarkerIcon() {

  return (
    <View style={{ width:30, height: 36 }}>
      <Ionicons name="pin-outline" size={36} color="black" />
    </View>
  )
}

export default MarkerIcon