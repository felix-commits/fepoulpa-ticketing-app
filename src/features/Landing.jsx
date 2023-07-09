import { useAuth } from '@clerk/clerk-expo'
import { useState } from 'react'
import { Button, H2, Stack, XStack } from 'tamagui'
import { SignIn } from './SignIn'
import { SignUp } from './SignUp'

export const Landing = ({ navigation }) => {
  const [openSignIn, setOpenSignIn] = useState(false)
  const [openSignUp, setOpenSignUp] = useState(false)
  const { signOut } = useAuth()

  return (
    <Stack flex justifyContent="space-between" alignItems="center" padding={16} space>
      <H2 flex paddingTop={56} textAlign="center">
        Welcome to Fepoulpa Ticketing
      </H2>
      <XStack flex space alignItems="flex-end">
        <Button flex onPress={() => setOpenSignUp(true)}>
          Sign up
        </Button>
        <Button flex themeInverse onPress={() => setOpenSignIn(true)}>
          Log in
        </Button>
      </XStack>
      <SignIn {...{ openSignIn, setOpenSignIn }} />
      <SignUp {...{ openSignUp, setOpenSignUp }} />
    </Stack>
  )
}
