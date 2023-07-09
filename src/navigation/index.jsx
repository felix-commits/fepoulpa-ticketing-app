import { Products } from '../features/Products'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons'
import { Clients } from '../features/Clients'
import Icon from '@expo/vector-icons/Ionicons'
import { Landing } from '../features/Landing'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { TouchableOpacity } from 'react-native'
import { XStack } from 'tamagui'
import { Account, Logout } from '../features/Account'
import { SignedIn, SignedOut } from '@clerk/clerk-expo'
import { NewProduct } from '../features/NewProduct'
import { Product } from '../features/Product'

const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator()

export const Navigation = () => (
  <Stack.Navigator>
    <Stack.Screen name="Home" component={BottomTabNavigation} options={{ headerShown: false }} />
    <Stack.Screen name="Product" component={Product} options={{ headerShown: false }} />
    <Stack.Screen name="Landing" component={Landing} options={{ headerShown: false }} />
    <Stack.Screen name="Logout" component={Account} options={{ presentation: 'modal', headerShown: false }} />
    <Stack.Screen
      name="NewProduct"
      component={NewProduct}
      options={{
        headerShown: false,
        presentation: 'modal',
      }}
    />
  </Stack.Navigator>
)

export const BottomTabNavigation = () => (
  <>
    <SignedIn>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: 'purple',
        }}
      >
        <Tab.Screen
          name="products"
          component={Products}
          options={({ navigation }) => ({
            title: 'Produits',
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.navigate('Logout')}>
                <XStack paddingLeft={16}>
                  <Icon name="person-circle" size={30}  color="purple" />
                </XStack>
              </TouchableOpacity>
            ),
            headerRight: () => (
              <TouchableOpacity onPress={() => navigation.navigate('NewProduct')}>
                <XStack paddingRight={16}>
                  <Icon name="add" size={30} color="purple" />
                </XStack>
              </TouchableOpacity>
            ),
            tabBarIcon: ({ color, size }) => <Ionicons name="layers" color={color} size={size} />,
          })}
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
    </SignedIn>
    <SignedOut>
      <Stack.Navigator>
        <Stack.Screen name="Landing" component={Landing} options={{ headerShown: false }} />
      </Stack.Navigator>
    </SignedOut>
  </>
)
