import { useState } from "react";
import Container from "../components/UI/Container";
import MapScreen from "../components/map/MapScreen";

function SearchScreen() {
  const [showMap, setShowMap] = useState<boolean>(true)
  return (
    showMap ? <MapScreen /> : <></>
  )
}

export default SearchScreen