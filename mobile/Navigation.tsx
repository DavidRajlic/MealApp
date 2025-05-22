import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ComponentsScreen from "./screens/ComponentsScreen";
import CustomNavbar from "./components/UI/CustomNavbar";
import MyProfileScreen from "./screens/MyProfileScreen";
import SearchScreen from "./screens/SearchScreen";
import RestaurantScreen from "./screens/RestaurantScreen";
import { useUser } from "./context/UserContext";
import Text from "./components/UI/Text";

export type BottomTabParamList = {
  Home: undefined,
  Search: undefined,
  MyProfile: undefined
}

const Tab = createBottomTabNavigator<BottomTabParamList>()

function BottomTabNavigation() {

  return (
    <Tab.Navigator screenOptions={{
      headerShown: false
    }} tabBar={props => <CustomNavbar {...props} />}>
      <Tab.Screen name="Home" component={ComponentsScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="MyProfile" component={MyProfileScreen} />
    </Tab.Navigator>
  )
}

export type StackNavParamList = {
  MainStackNavigation: undefined
}

const Stack = createNativeStackNavigator<StackNavParamList>()

function AppNavigation() {
  const {isLoading} = useUser()

  if (isLoading)
    return <Text style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>Loading user</Text>

  return (
    <Stack.Navigator screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name="MainStackNavigation" component={BottomTabNavigation} />
    </Stack.Navigator>
  )
}

export default AppNavigation