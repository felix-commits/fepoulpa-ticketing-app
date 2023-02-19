import 'expo-dev-client'

import { useFonts } from 'expo-font'
import { Keyboard, KeyboardAvoidingView } from 'react-native'

import { NativeNavigation } from './navigation'
import { Provider } from './provider'
import { ClerkProvider } from '@clerk/clerk-expo'
import * as SecureStore from 'expo-secure-store'
import { CLERK_PUBLISHABLE_KEY } from '@env'
import { Theme } from 'tamagui'

const tokenCache = {
  getToken: key => SecureStore.getItemAsync(key),
  saveToken: (key, value) => SecureStore.setItemAsync(key, value),
}

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
      <ClerkProvider tokenCache={tokenCache} publishableKey={CLERK_PUBLISHABLE_KEY}>
        <Provider>
          <Theme name="purple">
            <NativeNavigation />
          </Theme>
        </Provider>
      </ClerkProvider>
    </KeyboardAvoidingView>
  )
}

export default App
