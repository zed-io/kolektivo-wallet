import { PrivateKeyStorage, PrivateKeyStorageReactNative } from '../PrivateKeyStorage'
import { CapsuleBaseSigner } from '../CapsuleSigner'

export class ReactNativeCapsuleSigner extends CapsuleBaseSigner {
  protected getPrivateKeyStorage(account: string): PrivateKeyStorage {
    return new PrivateKeyStorageReactNative(account)
  }
}
