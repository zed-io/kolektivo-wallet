import React, { useRef } from 'react'
import { useAsync } from 'react-async-hook'
import { Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'
import { showError } from 'src/alert/actions'
import SerialisedKeyshare from 'src/backup/mpc/SerialisedKeyshare'
import { getStoredCapsuleKeyShare, onGetMnemonicFail } from 'src/backup/utils'
import { Screens } from 'src/navigator/Screens'
import { SVG } from 'src/send/actions'
import Logger from 'src/utils/Logger'
import { accountAddressSelector } from 'src/web3/selectors'

const TAG = 'keyshare/user'

const ExportUserKeyshare = () => {
  const dispatch = useDispatch()
  const account = useSelector(accountAddressSelector)

  const qrSvgRef = useRef<SVG>()

  const userKeyshare = useAsync(async () => {
    try {
      const keyshare = await getStoredCapsuleKeyShare(account)
      if (keyshare) {
        return keyshare
      }
    } catch (error: any) {
      onGetMnemonicFail(dispatch(showError), Screens.ExportUserKeyshare)
      Logger.error(TAG, '@getUserKeyshare', error)
    }
  }, [])

  return (
    <SafeAreaView>
      {userKeyshare.result && (
        <SerialisedKeyshare content={userKeyshare.result} qrSvgReg={qrSvgRef} />
      )}
      <Text>{JSON.stringify(userKeyshare)}</Text>
    </SafeAreaView>
  )
}

export default ExportUserKeyshare
