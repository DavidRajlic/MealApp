import { Image } from 'expo-image';
import { Pressable, StyleSheet, View } from 'react-native';
import Text from './Text';

type AvatarProps = {
  size?: number
}

function Avatar({size = 48}: AvatarProps) {
  const url = 'https://i.redd.it/g9q10ff0nwq81.jpg'
  return (
    <View>
      <Pressable style={[{width: size, height: size, backgroundColor: 'red'}]}>
        {
          true ?
          <Image source={url} />
          :
          <Text>MM</Text>
        }
      </Pressable>
    </View>
  )
}

export default Avatar

const styles = StyleSheet.create({
  image: {
    flex: 1,
    width: '100%',
    backgroundColor: '#0553',
  },
})