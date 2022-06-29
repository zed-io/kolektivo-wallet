import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'
import { useTranslation } from 'react-i18next'
import Support from 'src/account/Support'
import { Help } from 'src/icons/navigator/Help'
import { Home } from 'src/icons/navigator/Home'
import Services from 'src/icons/Services'
import MapScreen from 'src/map/MapScreen'
import HomeStackNavigator from 'src/navigator/HomeStackNavigator'
import { Screens } from 'src/navigator/Screens'
import ServiceStackNavigator from 'src/navigator/ServiceStackNavigator'

const Tabs = createBottomTabNavigator()

export default function TabNavigator() {
  const { t } = useTranslation()
  return (
    <Tabs.Navigator initialRouteName={Screens.WalletHome}>
      <Tabs.Screen
        name={Screens.WalletHome}
        component={HomeStackNavigator}
        options={{ title: t('home'), tabBarIcon: Home }}
      />
      <Tabs.Screen
        name={Screens.WalletServices}
        component={ServiceStackNavigator}
        options={{ title: t('services'), tabBarIcon: Services }}
      />
      <Tabs.Screen
        name={Screens.Map}
        component={MapScreen}
        options={{ title: t('map.title'), tabBarIcon: Help }}
      />
    </Tabs.Navigator>
  )
}
