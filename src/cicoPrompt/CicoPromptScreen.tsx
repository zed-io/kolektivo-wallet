import { useHeaderHeight } from '@react-navigation/stack'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet } from 'react-native'
import Education from 'src/account/Education'
import { KolektivoNotificationEvents } from 'src/analytics/Events'
import ValoraAnalytics from 'src/analytics/ValoraAnalytics'
import { BtnTypes } from 'src/components/Button'
import Logo, { LogoTypes } from 'src/icons/Logo'
import { nuxNavigationOptions } from 'src/navigator/Headers'
import { navigate } from 'src/navigator/NavigationService'
import { Screens } from 'src/navigator/Screens'
import LanguageButton from 'src/onboarding/LanguageButton'
import colors from 'src/styles/colors'
import progressDots from 'src/styles/progressDots'
import { Spacing } from 'src/styles/styles'

export enum CicoTopic {
  cico = 'cico',
}

function useStep() {
  const { t } = useTranslation()
  // @todo Replace value propositions with ones from Kolektivo
  return React.useMemo(() => {
    return [
      {
        title: t('cicoPrompt.step1'),
        isTopTitle: true,
        topic: CicoTopic.cico,
      },
      {
        title: t('cicoPrompt.step2'),
        isTopTitle: true,
        topic: CicoTopic.cico,
      },
      {
        title: t('cicoPrompt.step3'),
        isTopTitle: true,
        topic: CicoTopic.cico,
      },
      {
        title: t('cicoPrompt.step4'),
        isTopTitle: true,
        topic: CicoTopic.cico,
      },
    ]
  }, [t])
}

export default function CicoPromptScreen() {
  const { t } = useTranslation()

  const headerHeight = useHeaderHeight()
  const stepInfo = useStep()

  useEffect(() => {
    ValoraAnalytics.track(KolektivoNotificationEvents.view_cico_prompt)
  }, [])

  const onFinish = () => {
    ValoraAnalytics.track(KolektivoNotificationEvents.cico_prompt_complete)
    navigate(Screens.Welcome)
  }

  return (
    <Education
      style={[styles.container, headerHeight ? { paddingTop: headerHeight } : undefined]}
      edges={['bottom']}
      embeddedNavBar={null}
      stepInfo={stepInfo}
      finalButtonType={BtnTypes.ONBOARDING}
      finalButtonText={t('getStarted')}
      buttonType={BtnTypes.ONBOARDING_SECONDARY}
      buttonText={t('next')}
      dotStyle={progressDots.circlePassiveOnboarding}
      activeDotStyle={progressDots.circleActiveOnboarding}
      onFinish={onFinish}
    />
  )
}

CicoPromptScreen.navigationOptions = {
  ...nuxNavigationOptions,
  headerLeft: () => {
    return <Logo type={LogoTypes.DARK} />
  },
  headerLeftContainerStyle: { paddingLeft: Spacing.Thick24 },
  headerRight: () => <LanguageButton />,
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.notificationBackground,
  },
})
