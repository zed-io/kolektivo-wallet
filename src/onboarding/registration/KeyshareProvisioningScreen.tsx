import React, { useEffect, useState } from 'react'
import { Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useSelector } from 'react-redux'
import { accountAddressSelector } from 'src/web3/selectors'

const KeyshareProvisioningScreen = () => {
  const account = useSelector(accountAddressSelector)
  const [elapsed, setElapsed] = useState<number>(0)

  useEffect(() => {
    const pid = setInterval(() => {
      setElapsed(elapsed + 1)
      if (account) {
        clearInterval(pid)
      }
    }, 1000)

    return () => {
      clearInterval(pid)
    }
  })

  return (
    <SafeAreaView>
      <Text>Waiting {elapsed} seconds</Text>
    </SafeAreaView>
  )
}

export default KeyshareProvisioningScreen
