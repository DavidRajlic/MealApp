import { MarkerView } from "@maplibre/maplibre-react-native"
import MyMap from "./Map"
import MarkerIcon from "./MarkerIcon"

function MapScreen() {

  return (
    <MyMap style={{flex: 1}}>
      <MarkerView coordinate={[15.64667, 46.55472]} >
        <MarkerIcon />
      </MarkerView>
    </MyMap>
  )
}

export default MapScreen