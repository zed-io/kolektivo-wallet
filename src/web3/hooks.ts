import { useAsync } from 'react-async-hook'
import { useDispatch, useSelector } from 'react-redux'
import { getWalletAsync } from 'src/web3/contracts'
import { capsuleAccountSelector } from 'src/web3/selectors'
import { ZedWallet } from 'src/web3/wallet'

const TAG = 'useCapsule'

export const useCapsule = () => {
  const dispatch = useDispatch()
  const capsuleAccountId = useSelector(capsuleAccountSelector)

  const authenticate = async (email: string) => {
    // @todo Create user id with email
    // @todo Cache email and id
    // @todo Navigate to email verification
  }

  const verify = async (code: string) => {
    // @todo Get email or id from cache
    // @todo Verify the user and code
    // @todo Navigate to Name and Picture
  }

  const loginWithKeyshare = async (email: string, code: string) => {
    // @todo Call recovery verification with email, code,
    // @todo Cache email and id
    // @todo Navigate to Keyshare Scan
  }

  return { authenticate, verify }
}
