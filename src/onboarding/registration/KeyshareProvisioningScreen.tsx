import { navigate } from '@react-navigation/compat/lib/typescript/src/NavigationActions'
import React, { useEffect, useState } from 'react'
import { Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useSelector } from 'react-redux'
import { Screens } from 'src/navigator/Screens'
import { accountAddressSelector } from 'src/web3/selectors'

const TAG = 'onboarding/keyshare'

const KeyshareProvisioningScreen = () => {
  const account = useSelector(accountAddressSelector)
  const [elapsed, setElapsed] = useState<number>(0)

  useEffect(() => {
    const pid = setInterval(() => {
      setElapsed(elapsed + 1)
      if (account) {
        clearInterval(pid)
        goToNextScreen()
      }
    }, 1000)

    return () => {
      clearInterval(pid)
    }
  })

  const goToNextScreen = () => {
    try {
      // @note Go to Nux Interests
      navigate(Screens.NuxInterests, {})
    } catch (error) {
      console.error(TAG, '@goToNextScreen', error)
    }
  }

  return (
    <SafeAreaView>
      <Text>Waiting {elapsed} seconds</Text>
    </SafeAreaView>
  )
}

export default KeyshareProvisioningScreen
