import { StackScreenProps } from '@react-navigation/stack'
import React from 'react'
import { useAsync } from 'react-async-hook'
import { useTranslation } from 'react-i18next'
import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'
import { showError } from 'src/alert/actions'
import { getStoredCapsuleKeyShare, onGetMnemonicFail } from 'src/backup/utils'
import CancelButton from 'src/components/CancelButton'
import { pushToStack } from 'src/navigator/NavigationService'
import { Screens } from 'src/navigator/Screens'
import { TopBarTextButton } from 'src/navigator/TopBarButton'
import { StackParamList } from 'src/navigator/types'
import { accountAddressSelector } from 'src/web3/selectors'

const TAG = 'export/user'

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
    <SafeAreaView edges={['top', 'left', 'right']}>
      {/* <DrawerTopBar /> */}
      <View>
        <Text>{JSON.stringify(userKeyshare)}</Text>
      </View>
    </SafeAreaView>
  )
}

export const navOptionsForExportUserKey = (
  props: StackScreenProps<StackParamList, Screens.ExportUserKeyshare>
) => {
  return {
    headerLeft: () => {
      //@todo Navigate from previous screen
      return <CancelButton />
    },
    headerRight: () => {
      //@todo Navigate back to MCP education
      return <HeaderRight />
    },
  }
}

function HeaderRight() {
  const { t } = useTranslation()
  const onMoreInfoPressed = () => {
    pushToStack(Screens.MultiPartyEducationScreen)
  }
  return <TopBarTextButton onPress={onMoreInfoPressed} title={t('moreInfo')} />
}

export default ExportUserKeyshare
