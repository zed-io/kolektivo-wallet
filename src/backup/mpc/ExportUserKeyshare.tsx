import React from 'react'
import { useAsync } from 'react-async-hook'
import { Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'
import { showError } from 'src/alert/actions'
import { getStoredCapsuleKeyShare, onGetMnemonicFail } from 'src/backup/utils'
import { Screens } from 'src/navigator/Screens'
import { accountAddressSelector } from 'src/web3/selectors'

const TAG = 'keyshare/user'

const ExportUserKeyshare = () => {
  const dispatch = useDispatch()
  const account = useSelector(accountAddressSelector)

  const userKeyshare = useAsync(async () => {
    try {
      const keyshare = await getStoredCapsuleKeyShare(account)
      if (keyshare) {
        return keyshare
      }
    } catch (error) {
      onGetMnemonicFail(dispatch(showError), Screens.ExportUserKeyshare)
      console.error(TAG, '@getUserKeyshare', error)
    }
  }, [])

  return (
    <SafeAreaView>
      <Text>{JSON.stringify(userKeyshare)}</Text>
    </SafeAreaView>
  )
}

export default ExportUserKeyshare
