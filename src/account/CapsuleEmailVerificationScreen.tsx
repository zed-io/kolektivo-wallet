// @ts-nocheck
import React from 'react'
import { View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch } from 'react-redux'
import { nuxNavigationOptionsNoBackButton } from 'src/navigator/Headers'

function CapsuleEmailVerificationScreen() {
  const dispatch = useDispatch()
  return (
    <SafeAreaView>
      <View>{false}</View>
    </SafeAreaView>
  )
}

CapsuleEmailVerificationScreen.navigationOptions = nuxNavigationOptionsNoBackButton
export default CapsuleEmailVerificationScreen
