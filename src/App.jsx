import 'expo-dev-client'

import { useFonts } from 'expo-font'
import { Keyboard, KeyboardAvoidingView } from 'react-native'

import { NativeNavigation } from './navigation'
import { Provider } from './provider'

const App = () => {
  const [loaded] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
  })

  const handleUnhandledTouches = () => {
    Keyboard.dismiss()
    return false
  }

  return !loaded ? null : (
    <KeyboardAvoidingView style={{ flex: 1 }} onStartShouldSetResponder={handleUnhandledTouches}>
      <Provider>
        <NativeNavigation />
      </Provider>
    </KeyboardAvoidingView>
  )
}

export default App
