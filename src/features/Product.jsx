import { useEffect, useState } from 'react'
import { ListItem, YGroup } from 'tamagui'
import { API_KEY } from '@env'

export const Product = ({ id }) => {
  const [product, setProduct] = useState()

  const fetchProduct = async () => {
    try {
      const request = await fetch('https://data.fepoulpa.net/jsonapi/node/produit/' + id, {
        headers: { Authorization: 'Basic ' + API_KEY },
      })
      const response = await request.json()
      setProduct(response.data.attributes.title)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchProduct()
  }, [id])

  return (
    <YGroup.Item key={id}>
      <ListItem title={product} subTitle="Twinkles" />
    </YGroup.Item>
  )
}
