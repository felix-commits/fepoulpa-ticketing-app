import { blue } from '@tamagui/theme-base'
import { useState } from 'react'
import { Button, Form, FormTrigger, H4, Input } from 'tamagui'
import { MyStack } from '../components/MyStack'

export const Login = () => {
  const [email, setEmail] = useState('')
  return (
    <MyStack>
      <Form ai="center" space onSubmit={() => console.log('submitting')}>
        <H4>Dring Marché !</H4>
        <Input
          value={email}
          keyboardType="email"
          autoCapitalize={false}
          autoComplete={false}
          onChangeText={value => setEmail(value)}
          size="$4"
          placeholder="Veuillez entrer votre email"
        />
        <FormTrigger asChild>
          <Button>Accéder à ma commande</Button>
        </FormTrigger>
      </Form>
    </MyStack>
  )
}
