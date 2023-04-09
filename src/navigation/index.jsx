import { Articles } from '../features/Articles'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons'
import { Clients } from '../features/Clients'
import Icon from '@expo/vector-icons/Ionicons'

const Tab = createBottomTabNavigator()

export const NativeNavigation = () => (
  <Tab.Navigator>
    <Tab.Screen
      name="articles"
      component={Articles}
      options={{
        title: 'Articles',
        headerRight: () => <Icon.Button name="person-circle" color="black" backgroundColor="white" />,
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