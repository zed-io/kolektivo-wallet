import { useDispatch, useSelector } from 'react-redux'
import { createUser, verifyEmail } from 'src/capsule/helpers'
import { navigate } from 'src/navigator/NavigationService'
import { Screens } from 'src/navigator/Screens'
import Logger from 'src/utils/Logger'
import { initiateCapsuleAuth } from 'src/web3/actions'
import { capsuleAccountSelector } from 'src/web3/selectors'

const TAG = 'useCapsule'

export const useCapsule = () => {
  const dispatch = useDispatch()
  const capsuleAccountId = useSelector(capsuleAccountSelector)

  const authenticate = async (email: string): Promise<void> => {
    try {
      const { userId } = await createUser({ email })
      if (userId) {
        dispatch(initiateCapsuleAuth(userId, false))
        // @todo Navigate to email verification
      }
    } catch (error) {
      Logger.error(TAG, '@authenticate', error as any)
    }
  }

  const verify = async (code: string): Promise<void> => {
    try {
      if (capsuleAccountId) {
        const response = await verifyEmail(capsuleAccountId, { verificationCode: code })
        Logger.debug(TAG, '@verify', 'response', JSON.stringify(response))
        dispatch(initiateCapsuleAuth(capsuleAccountId, true))
        navigate(Screens.NameAndPicture)
      }
    } catch (error) {
      Logger.error(TAG, '@verify', error as any)
    }
  }

  return [authenticate, verify]
}
