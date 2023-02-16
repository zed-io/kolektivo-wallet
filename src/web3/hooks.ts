import { createUser, verifyEmail } from '@usecapsule/react-native-wallet'
import { login, verifyLogin } from '@usecapsule/react-native-wallet/src/helpers'
import { useDispatch, useSelector } from 'react-redux'
import { KeyshareType } from 'src/backup/mpc/hooks'
import { navigate } from 'src/navigator/NavigationService'
import { Screens } from 'src/navigator/Screens'
import Logger from 'src/utils/Logger'
import { setCapsuleIdentity } from 'src/web3/actions'
import { capsuleAccountSelector } from 'src/web3/selectors'

const TAG = 'useCapsule'

export const useCapsule = () => {
  const dispatch = useDispatch()
  const { email: cachedEmail, id: cachedId } = useSelector(capsuleAccountSelector)

  const authenticate = async (email: string) => {
    try {
      const { userId } = await createUser({ email })
      dispatch(setCapsuleIdentity(email, userId))
      navigate(Screens.CapsuleEmailVerification)
    } catch (error: any) {
      Logger.error(TAG, '@authenticate Unable to authenticate', error)
    }
  }

  const verify = async (code: string) => {
    try {
      await verifyEmail(cachedId!, { verificationCode: code })
      navigate(Screens.NameAndPicture)
    } catch (error: any) {
      Logger.error(TAG, '@authenticate Unable to verify', error)
    }
  }

  const loginWithKeyshare = async (email: string, code: string) => {
    try {
      // @todo Call recovery veification with email, code,
      await login(email)
      const { data: loginResponse } = await verifyLogin(code)
      dispatch(setCapsuleIdentity(email, loginResponse.id))
      // @todo Navigate to QR Scanner
      navigate(Screens.KeyshareNavigator, {
        screen: Screens.KeyshareScanner,
      })
    } catch (error: any) {
      Logger.error(TAG, '@loginWithKeyshare Unable to login', error)
    }
  }

  return { authenticate, verify, loginWithKeyshare }
}

/**
 * This hook is used to determine the validity and type of a
 * given keyshare that is scanned by the user.
 *
 * @returns { Function } processKeysharePayload(keyshare: any)
 */
export const useKeyshare = () => {
  /**
   * This function takes a keyshare payload and returns the type
   * of keyshare, or null if the keyshare is invalid.
   * @param keyshare any
   * @returns {KeyshareType} type
   */
  const processKeysharePayload = (keyshare: any) => {
    return KeyshareType.User
  }

  return { processKeysharePayload }
}
