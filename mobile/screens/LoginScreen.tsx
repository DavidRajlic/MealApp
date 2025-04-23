import Avatar from "../components/UI/Avatar"
import Button from "../components/UI/Button"
import Container from "../components/UI/Container"
import CustomNavbar from "../components/UI/CustomNavbar"
import Text from "../components/UI/Text"
import TextInput from "../components/UI/TextInput"
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MyProfileStackParamList } from '../screens/ProfileStack';


type NavigationProp = NativeStackNavigationProp<MyProfileStackParamList, 'Login'>;

function LoginScreen() {
    const navigation = useNavigation<NavigationProp>();

    return (
        <Container style={{ rowGap: 8, padding: 16, flex: 1, justifyContent: 'center' }}>
            <Text style={{ fontWeight: "bold", fontSize: 24, textAlign: 'center', width: '100%' }}>Sign In</Text>
            <TextInput placeholder="Email" style={{ width: '100%' }} />
            <TextInput placeholder="Password" secureTextEntry style={{ width: '100%' }} />
            <Text style={{ fontSize: 16, textAlign: 'right', paddingTop: 4, paddingBottom: 12 }}>Forgot Password?</Text>
            <Button onPress={() => navigation.navigate('Profile')}>Sign In</Button>
            <Button mode="SECONDARY" onPress={() => navigation.navigate('Register')}>Create an Account</Button>
        </Container>
    )
}

export default LoginScreen