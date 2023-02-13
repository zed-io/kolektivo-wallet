import React from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet, Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import Button from 'src/components/Button'
import Logo, { LogoTypes } from 'src/icons/Logo'
import { navigate } from 'src/navigator/NavigationService'
import { Screens } from 'src/navigator/Screens'
import fontStyles from 'src/styles/fonts'
import { getShadowStyle, Shadow, Spacing } from 'src/styles/styles'
import variables from 'src/styles/variables'

const MigrateIntroduction = () => {
  const migrateEducationComplete = false

  return (
    <SafeAreaView style={styles.container}>
      {migrateEducationComplete ? null : <UserKeyshareIntro />}
    </SafeAreaView>
  )
}

const UserKeyshareIntro = () => {
  const { t } = useTranslation()

  const visitMpcGuide = () => {
    // @todo Navigate to MPC Education
    navigate(Screens.MultiPartyEducationScreen)
  }

  return (
    <ScrollView>
      <Logo
        height={300}
        type={LogoTypes.LIGHT}
        style={{ ...getShadowStyle(Shadow.Soft), alignItems: 'center' }}
      />
      <View style={styles.innerContainer}>
        <Text style={styles.h1}>{t('userKeyshareIntro.title')}</Text>
        <Text style={styles.body}>{t('userKeyshareIntro.body1')}</Text>
        <Text style={styles.body}>{t('userKeyshareIntro.body2')}</Text>
        <Button
          style={styles.button}
          text={t('userKeyshareIntro.action')}
          onPress={visitMpcGuide}
          testID="SetUpAccountKey"
        />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: variables.contentPadding,
  },
  innerContainer: {
    paddingTop: Spacing.Thick24,
    paddingHorizontal: Spacing.Regular16,
  },
  h1: { ...fontStyles.h1, textAlign: 'center', marginBottom: variables.contentPadding },
  body: { ...fontStyles.regular, textAlign: 'justify', marginBottom: variables.contentPadding },
  button: { justifyContent: 'center' },
})

export default MigrateIntroduction
