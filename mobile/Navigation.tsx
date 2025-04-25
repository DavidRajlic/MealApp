import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ComponentsScreen from "./screens/ComponentsScreen";
import CustomNavbar from "./components/UI/CustomNavbar";
import MyProfileWrapper from "./screens/ProfileWrapper";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import MyProfileScreen from "./screens/ProfileStack";

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
      <Tab.Screen name="MyProfile" component={MyProfileScreen} />
    </Tab.Navigator>
  )
}

export type StackNavParamList = {
  MainStackNavigation: undefined
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