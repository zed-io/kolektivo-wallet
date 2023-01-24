// @ts-nocheck
import { StackScreenProps } from '@react-navigation/stack'
import React, { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch } from 'react-redux'
import Button, { BtnSizes, BtnTypes } from 'src/components/Button'
import EmailAddressInput from 'src/components/EmailAddressInput'
import PasswordInput from 'src/components/PasswordInput'
import { nuxNavigationOptionsNoBackButton } from 'src/navigator/Headers'
import { Screens } from 'src/navigator/Screens'
import { StackParamList } from 'src/navigator/types'
import fontStyles from 'src/styles/fonts'
import { Spacing } from 'src/styles/styles'
import variables from 'src/styles/variables'

type RouteProps = StackScreenProps<StackParamList, Screens.CapsuleOAuth>
type Props = RouteProps

function CapsuleOAuthScreen({ route }: Props) {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const { isExistingUser } = route.params || {}

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirmedPassword, setConfirmation] = useState<string>('')

  const emailInputRef = useRef<any>()

  const onChangeEmail = (email: string) => {
    setEmail(email)
  }
  const onChangePassword = (password: string) => {
    setPassword(password)
    if (!!!password) {
      setConfirmation('')
    }
  }
  const onChangePasswordConfirmation = (confirmation: string) => {
    setConfirmation(confirmation)
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView styles={styles.scrollWrapper} contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.header}>Sign Up</Text>
        <View style={styles.inputGroup}>
          <EmailAddressInput
            label={t('email')}
            email={email}
            onChange={onChangeEmail}
            style={styles.emailAddress}
          />
          <PasswordInput
            label={t('password')}
            password={password}
            onChange={onChangePassword}
            style={styles.emailAddress}
          />
          {!!password && (
            <PasswordInput
              label={t('password2')}
              password={confirmedPassword}
              onChange={onChangePasswordConfirmation}
              style={styles.emailAddress}
            />
          )}
        </View>
        <Button
          type={BtnTypes.BRAND_PRIMARY}
          size={BtnSizes.FULL}
          text={'Sign Up'}
          onPress={() => {}}
        />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 24,
  },
  scrollWrapper: {
    flexGrow: 1,
    paddingTop: 32,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingTop: variables.headerPadding,
    justifyContent: 'flex-end',
    flexDirection: 'column',
  },
  header: {
    ...fontStyles.h1,
    textAlign: 'center',
  },
  inputGroup: {
    flexGrow: 1,
    justifyContent: 'center',
    flexDirection: 'column',
  },
  emailAddress: {
    marginBottom: Spacing.Thick24,
  },
})

CapsuleOAuthScreen.navigationOptions = nuxNavigationOptionsNoBackButton
export default CapsuleOAuthScreen
