import { ArrowRight } from '@tamagui/lucide-icons'
import { useState } from 'react'
import { Input, Stack, Text, XStack } from 'tamagui'
import { Sheet, Button } from 'tamagui'
import { useSignUp } from '@clerk/clerk-react'

const isValidEmail = email =>
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    String(email).toLowerCase()
  )

export const SignUp = ({ open, setOpen }) => {
  const [emailAddress, setEmailAddress] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [code, setCode] = useState('')
  const [verification, setVerification] = useState(false)
  const { signUp, setActive } = useSignUp()

  const onSignUp = async () => {
    if (!verification)
      try {
        await signUp.create({ emailAddress })
        await signUp.prepareEmailAddressVerification()
        setVerification(true)
      } catch (error) {
        setErrorMessage(error.errors ? error.errors[0].message : error)
      }
    else
      try {
        const { status, createdSessionId } = await signUp.attemptEmailAddressVerification({ code })
        if (status === 'complete') setActive({ session: createdSessionId })
        setOpen(false)
      } catch (error) {
        setErrorMessage(error.errors ? error.errors[0].message : error)
      }
  }

  return (
    <Sheet
      modal
      forceRemoveScrollEnabled={open}
      open={open}
      onOpenChange={setOpen}
      dismissOnSnapToBottom
      snapPoints={[25]}
    >
      <Sheet.Overlay />
      <Sheet.Handle />
      <Sheet.Frame flex flexGrow padding={16}>
        <XStack space>
          <Stack flex>
            {!verification ? (
              <Input
                flex
                borderColor={emailAddress && !isValidEmail(emailAddress) ? 'red' : null}
                value={emailAddress}
                keyboardType="email-address"
                autoComplete="email"
                autoCorrect={false}
                autoCapitalize={false}
                onChangeText={value => setEmailAddress(value)}
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
                placeholder="XXX-XXX"
              />
            )}
          </Stack>
          <Button flex size="$6" circular icon={ArrowRight} onPress={onSignUp} />
        </XStack>
        <Text p={8} color={errorMessage ? 'red' : null}>
          {(verification && `Le code a été envoyé à l'adresse ${emailAddress}`) || errorMessage}
        </Text>
      </Sheet.Frame>
    </Sheet>
  )
}
