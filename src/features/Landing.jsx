import { SignedIn, SignedOut, useAuth, useUser } from '@clerk/clerk-expo'
import { useState } from 'react'
import { Button, H4, Stack, XStack } from 'tamagui'
import { SignIn } from './SignIn'
import { SignUp } from './SignUp'

export const Landing = ({ navigation }) => {
  const [openSignIn, setOpenSignIn] = useState(false)
  const [openSignUp, setOpenSignUp] = useState(false)
  const { user } = useUser()
  const { signOut } = useAuth()

  return (
    <Stack flex justifyContent="space-between" paddingVertical={64} paddingHorizontal={16}>
      <H4>Dring Marché ! 🌽</H4>
      <SignedIn>
        <Button onPress={() => signOut()}>Log out</Button>
      </SignedIn>
      <SignedOut>
        <XStack space>
          <Button flex onPress={() => setOpenSignUp(true)}>
            Sign up
          </Button>
          <Button flex themeInverse onPress={() => setOpenSignIn(true)}>
            Log in
          </Button>
        </XStack>
        <SignIn {...{ openSignIn, setOpenSignIn }} />
        <SignUp {...{ openSignUp, setOpenSignUp }} />
      </SignedOut>
    </Stack>
  )
}
