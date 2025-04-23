import { Image } from 'expo-image';
import { Pressable, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import Text from './Text';
import { useTheme } from '../../store/ThemeContext';

type AvatarProps = {
  size?: number,
  onPress?: () => void,
  url?: string;
}

function Avatar({ size = 64, onPress, url }: AvatarProps) {
  const { colors } = useTheme()


  const imageUrl = url || 'https://i.redd.it/g9q10ff0nwq81.jpg';
  return (
    <View style={[{ width: size, height: size, backgroundColor: colors.secondary }, styles.container]}>
      <Pressable style={styles.pressable} onPress={onPress} android_ripple={{ color: colors.onSurfaceDisabled }}>
        {
          true ?
            <Image source={imageUrl} style={styles.image} />
            :
            <Text style={{ fontWeight: 'bold', fontSize: size / 3, color: colors.onSecondary }}>MM</Text>
        }
      </Pressable>
    </View>
  )
}

export default Avatar

const styles = StyleSheet.create({
  container: {
    borderRadius: 32,
    overflow: 'hidden'
  },
  image: {
    flex: 1,
    width: '100%',
  },
  pressable: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})