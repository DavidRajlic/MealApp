import Avatar from "../components/UI/Avatar"
import Button from "../components/UI/Button"
import Container from "../components/UI/Container"
import Text from "../components/UI/Text"
import TextInput from "../components/UI/TextInput"
import { View } from "react-native"
import { useUser } from "../context/UserContext"
import { useState } from "react"

type RegisterScreenProps = {
    onCancel: () => void
}

function RegisterScreen({ onCancel }: RegisterScreenProps) {
    const userCtx = useUser()

    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState<string | null>(null)

    const onSubmit = async () => {
        setError(null)

        if (!email || !name || !password || !confirmPassword) {
            return setError("Please fill in all fields.")
        }

        if (password !== confirmPassword) {
            return setError("Passwords do not match.")
        }

        try {
            await userCtx.register({ email, name, password })
        } catch (err) {
            setError("Registration failed. Please try again.")
        }
    }

    return (
        <Container style={{ rowGap: 8, padding: 16, flex: 1, justifyContent: 'center' }}>
            <Text style={{ fontWeight: "bold", fontSize: 24, textAlign: 'center', width: '100%' }}>Sign Up</Text>

            <View style={{ alignItems: 'center' }}>
                <Avatar size={124} url="https://www.iconpacks.net/icons/2/free-plus-icon-3107-thumb.png" />
            </View>

            <TextInput
                placeholder="Email"
                style={{ width: '100%' }}
                value={email}
                onChangeText={setEmail}
            />

            <TextInput
                placeholder="Name"
                style={{ width: '100%' }}
                value={name}
                onChangeText={setName}
            />

            <TextInput
                placeholder="Password"
                secureTextEntry
                style={{ width: '100%' }}
                value={password}
                onChangeText={setPassword}
            />

            <TextInput
                placeholder="Confirm Password"
                secureTextEntry
                style={{ width: '100%' }}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
            />

            {error && <Text style={{ color: 'red', textAlign: 'center' }}>{error}</Text>}

            <Button onPress={onSubmit}>Sign Up</Button>
            <Button mode="SECONDARY" onPress={onCancel}>Cancel</Button>
        </Container>
    )
}

export default RegisterScreen
