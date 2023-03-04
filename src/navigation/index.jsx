import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Landing } from '../features/Landing'

const Stack = createNativeStackNavigator()

export const NativeNavigation = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="landing" component={Landing} />
    {/* <Stack.Screen name="Email verification" component={EmailVerification} /> */}
  </Stack.Navigator>
)
