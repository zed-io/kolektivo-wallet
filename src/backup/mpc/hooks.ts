import React from 'react'
import { useTranslation } from 'react-i18next'
import { EducationTopic } from 'src/account/Education'
import { animatedQrScan } from 'src/images/Images'

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
