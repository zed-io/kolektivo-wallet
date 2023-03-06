import { RouteProp } from '@react-navigation/native'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { KeyshareEvents } from 'src/analytics/Events'
import BackButton from 'src/components/BackButton'
import Button, { BtnSizes } from 'src/components/Button'
import i18n from 'src/i18n'
import BrokenKey from 'src/icons/BrokenKey'
import { emptyHeader } from 'src/navigator/Headers'
import { Screens } from 'src/navigator/Screens'
import { StackParamList } from 'src/navigator/types'
import { UriData } from 'src/qrcode/schema'
import { RootState } from 'src/redux/reducers'
import colors from 'src/styles/colors'
import fontStyles from 'src/styles/fonts'
import variables from 'src/styles/variables'
import { currentAccountSelector } from 'src/web3/selectors'

type Props = {}

const mapStateToProps = (state: RootState): Partial<UriData> => ({
  address: currentAccountSelector(state)!,
  displayName: state.account.name || undefined,
  e164PhoneNumber: state.account.e164PhoneNumber || undefined,
})

const handleResetRecovery = () => {}

export default function RecoveryKeyshareDisplay(_props: Props) {
  const { t } = useTranslation()
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.spread}>
        <View style={styles.keyRow}>
          <BrokenKey />
        </View>
        <View>
          <Text style={styles.header}>{t('refreshAccount')}</Text>
          <Text style={styles.body}>{t('exportRecoveryKeyshareInfo')}</Text>
        </View>
      </View>
      <Button size={BtnSizes.FULL} onPress={handleResetRecovery} text={t('continue')} />
    </SafeAreaView>
  )
}

RecoveryKeyshareDisplay.navigationOptions = ({
  route,
}: {
  route: RouteProp<StackParamList, Screens.RecoveryKeyshare>
}) => {
  return {
    ...emptyHeader,
    headerLeft: () => <BackButton eventName={KeyshareEvents.export_user_keyshare_cancel} />,
    headerTitle: i18n.t('recoveryKeyshare'),
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light,
    paddingHorizontal: variables.contentPadding * 2,
  },
  spread: {
    height: '60%',
    alignContent: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  keyRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  header: {
    ...fontStyles.h1,
    paddingBottom: variables.contentPadding,
    textAlign: 'center',
  },
  body: {
    ...fontStyles.small,
    textAlign: 'center',
  },
})
