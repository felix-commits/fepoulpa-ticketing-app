import { useUser } from '@clerk/clerk-expo'
import { useState } from 'react'
import { Button, H4, Input, Stack, XStack } from 'tamagui'

export const Account = ({ navigation }) => {
  const { user } = useUser()
  const [firstName, setFirstName] = useState(user?.firstName || '')
  const [lastName, setLastName] = useState(user?.lastName || '')

  const updateUser = async () => user.update({ firstName, lastName })

  return (
    <Stack flex justifyContent="space-between" p={36}>
      <H4>Hello {user.primaryEmailAddress.emailAddress}!</H4>
      <Stack space>
        <XStack>
          <Input flex={1} size="$5" placeholder="First name" value={firstName} onChangeText={e => setFirstName(e)} />
        </XStack>
        <XStack alignItems="center" space="$2">
          <Input flex={1} size="$5" placeholder="Last name" value={lastName} onChangeText={e => setLastName(e)} />
          <Button size="$5" onPress={updateUser}>
            Go
          </Button>
        </XStack>
      </Stack>
      <Button onPress={() => signOut(true) && navigation.navigate('Home')}>Logout</Button>
    </Stack>
  )
}
