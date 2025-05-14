import { useEffect } from "react"
import Avatar from "../components/UI/Avatar"
import Button from "../components/UI/Button"
import Container from "../components/UI/Container"
import CustomNavbar from "../components/UI/CustomNavbar"
import RestaurantListCard from "../components/UI/RestaurantListCard"
import Text from "../components/UI/Text"
import TextInput from "../components/UI/TextInput"
import { useResturantsQuery } from "../http/queries"
import { FlatList, ScrollView } from "react-native"
import { useUser } from "../context/UserContext"

function ComponentsScreen() {
  const {data, error} = useResturantsQuery()

  const userCtx = useUser()

  function onLogin() {
    userCtx.login({email: "florijan@mail.com", password: "123456"})
  }

  function onLogout() {
    userCtx.logout()
  }

  return (
    <Container style={{ rowGap: 8 }}>
      <Text style={{fontWeight: 'bold', fontSize: 24}}>Current user: {userCtx.user ? userCtx.user.name : "NONE"}</Text>
      <Text style={{fontWeight: 'bold'}}>Restavracije</Text>
      <FlatList style={{maxHeight: 100, borderWidth: 2}} data={data} renderItem={({item: data}) => <Text key={data._id}>{data.name}</Text>} />
      <ScrollView>
        <Button onPress={onLogin}>Primary</Button>
        <Button onPress={onLogout} mode="SECONDARY">Secondary</Button>
        <Button mode="WARNING">Warning</Button>
        <Button loading>Loading</Button>
        <Button mode="TRANSPARENT">Transparent</Button>
        <TextInput value="Test value" />
        <TextInput placeholder="Placeholder text" />
        <Avatar />
        <RestaurantListCard></RestaurantListCard>
      </ScrollView>
    </Container>
  )
}

export default ComponentsScreen