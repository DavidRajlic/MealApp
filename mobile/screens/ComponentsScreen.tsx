import Avatar from "../components/UI/Avatar"
import Button from "../components/UI/Button"
import Container from "../components/UI/Container"
import Text from "../components/UI/Text"
import TextInputRN from "../components/UI/TextInput"

function ComponentsScreen() {
  return (
    <Container style={{rowGap: 8}}>
      <Text>Text component example</Text>
      <Button>Primary</Button>
      <Button>Secondary</Button>
      <Button>Warning</Button>
      <TextInputRN value="Test value" />
      <TextInputRN placeholder="Placeholder text" />
      <Avatar />
    </Container>
  )
}

export default ComponentsScreen