import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'
import { useTranslation } from 'react-i18next'
import SettingsScreen from 'src/account/Settings'
import Support from 'src/account/Support'
import WalletHome from 'src/home/WalletHome'
import { Help } from 'src/icons/navigator/Help'
import { Home } from 'src/icons/navigator/Home'
import { Settings } from 'src/icons/navigator/Settings'
import { Screens } from 'src/navigator/Screens'

const TAG = 'NavigationService'

const Tabs = createBottomTabNavigator()

export default function TabNavigator() {
  const { t } = useTranslation()
  return (
    <Tabs.Navigator initialRouteName={Screens.WalletHome}>
      <Tabs.Screen
        name={Screens.WalletHome}
        component={WalletHome}
        options={{ title: t('home'), tabBarIcon: Home }}
      />
      <Tabs.Screen
        name={Screens.Settings}
        component={SettingsScreen}
        options={{ title: t('settings'), tabBarIcon: Settings }}
      />
      <Tabs.Screen
        name={Screens.Support}
        component={Support}
        options={{ title: t('help'), tabBarIcon: Help }}
      />
    </Tabs.Navigator>
  )
}
