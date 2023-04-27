import { createUser, verifyEmail } from '@usecapsule/react-native-wallet'
import { CapsuleBaseWallet } from '@usecapsule/react-native-wallet/src/CapsuleWallet'
import {
  login,
  recoveryVerification,
  verifyLogin,
} from '@usecapsule/react-native-wallet/src/helpers'
import { uploadKeyshare } from '@usecapsule/react-native-wallet/src/transmissionUtils'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeAccount } from 'src/account/actions'
import { showError } from 'src/alert/actions'
import { ErrorMessages } from 'src/app/ErrorMessages'
import { navigate } from 'src/navigator/NavigationService'
import { Screens } from 'src/navigator/Screens'
import Logger from 'src/utils/Logger'
import { refreshCapsuleKeyshare, setCapsuleIdentity } from 'src/web3/actions'
import { getWalletAsync } from 'src/web3/contracts'
import { accountAddressSelector, capsuleAccountSelector } from 'src/web3/selectors'

const TAG = 'useCapsule'

export const SESSION_TIMEOUT = 5 * 60 * 1000

export const useCapsule = () => {
  const dispatch = useDispatch()
  const address = useSelector(accountAddressSelector)
  const [cachedSecret, setSecret] = useState<any>(null)
  const { email: cachedEmail, id: cachedId } = useSelector(capsuleAccountSelector)
  const [loading, setLoading] = useState(false)
  const authenticate = async (email: string) => {
    try {
      setLoading(true)
      const { userId } = await createUser({ email })
      dispatch(setCapsuleIdentity(email, userId))
      setLoading(false)
      navigate(Screens.CapsuleEmailVerification, {})
    } catch (error: any) {
      setLoading(false)
      Logger.error(TAG, '@authenticate Unable to authenticate', error)
      dispatch(showError(ErrorMessages.CAPSULE_ENDPOINT_FAILED, 2000))
    }
  }

  const verify = async (code: string) => {
    try {
      setLoading(true)
      await verifyEmail(cachedId!, { verificationCode: code })
      dispatch(initializeAccount())
      setLoading(false)
      navigate(Screens.NameAndPicture)
    } catch (error: any) {
      setLoading(false)
      Logger.error(TAG, '@verify Unable to verify', error)
      dispatch(showError(ErrorMessages.CAPSULE_VERIFY_EMAIL_FAILED, 5000))
    }
  }

  const initiateLogin = async (email: string) => {
    try {
      await login(email)
      dispatch(setCapsuleIdentity(email, cachedId || ''))
    } catch (error: any) {
      Logger.error(TAG, '@initiateLogin Unable to login', error)
      Logger.error(TAG, '@initiateLogin Unable to login', error.response.data)
    }
    navigate(Screens.CapsuleEmailVerification, { isExistingUser: true })
  }

  const loginWithKeyshare = async (code: string) => {
    try {
      setLoading(true)
      if (!cachedEmail) {
        setLoading(false)
        return
      }
      const { data: loginResponse } = await verifyLogin(code)
      dispatch(setCapsuleIdentity(cachedEmail, loginResponse.userId))
      setLoading(false)
      navigate(Screens.KeyshareScanner)
    } catch (error: any) {
      setLoading(false)
      Logger.error(TAG, '@loginWithKeyshare Unable to login', error)
      Logger.error(TAG, '@loginWithKeyshare Unable to login', error.response.data)
      dispatch(showError(ErrorMessages.CAPSULE_VERIFY_EMAIL_FAILED, 5000))
    }
  }

  const encryptAndShareSecret = async () => {
    const refreshSecret = async () => {
      try {
        setLoading(true)
        const wallet: CapsuleBaseWallet = await getWalletAsync()
        if (!address) throw new Error('Account not yet initialized.')
        const secret = await uploadKeyshare(wallet, address)
        setLoading(false)
        setSecret(secret)
      } catch (error: any) {
        setLoading(false)
        Logger.error(`${TAG} @encryptAndShareSecret Failed`, JSON.stringify(error))
      }
    }
    await refreshSecret()
    return {
      refreshSecret,
    }
  }

  const refreshRecoveryKeyshare = async (code: string) => {
    try {
      setLoading(true)
      Logger.debug(TAG, '@refreshRecoveryKeyshare', 'Start Verification', cachedId, code)
      if (!cachedId || !cachedEmail) {
        setLoading(false)
        Logger.debug(TAG, '@refreshRecoveryKeyshare', 'Email not cached')
        return
      }
      await recoveryVerification(cachedEmail, code)
      setLoading(false)
      dispatch(refreshCapsuleKeyshare())
    } catch (error: any) {
      setLoading(false)
      Logger.debug(TAG, '@refreshRecoveryKeyshare Failed', error)
    }
  }

  return {
    loading,
    authenticate,
    verify,
    initiateLogin,
    loginWithKeyshare,
    encryptAndShareSecret,
    userKeyshareSecret: cachedSecret,
    refreshRecoveryKeyshare,
  }
}
