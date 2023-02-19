import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { HomeScreen } from '../features/home/screen'
import { UserDetailScreen } from '../features/user/detail-screen'

const Stack = createNativeStackNavigator()

export const NativeNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen options={{ title: 'Home' }} name="home" component={HomeScreen} />
      <Stack.Screen options={{ title: 'User Details' }} name="user-detail" component={UserDetailScreen} />
    </Stack.Navigator>
  )
}
