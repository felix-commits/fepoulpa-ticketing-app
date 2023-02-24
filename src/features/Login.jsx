import { SignedIn, SignedOut, useAuth, useUser } from '@clerk/clerk-expo'
import { useState } from 'react'
import { Button, H3, H4, Stack, XStack } from 'tamagui'
import { SignUp } from './SignUp'
import ContextMenu from 'react-native-context-menu-view'

export const Login = ({ navigation }) => {
  const [open, setOpen] = useState(false)
  const { user } = useUser()
  const { signOut } = useAuth()

  return (
    <Stack flex={1} justifyContent="space-between" paddingVertical={64} paddingHorizontal={16}>
      <H4>Dring Marché ! 🌽</H4>
      <SignedIn>
        <ContextMenu
          actions={[{ title: 'Title 1' }, { title: 'Title 2' }]}
          onPress={e => {
            console.log(`Pressed ${e.nativeEvent.name} at index ${e.nativeEvent.index}`)
          }}
        >
          <H3>Re-bonjour {user?.firstName} ! 🌽</H3>
        </ContextMenu>
        <Button onPress={() => signOut()}>Log out</Button>
      </SignedIn>
      <SignedOut>
        <XStack space>
          <Button flex onPress={() => setOpen(true)}>
            Sign up
          </Button>
          <Button flex themeInverse>
            Log in
          </Button>
        </XStack>
        <SignUp {...{ open, setOpen }} />
      </SignedOut>
    </Stack>
  )
}
