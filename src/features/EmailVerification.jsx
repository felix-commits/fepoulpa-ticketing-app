import { useSignIn } from '@clerk/clerk-expo'
import { Stack, Text } from 'tamagui'

export const EmailVerification = ({ route }) => {
  const { email } = route.params
  const { signIn, setSession, isLoaded } = useSignIn()
  return (
    <Stack justifyContent='center' flex={1}>
      <Text>{email}</Text>
    </Stack>
  )
}
