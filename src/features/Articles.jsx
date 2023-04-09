import { useUser } from '@clerk/clerk-expo'
import { useEffect, useState } from 'react'
import { Stack, Text } from 'tamagui'

const KEY = window.btoa('fepoulpa:lq9_P9r0nP7')

export const Articles = () => {
  const { user } = useUser()
  const [articles, setArticles] = useState()

  const fetchArticles = async () => {
    console.log('yo')
    try {
      const request = await fetch(
        'https://data.fepoulpa.net/jsonapi/node/vendeur' +
          new URLSearchParams({ 'filter[field_identifiant_clerk]': user.id }),
        { headers: { Authorization: 'Basic ' + KEY } }
      )
      const response = await request.json()
      console.log(request)
      setArticles(response)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchArticles()
  }, [])

  if (articles) console.log(articles)

  return (
    <Stack flex justifyContent="center" alignItems="center">
      <Text>{user?.id}</Text>
    </Stack>
  )
}
