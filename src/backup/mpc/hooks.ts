import React from 'react'
import { useTranslation } from 'react-i18next'
import { EducationStep, EducationTopic } from 'src/account/Education'
import { animatedQrScan, educationMpc1, educationMpc2 } from 'src/images/Images'

export enum KeyshareType {
  User = 'User',
  Recovery = 'Recovery',
}

export const useKeyshareEducation = (type: KeyshareType) => {
  const { t } = useTranslation()

  return React.useMemo(() => {
    return [
      { image: animatedQrScan, topic: EducationTopic.multiparty },
      { image: null, topic: EducationTopic.multiparty },
      { image: null, topic: EducationTopic.multiparty },
    ].map((step, index) => {
      return {
        ...step,
        title: t(`mpcGuide.${type}.${index}.title`),
        text: t(`mpcGuide.${type}.${index}.text`),
      }
    })
  }, [])
}

export const useMultiPartyEducation = () => {
  const { t } = useTranslation()

  return React.useMemo(() => {
    const result: Array<EducationStep> = [
      { image: educationMpc1, topic: EducationTopic.multiparty },
      { image: educationMpc2, topic: EducationTopic.multiparty },
    ].map((step, index) => {
      return {
        ...step,
        title: t(`mpcAbout.${index}.title`),
        text: t(`mpcAbout.${index}.text`),
      }
    })
    return result
  }, [])
}
