import { PlantlyButton } from '@/components/PlantlyButton'
import { PlantlyImage } from '@/components/PlantlyImage'
import { useUserStore } from '@/store/userStore'
import { theme } from '@/theme'
import { LinearGradient } from 'expo-linear-gradient'
import { useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { Platform, StyleSheet, Text, View } from 'react-native'

export default function OnboardingScreen() {
  const router = useRouter()
  const toggleHasOnboarded = useUserStore((state) => state.toggleHasOnboarded)

  const handlePress = () => {
    toggleHasOnboarded()
    router.replace('/')
  }
  return (
    <LinearGradient
      start={{ x: 0.5, y: 0 }}
      end={{ x: 1, y: 0.5 }}
      colors={[theme.colorGreen, theme.colorAppleGreen, theme.colorLimeGreen]}
      style={styles.container}
    >
      <StatusBar style="light" />
      <View>
        <Text style={styles.heading}>Plantly</Text>
        <Text style={styles.tagline}>
          Keep your plants healthy and hydrated
        </Text>
      </View>
      <PlantlyImage />
      <PlantlyButton title="let me in" onPress={handlePress} />
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: theme.colorWhite,
    paddingHorizontal: 8
  },
  heading: {
    fontSize: 42,
    color: theme.colorWhite,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center'
  },
  tagline: {
    fontSize: 34,
    color: theme.colorWhite,
    textAlign: 'center',
    fontFamily: Platform.select({
      ios: 'Caveat-Regular',
      android: 'Caveat_400Regular'
    })
  }
})
