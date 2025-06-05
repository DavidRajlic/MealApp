import { Camera, CameraRef, Logger, MapView, RasterLayer, RasterSource, UserLocation } from "@maplibre/maplibre-react-native"
import { ReactNode, useRef, useState } from "react"
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native"
import * as ExpoLocation from 'expo-location';
import Ionicons from '@expo/vector-icons/Ionicons';
import Button from "../UI/Button";
import { useTheme } from "../../context/ThemeContext";

// geocoding api: https://www.gisgraphy.com/documentation/user-guide.php#fulltextservice

type MapProps = {
  style?: StyleProp<ViewStyle>,
  onPress?: (feature: GeoJSON.Feature) => void,
  children?: ReactNode,
  customButtons?: ReactNode,
  showButtons?: boolean,
  disableInteraction?: boolean
}

async function getLocation(): Promise<number[] | undefined> {
  const { status } = await ExpoLocation.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    return;
  }

  const location = await ExpoLocation.getCurrentPositionAsync({
    accuracy: ExpoLocation.Accuracy.Highest,
    mayShowUserSettingsDialog: true
  });

  return [
    location.coords.longitude,
    location.coords.latitude
  ]
}

Logger.setLogCallback(log => {
  const { message } = log;

  // expected warnings - see https://github.com/mapbox/mapbox-gl-native/issues/15341#issuecomment-522889062
  if (
    message.match('Request failed due to a permanent error: Canceled') ||
    message.match('Request failed due to a permanent error: Socket Closed')
  ) {
    return true;
  }
  return false;
});

function MyMap({style, onPress, children, customButtons, showButtons = true, disableInteraction = false}: MapProps) {
  const cameraRef = useRef<CameraRef>(null);
  const {colors, theme} = useTheme()

  async function goToMyLocation() {
    const loc = await getLocation()
    if (!loc)
      return
    console.log("pinging to location: " + JSON.stringify(loc))
    cameraRef.current?.moveTo(loc)
    cameraRef.current?.zoomTo(15)
  }
  
  return (
    <View id="map" style={style} pointerEvents={disableInteraction ? "none" : "auto"}>
      <MapView style={{flex: 1}} attributionEnabled={false} onPress={onPress}>
        <RasterSource
          id="osm"
          tileUrlTemplates={["https://tile.openstreetmap.org/{z}/{x}/{y}.png"]}
          tileSize={256}
          maxZoomLevel={20}
        >
          <RasterLayer id="osmLayerDark" sourceID="osm" style={{
            rasterBrightnessMax: 1,
            rasterSaturation: 10,
            rasterContrast: -2,
            rasterBrightnessMaxTransition: { duration: 300, delay: 0 },
            rasterSaturationTransition: { duration: 300, delay: 0 },
            rasterContrastTransition: { duration: 300, delay: 0 },
            visibility: theme === 'dark' ? 'visible' : 'none'
          }}/>
          <RasterLayer id="osmLayerLight" sourceID="osm" style={{
            rasterBrightnessMaxTransition: { duration: 300, delay: 0 },
            rasterSaturationTransition: { duration: 300, delay: 0 },
            rasterContrastTransition: { duration: 300, delay: 0 },
            visibility: theme !== 'dark' ? 'visible' : 'none',
          }}/>
        </RasterSource>
        <Camera zoomLevel={6} animationDuration={1000} ref={cameraRef} centerCoordinate={[14.505751, 46.056946]} maxZoomLevel={18} />
        <UserLocation showsUserHeadingIndicator={true} />
        {children}
      </MapView>
      { showButtons ? <View style={styles.sideButtonsContainer}>
        <Button mode="SECONDARY" onPress={goToMyLocation}><Ionicons name="locate-outline" size={24} color={colors.onSecondary} /></Button>
        {customButtons}
      </View> : undefined}
    </View>
  )
}

export default MyMap

const styles = StyleSheet.create({
  sideButtonsContainer: {
    position: 'absolute', 
    bottom: 128, 
    right: 16,
    flexDirection: 'column-reverse'
  }
})