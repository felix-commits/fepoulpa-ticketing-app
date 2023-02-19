import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Login } from '../features/Login'

const Stack = createNativeStackNavigator()

export const NativeNavigation = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Dring Marché !" component={Login} />
  </Stack.Navigator>
)
