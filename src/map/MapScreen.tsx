import { StackScreenProps } from '@react-navigation/stack'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch } from 'react-redux'
import { BASE_TAG } from 'src/map/constants'
import { Screens } from 'src/navigator/Screens'
import { StackParamList } from 'src/navigator/types'
import MapboxGL from '@rnmapbox/maps'

MapboxGL.setAccessToken(
  'sk.eyJ1IjoibWFya3BlcmVpciIsImEiOiJjbDRlaThramowM3NmM2lvMzkyamNyeWgwIn0.PqiVHH7G4ZLRGWCklu_nJA'
)

type Props = StackScreenProps<StackParamList, Screens.Map>

function MapScreen({ route }: Props) {
  const LOG_TAG = BASE_TAG + 'Screen'

  const { params: routeParams } = route || {}
  const { t } = useTranslation()
  const dispatch = useDispatch()

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <MapboxGL.MapView style={styles.map} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 8,
  },
  map: {
    flex: 1,
  },
})

export default MapScreen
