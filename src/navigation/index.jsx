import { Products } from '../features/Products'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons'
import { Clients } from '../features/Clients'
import Icon from '@expo/vector-icons/Ionicons'
import { Landing } from '../features/Landing'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { SignedOut } from '@clerk/clerk-expo'
import { Button } from 'react-native'

const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator()

export const BottomTabNavigation = () => (
  <Tab.Navigator
    screenOptions={{
      tabBarActiveTintColor: 'black',
    }}
  >
    <Tab.Screen
      name="products"
      component={Products}
      options={{
        title: 'Produits',
        headerLeft: () => (
          <Button title="">
            <Icon.Button name="person-circle" />
          </Button>
        ),
        tabBarIcon: ({ color, size }) => <Ionicons name="layers" color={color} size={size} />,
      }}
    />
    <Tab.Screen
      name="clients"
      component={Clients}
      options={{
        title: 'Clients',
        tabBarIcon: ({ color, size }) => <Ionicons name="people" color={color} size={size} />,
      }}
    />
  </Tab.Navigator>
)

export const AuthNavigation = () => (
  <Stack.Navigator>
    <Stack.Screen name="Landing" component={Landing} options={{ presentation: 'modal', headerShown: false }} />
  </Stack.Navigator>
)
