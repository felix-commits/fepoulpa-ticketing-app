import { useUser } from '@clerk/clerk-expo'
import { useEffect, useState } from 'react'
import { Stack, Text } from 'tamagui'
import { API_KEY } from '@env'

export const Products = () => {
  const { user } = useUser()
  const [productIds, setProductIds] = useState()

  const fetchArticleIds = async () => {
    try {
      const request = await fetch(
        'https://data.fepoulpa.net/jsonapi/node/vendeur?filter[field_identifiant_clerk]=' + user.id,
        { headers: { Authorization: 'Basic ' + API_KEY } }
      )
      const response = await request.json()
      setProductIds(response.data[0].relationships.field_produits.data.map(e => e.id))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchArticleIds()
  }, [user])

  return (
    <Stack flex justifyContent="center" alignItems="center">
      {productIds?.map(e => (
        <Text key={e}>{e}</Text>
      ))}
    </Stack>
  )
}
