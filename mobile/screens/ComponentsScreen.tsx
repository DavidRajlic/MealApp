import Avatar from "../components/UI/Avatar"
import Button from "../components/UI/Button"
import Container from "../components/UI/Container"
import CustomNavbar from "../components/UI/CustomNavbar"
import Text from "../components/UI/Text"
import TextInput from "../components/UI/TextInput"

function ComponentsScreen() {
  return (
    <Container style={{rowGap: 8}}>
      <Text>Text component example</Text>
      <Button>Primary</Button>
      <Button mode="SECONDARY">Secondary</Button>
      <Button mode="WARNING">Warning</Button>
      <Button loading>Loading</Button>
      <Button mode="TRANSPARENT">Transparent</Button>
      <TextInput value="Test value" />
      <TextInput placeholder="Placeholder text" />
      <Avatar />
      <CustomNavbar />
    </Container>
  )
}

export default ComponentsScreen