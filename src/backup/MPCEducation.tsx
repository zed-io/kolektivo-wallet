import { TransitionPresets } from '@react-navigation/stack'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import Education, { EducationTopic, EmbeddedNavBar } from 'src/account/Education'
import { BtnTypes } from 'src/components/Button'
import { noHeader } from 'src/navigator/Headers'
import { navigate } from 'src/navigator/NavigationService'
import { Screens } from 'src/navigator/Screens'

const MultiPartyEducation = () => {
  const { t } = useTranslation()
  const steps = useEducationSteps()

  useEffect(() => {
    // @todo Analytics, MCP Education started
  }, [])

  const onComplete = () => {
    navigate(Screens.ExportUserKeyshare, { canGoBack: true })
  }

  return (
    <Education
      embeddedNavBar={EmbeddedNavBar.Close}
      stepInfo={steps}
      onFinish={onComplete}
      experimentalSwiper={true}
      finalButtonText={t('continue')}
      finalButtonType={BtnTypes.PRIMARY}
      buttonText={t('next')}
    />
  )
}

/**
 * Builds a localized array of steps to be used
 * in generating a multi-step education screen
 * with information specific to Multi-Party
 * Computation.
 * @returns {Array<Object>} steps
 */
const useEducationSteps = () => {
  const { t } = useTranslation()
  return React.useMemo(() => {
    return [
      { image: null, topic: EducationTopic.multiparty },
      { image: null, topic: EducationTopic.multiparty },
      { image: null, topic: EducationTopic.multiparty },
      { image: null, topic: EducationTopic.multiparty },
    ].map((step, index) => {
      return {
        ...step,
        title: t(`mpcGuide.${index}.title`),
        text: t(`mpcGuide.${index}.text`),
      }
    })
  }, [])
}

MultiPartyEducation.navigationOptions = {
  ...noHeader,
  ...TransitionPresets.ModalTransition,
}

export default MultiPartyEducation
