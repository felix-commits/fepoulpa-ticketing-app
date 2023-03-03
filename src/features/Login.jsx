import { SignedIn, SignedOut, useAuth, useUser } from '@clerk/clerk-expo'
import { useState } from 'react'
import { Button, H4, Stack, XStack } from 'tamagui'
import { SignUp } from './SignUp'

export const Login = ({ navigation }) => {
  const [open, setOpen] = useState(false)
  const { user } = useUser()
  const { signOut } = useAuth()

  return (
    <Stack flex={1} justifyContent="space-between" paddingVertical={64} paddingHorizontal={16}>
      <H4>Dring Marché ! 🌽</H4>
      <SignedIn>
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
