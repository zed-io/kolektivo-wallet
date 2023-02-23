import { StackScreenProps, TransitionPresets } from '@react-navigation/stack'
import React from 'react'
import { useTranslation } from 'react-i18next'
import Education, { EmbeddedNavBar } from 'src/account/Education'
import { KeyshareType, useKeyshareEducation } from 'src/backup/mpc/hooks'
import { BtnTypes } from 'src/components/Button'
import { noHeader } from 'src/navigator/Headers'
import { navigate } from 'src/navigator/NavigationService'
import { Screens } from 'src/navigator/Screens'
import { StackParamList } from 'src/navigator/types'

const TAG = 'education/keyshare'

type OwnProps = {}
type Props = OwnProps & StackScreenProps<StackParamList, Screens.KeyshareEducationScreen>

const KeyshareEducation = ({ route }: Props) => {
  const { t } = useTranslation()
  const { type: educationType } = route.params
  const steps = useKeyshareEducation(educationType)

  const onComplete = async () => {
    try {
      switch (educationType) {
        case KeyshareType.User:
          navigate(Screens.KeyshareNavigator, {
            screen: Screens.UserKeyshareCode,
          })
          break
        case KeyshareType.Recovery:
          break
        default:
          break
      }
    } catch (error) {
      console.error(TAG, '@onComplete', 'Unable to export keyshare.', error)
    }
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

KeyshareEducation.navigationOptions = {
  ...noHeader,
  ...TransitionPresets.ModalTransition,
}

export default KeyshareEducation
