import { isNull } from 'lodash'
import React, { useEffect, useMemo } from 'react'
import { Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useSelector } from 'react-redux'
import { navigate } from 'src/navigator/NavigationService'
import { Screens } from 'src/navigator/Screens'
import { accountAddressSelector } from 'src/web3/selectors'

const TAG = 'onboarding/keyshare'

const KeyshareProvisioningScreen = () => {
  const account = useSelector(accountAddressSelector)

  const accountReady = useMemo(() => {
    return !isNull(account)
  }, [account])

  useEffect(() => {
    if (accountReady) {
      handleAccountReady()
    }
  }, [accountReady])

  const handleAccountReady = () => {
    goToNextScreen()
  }

  const goToNextScreen = () => {
    try {
      // @note Go to Nux Interests
      navigate(Screens.NuxInterests)
    } catch (error) {
      console.error(TAG, '@goToNextScreen', error)
    }
  }

  return (
    <SafeAreaView>
      <Text>Waiting for account creation</Text>
    </SafeAreaView>
  )
}

export default KeyshareProvisioningScreen
