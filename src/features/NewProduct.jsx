import { Button, Input, Stack, XStack } from 'tamagui'
import { API_KEY } from '@env'

export const NewProduct = ({ navigation }) => {
  const body = JSON.stringify({
    data: {
      type: 'node--article',
      attributes: {
        title: 'My custom title omggggg',
        body: {
          value: 'Custom value hihihi',
          format: 'plain_text',
        },
      },
    },
  })

  const postArticle = async () => {
    try {
      const request = await fetch('https://data.fepoulpa.net/jsonapi/node/article', {
        method: 'POST',
        headers: { Authorization: 'Basic ' + API_KEY, 'Content-Type': 'application/vnd.api+json' },
        body,
      })
      const response = await request.json()
      console.log(response)
      navigation.navigate('Home')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Stack flex space justifyContent="space-between" alignItems="center" p={16} pb={40}>
      <XStack alignItems="center" space="$2">
        <Input flex={1} size="$5" placeholder="Start typing" />
        <Button size="$5">Go</Button>
      </XStack>
      <XStack>
        <Button flex size="$5" onPress={postArticle}>
          Add product
        </Button>
      </XStack>
    </Stack>
  )
}
