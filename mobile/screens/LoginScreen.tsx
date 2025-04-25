import { useState } from "react"
import Button from "../components/UI/Button"
import Container from "../components/UI/Container"
import Text from "../components/UI/Text"
import TextInput from "../components/UI/TextInput"
import { useUser } from "../context/UserContext"
import { Modal } from "react-native"
import RegisterScreen from "./RegisterScreen"

function LoginScreen() {
    const userCtx = useUser()
    const [showRegister, setShowRegister] = useState(false)

    return (
        <>
            <Modal visible={showRegister} animationType="slide" onRequestClose={() => setShowRegister(false)}>
                <RegisterScreen onCancel={() => setShowRegister(false)}/>
            </Modal>
            <Container style={{ rowGap: 8, padding: 16, flex: 1, justifyContent: 'center' }}>
                <Text style={{ fontWeight: "bold", fontSize: 24, textAlign: 'center', width: '100%' }}>Sign In</Text>
                <TextInput placeholder="Email" style={{ width: '100%' }} />
                <TextInput placeholder="Password" secureTextEntry style={{ width: '100%' }} />
                <Text style={{ fontSize: 16, textAlign: 'right', paddingTop: 4, paddingBottom: 12 }}>Forgot Password?</Text>
                <Button onPress={() => userCtx.login()}>Sign In</Button>
                <Button mode="SECONDARY" onPress={() => setShowRegister(true)}>Create an Account</Button>
            </Container>
        </>
    )
}

export default LoginScreen