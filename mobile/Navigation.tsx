import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ComponentsScreen from "./screens/ComponentsScreen";
import CustomNavbar from "./components/UI/CustomNavbar";

export type BottomTabParamList = {
  Home: undefined,
  Map: undefined,
  MyProfile: undefined
}

const Tab = createBottomTabNavigator<BottomTabParamList>()

function BottomTabNavigation() {

  return (
    <Tab.Navigator screenOptions={{
      headerShown: false
    }} tabBar={props => <CustomNavbar {...props} />}>
      <Tab.Screen name="Home" component={ComponentsScreen} />
      <Tab.Screen name="Map" component={ComponentsScreen} />
      <Tab.Screen name="MyProfile" component={ComponentsScreen} />
    </Tab.Navigator>
  )
}

export type StackNavParamList = {
  MainStackNavigation: undefined,

}

const Stack = createNativeStackNavigator<StackNavParamList>()

function AppNavigation() {

  return (
    <Stack.Navigator screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name="MainStackNavigation" component={BottomTabNavigation} />
    </Stack.Navigator>
  )
}

export default AppNavigation