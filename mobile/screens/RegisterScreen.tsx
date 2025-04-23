import Avatar from "../components/UI/Avatar"
import Button from "../components/UI/Button"
import Container from "../components/UI/Container"
import CustomNavbar from "../components/UI/CustomNavbar"
import Text from "../components/UI/Text"
import TextInput from "../components/UI/TextInput"
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MyProfileStackParamList } from '../screens/ProfileStack';
import { View } from "react-native"


type NavigationProp = NativeStackNavigationProp<MyProfileStackParamList, 'Login'>;

function RegisterScreen() {
    const navigation = useNavigation<NavigationProp>();

    return (
        <Container style={{ rowGap: 8, padding: 16, flex: 1, justifyContent: 'center' }}>
            <Text style={{ fontWeight: "bold", fontSize: 24, textAlign: 'center', width: '100%' }}>Sign Up</Text>
            <View style={{ alignItems: 'center' }}>
                <Avatar size={124} url="https://www.iconpacks.net/icons/2/free-plus-icon-3107-thumb.png"/>
            </View>
            <TextInput placeholder="Email" style={{ width: '100%' }} />
            <TextInput placeholder="Name" style={{ width: '100%' }} />
            <TextInput placeholder="Password" secureTextEntry style={{ width: '100%' }} />
            <TextInput placeholder="Confirm Password" secureTextEntry style={{ width: '100%' }} />
            <Button onPress={() => navigation.navigate('Profile')}>Sign Up</Button>
            <Button mode="SECONDARY" onPress={() => navigation.navigate('Login')}>Cancel</Button>
        </Container>
    )
}

export default RegisterScreen