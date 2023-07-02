import { ArrowRight } from '@tamagui/lucide-icons'
import { useState } from 'react'
import { Input, Stack, Text, XStack } from 'tamagui'
import { Sheet, Button } from 'tamagui'
import { useSignIn } from '@clerk/clerk-react'

const isValidEmail = email =>
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    String(email).toLowerCase()
  )

export const SignIn = ({ openSignIn, setOpenSignIn }) => {
  const [identifier, setIdentifier] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [code, setCode] = useState('')
  const [verification, setVerification] = useState(false)
  const { signIn, setActive } = useSignIn()
  const strategy = 'email_code'

  const onSignIn = async () => {
    if (!verification)
      try {
        const { supportedFirstFactors } = await signIn.create({ identifier })
        const { emailAddressId } = supportedFirstFactors.find(factor => factor.strategy === strategy)
        await signIn.prepareFirstFactor({ strategy, emailAddressId })
        setVerification(true)
      } catch (error) {
        setErrorMessage(error.errors ? error.errors[0].message : error)
      }
    else
      try {
        const { status, createdSessionId } = await signIn.attemptFirstFactor({ strategy, code })
        if (status === 'complete') setActive({ session: createdSessionId })
        setOpenSignIn(false)
      } catch (error) {
        setErrorMessage(error.errors ? error.errors[0].message : error)
      }
  }

  return (
    <Sheet
      modal
      forceRemoveScrollEnabled={openSignIn}
      open={openSignIn}
      onOpenChange={setOpenSignIn}
      dismissOnSnapToBottom
      snapPoints={[60]}
    >
      <Sheet.Overlay />
      <Sheet.Handle />
      <Sheet.Frame flex flexGrow padding={16}>
        <XStack space>
          <Stack flex>
            {!verification ? (
              <Input
                flex
                borderColor={identifier && !isValidEmail(identifier) ? 'red' : null}
                value={identifier}
                keyboardType="email-address"
                autoComplete="email"
                autoCorrect={false}
                autoCapitalize={false}
                onChangeText={value => setIdentifier(value)}
                size="$6"
                placeholder="@"
              />
            ) : (
              <Input
                flex
                value={code}
                keyboardType="phone-pad"
                onChangeText={value => setCode(value)}
                size="$6"
                placeholder="XXXXXX"
              />
            )}
          </Stack>
          <Button flex size="$6" circular icon={ArrowRight} onPress={onSignIn} />
        </XStack>
        <Text padding={8}>
          {verification && `Le code a été envoyé à l'adresse ${identifier}`} <Text color="red">{errorMessage}</Text>
        </Text>
      </Sheet.Frame>
    </Sheet>
  )
}
