import { ensureLeading0x, normalizeAddressWith0x } from '@celo/base/lib/address'
import { CeloTx, RLPEncodedTx, Signer } from '@celo/connect'
import { EIP712TypedData } from '@celo/utils/lib/sign-typed-data-utils'
import { encodeTransaction, extractSignature, rlpEncodedTx } from '@celo/wallet-base'
import { NativeModules } from 'react-native'
import Logger from 'src/utils/Logger'

const { CapsuleSignerModule } = NativeModules

const TAG = 'geth/CapsuleSigner'
/**
 * Implements the signer interface using the CapsuleSignerModule
 */
export class CapsuleSigner implements Signer {
  private account: string = ''
  private keyshare: string | undefined = undefined

  constructor(keyshare: string | undefined) {
    // keyshare may be undefined if keygen hasn't been performed yet
    if (keyshare) {
      this.keyshare = keyshare
      this.setAccount()
    }
  }

  async generateKeyshare(): Promise<string> {
    let walletId = '175241aa-0a3d-4a09-a492-54a1ee2058dd'
    let protocolId = '3822a041-ce56-4346-ab61-aa1b51b8d4cc'
    Logger.debug(TAG, 'generateKeyshare ', protocolId)

    const keyshares = await Promise.all([
      CapsuleSignerModule.createAccount(walletId, protocolId, 'USER'),
      CapsuleSignerModule.createAccount(walletId, protocolId, 'RECOVERY'),
    ])
    let userPrivateKeyshare = keyshares[0]
    let recoveryPrivateKeyShare = keyshares[1]
    Logger.debug(TAG, 'CAPSULE KEYGEN ', userPrivateKeyshare)
    Logger.debug(TAG, 'CAPSULE KEYGEN ', recoveryPrivateKeyShare)
    this.keyshare = userPrivateKeyshare
    // this.setAccount()
    return userPrivateKeyshare
  }

  getKeyshare(): string | undefined {
    return this.keyshare
  }

  async setAccount() {
    const address = await CapsuleSignerModule.getAddress(this.keyshare)
    this.account = normalizeAddressWith0x(address)
  }

  async signRawTransaction(tx: CeloTx) {
    if (!this.keyshare || !this.account) {
      throw new Error(
        'Cannot signRawTransaction from CapsuleSigner before keygeneration or initialization'
      )
    }
    if (normalizeAddressWith0x(tx.from! as string) !== this.account) {
      throw new Error(`CapsuleSigner(${this.account}) cannot sign tx with 'from' ${tx.from}`)
    }
    const encodedTx = rlpEncodedTx(tx)
    const signature = await this.signTransaction(0, encodedTx)
    return encodeTransaction(encodedTx, signature)
  }

  async signTransaction(
    // addToV (chainId) is ignored here because geth will
    // build it based on its configuration
    addToV: number,
    encodedTx: RLPEncodedTx
  ): Promise<{ v: number; r: Buffer; s: Buffer }> {
    const { gasPrice } = encodedTx.transaction
    if (gasPrice === '0x0' || gasPrice === '0x' || gasPrice === '0' || !gasPrice) {
      // Make sure we don't sign and send transactions with 0 gas price
      // This resulted in those TXs being stuck in the txpool for nodes running geth < v1.5.0
      throw new Error(`Preventing sign tx with 'gasPrice' set to '${gasPrice}'`)
    }

    let protocolId = CapsuleSignerModule.getProtocolId()
    Logger.debug(TAG, 'signTransaction Capsule protocolId', protocolId)
    Logger.debug(TAG, 'signTransaction Capsule tx', this.hexToBase64(encodedTx.rlpEncode))
    const signedTxBase64 = await CapsuleSignerModule.sendTransaction(
      this.keyshare,
      protocolId,
      this.hexToBase64(encodedTx.rlpEncode)
    )
    return extractSignature(this.base64ToHex(signedTxBase64))
  }

  async signPersonalMessage(data: string): Promise<{ v: number; r: Buffer; s: Buffer }> {
    throw new Error('Not implemented')
    // Logger.info(`${TAG}@signPersonalMessage`, `Signing ${data}`)
    // const hash = ethUtil.hashPersonalMessage(Buffer.from(data.replace('0x', ''), 'hex'))
    // const signatureBase64 = await this.geth.signHash(hash.toString('base64'), this.account)
    // return ethUtil.fromRpcSig(this.base64ToHex(signatureBase64))
  }

  async signTypedData(
    typedData: EIP712TypedData,
    address: string = this.account
  ): Promise<{ v: number; r: Buffer; s: Buffer }> {
    throw new Error('Not implemented')
    // Logger.info(`${TAG}@signTypedData`, `Signing typed data`)
    // const hash = generateTypedDataHash(typedData)
    // const signatureBase64 = await this.geth.signHash(hash.toString('base64'), address)
    // return ethUtil.fromRpcSig(this.base64ToHex(signatureBase64))
  }

  getNativeKey = () => this.account

  async decrypt(ciphertext: Buffer): Promise<Buffer> {
    // TODO
    return Buffer.from('', 'base64')
  }

  async computeSharedSecret(publicKey: string): Promise<Buffer> {
    // TODO
    return Buffer.from('', 'base64')
  }

  hexToBase64(hex: string) {
    return Buffer.from(hex.replace('0x', ''), 'hex').toString('base64')
  }

  base64ToHex(base64: string) {
    return ensureLeading0x(Buffer.from(base64, 'base64').toString('hex'))
  }
}
