// @ts-nocheck
import { StackScreenProps } from '@react-navigation/stack'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch } from 'react-redux'
import { nuxNavigationOptionsNoBackButton } from 'src/navigator/Headers'
import { Screens } from 'src/navigator/Screens'
import { StackParamList } from 'src/navigator/types'

type RouteProps = StackScreenProps<StackParamList, Screens.CapsuleOAuth>
type Props = RouteProps

function CapsuleOAuthScreen({ route }: Props) {
  const dispatch = useDispatch()
  const { isExistingUser } = route.params

  return (
    <SafeAreaView>
      <View style={styles.container}>{isExistingUser}</View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 24,
  },
})

CapsuleOAuthScreen.navigationOptions = nuxNavigationOptionsNoBackButton
export default CapsuleOAuthScreen
