import { PlantlyButton } from '@/components/PlantlyButton'
import { PlantlyImage } from '@/components/PlantlyImage'
import { usePlantStore } from '@/store/plantsStore'
import { theme } from '@/theme'
import * as ImagePicker from 'expo-image-picker'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import {
  Alert,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default function NewScreen() {
  const router = useRouter()
  const addPlant = usePlantStore((state) => state.addPlant)

  const [name, setName] = useState<string>()
  const [days, setDays] = useState<string>()
  const [selectedImage, setSelectedImage] = useState<string>()

  const handleSubmit = () => {
    if (!name) {
      return Alert.alert('Validation Error', 'Give your plant a name')
    }

    if (!days) {
      return Alert.alert(
        'Validation Error',
        `How often does ${name} need to be watered?`
      )
    }

    if (Number.isNaN(Number(days))) {
      return Alert.alert(
        'Validation Error',
        'Watering frequency must be a be a number'
      )
    }

    addPlant(name, Number(days))
    router.navigate('/')
  }

  const handleChooseImage = async () => {
    if (Platform.OS === 'web') {
      return
    }

    Alert.alert(
      'Choose Image Source',
      'Do you want to pick an image from the library or take a photo?',
      [
        {
          text: 'Library',
          onPress: () => pickImageFromLibrary()
        },
        {
          text: 'Camera',
          onPress: () => takePhoto()
        },
        {
          text: 'Cancel',
          style: 'cancel'
        }
      ]
    )
  }

  const pickImageFromLibrary = async () => {
    await ImagePicker.requestMediaLibraryPermissionsAsync()
    const imageResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1
    })
    console.log(JSON.stringify(imageResult, null, 2))
    if (!imageResult.canceled) {
      setSelectedImage(imageResult.assets[0].uri)
    }
  }

  const takePhoto = async () => {
    await ImagePicker.requestCameraPermissionsAsync()
    const imageResult = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1
    })
    console.log(JSON.stringify(imageResult, null, 2))
    if (!imageResult.canceled) {
      setSelectedImage(imageResult.assets[0].uri)
    }
  }

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      keyboardShouldPersistTaps="handled"
    >
      <TouchableOpacity
        style={styles.centered}
        activeOpacity={0.8}
        onPress={handleChooseImage}
      >
        <PlantlyImage imageUri={selectedImage} />
      </TouchableOpacity>

      <Text style={styles.label}>Name</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        style={styles.input}
        placeholder="E.g. Casper the Cactus"
        autoCapitalize="words"
      />
      <Text style={styles.label}>Watering Frequency (every x days)</Text>
      <TextInput
        value={days}
        onChangeText={setDays}
        style={styles.input}
        placeholder="E.g. 6"
        keyboardType="number-pad"
      />
      <PlantlyButton title="Add plant" onPress={handleSubmit} />
    </KeyboardAwareScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colorWhite
  },
  contentContainer: {
    paddingTop: 24,
    paddingHorizontal: 24,
    paddingBottom: 100
  },
  input: {
    borderWidth: 2,
    borderColor: theme.colorLightGrey,
    padding: 12,
    borderRadius: 6,
    marginBottom: 24,
    fontSize: 18
  },
  label: {
    fontSize: 18,
    marginBottom: 8
  },
  centered: {
    alignItems: 'center'
  }
})
