import React from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet, Text } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import Button from 'src/components/Button'
import Logo from 'src/icons/Logo'
import Colors from 'src/styles/colors'
import fontStyles from 'src/styles/fonts'

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
  return (
    <ScrollView>
      <Logo height={32} />
      <Text style={styles.h1}>{t('userKeyshareIntro.title')}</Text>
      <Text style={styles.body}>{t('userKeyshareIntro.body')}</Text>
      <Button text={t('userKeyshareIntro.action')} onPress={() => {}} testID="SetUpAccountKey" />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light,
  },
  h1: { ...fontStyles.h1, textAlign: 'center' },
  body: { ...fontStyles.regular },
})

export default MigrateIntroduction
