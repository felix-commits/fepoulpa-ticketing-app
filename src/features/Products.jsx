import { useUser } from '@clerk/clerk-expo'
import { useEffect, useState } from 'react'
import { ScrollView, Separator, YGroup, YStack } from 'tamagui'
import { API_KEY } from '@env'
import { Product } from './Product'

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
    <ScrollView theme="white" backgroundColor="white">
      <YStack padding="$3" space="$2" alignItems="center">
        <YGroup bordered separator={<Separator />}>
          {productIds?.map(id => (
            <Product key={id} {...{ id }} />
          ))}
        </YGroup>
      </YStack>
    </ScrollView>
  )
}
