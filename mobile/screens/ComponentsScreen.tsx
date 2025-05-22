import { useEffect } from "react"
import Avatar from "../components/UI/Avatar"
import Button from "../components/UI/Button"
import Container from "../components/UI/Container"
import CustomNavbar from "../components/UI/CustomNavbar"
import RestaurantListCard from "../components/UI/RestaurantListCard"
import Text from "../components/UI/Text"
import TextInput from "../components/UI/TextInput"
import { useResturantsQuery, useReviewsQuery } from "../http/queries"
import { FlatList, ScrollView } from "react-native"
import { useUser } from "../context/UserContext"
import SearchListCard from "../components/UI/SearchListCard"
import { useCreateReviewMutation } from "../http/mutations"

function ComponentsScreen() {
  const { data: resturants, ...resturantQuery } = useResturantsQuery()
  const { data: reviews, ...reviewsQuery } = useReviewsQuery({})
  const createReview = useCreateReviewMutation()

  const userCtx = useUser()

  function onLogin() {
    userCtx.login({ email: "florijan@mail.com", password: "123456" })
  }

  function onLogout() {
    userCtx.logout()
  }

  async function onCreateReview() {
    if(!resturants || !userCtx.user)
      return

    console.log("Create review")
    const data = await createReview.mutateAsync({
      comment: "Test from app",
      rating: 5,
      restaurant: resturants[0]._id,
      user: userCtx.user._id
    })
    
    console.log(JSON.stringify(data))
    reviewsQuery.refetch()
  }

  return (
    <Container style={{ rowGap: 8 }}>
      <Text style={{ fontWeight: 'bold', fontSize: 24 }}>Current user: {userCtx.user ? userCtx.user.name : "NONE"}</Text>
      <Text style={{ fontWeight: 'bold' }}>Restavracije</Text>
      <FlatList style={{ maxHeight: 100, borderWidth: 2 }} data={resturants} renderItem={({ item: data }) => <Text key={data._id}>{data.name}</Text>} />
      <Text style={{ fontWeight: 'bold' }}>Reviews</Text>
      <FlatList style={{ maxHeight: 100, borderWidth: 2 }} data={reviews} renderItem={({ item: data }) => <Text key={data._id}>{data.user.name}: {data.comment}</Text>} />
      <ScrollView>
        <Button onPress={onLogin}>Primary</Button>
        <Button onPress={onLogout} mode="SECONDARY">Secondary</Button>
        <Button mode="WARNING" onPress={onCreateReview}>Warning create review</Button>
        <Button loading>Loading</Button>
        <Button mode="TRANSPARENT">Transparent</Button>
        <TextInput value="Test value" />
        <TextInput placeholder="Placeholder text" />
        <Avatar />
        <RestaurantListCard></RestaurantListCard>
        <SearchListCard isOpen={false}></SearchListCard>
      </ScrollView>
    </Container>
  )
}

export default ComponentsScreen