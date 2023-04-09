import { useUser } from '@clerk/clerk-expo'
import { Stack, Text } from 'tamagui'

export const Clients = () => {
  const {
    user: { id: userId },
  } = useUser()

  return (
    <Stack flex justifyContent='center' alignItems='center'>
      <Text>{userId}</Text>
    </Stack>
  )
}
