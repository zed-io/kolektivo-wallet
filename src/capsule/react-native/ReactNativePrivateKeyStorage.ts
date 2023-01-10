// TODO make it a real keychain
import AsyncStorage from '@react-native-async-storage/async-storage'
import { PrivateKeyStorage } from '../PrivateKeyStorage'

const TAG = '@CAPSULE/TODO-KEYCHAIN'

export class ReactNativePrivateKeyStorage extends PrivateKeyStorage {
  async getPrivateKey(): Promise<string> {
    const storageString = await AsyncStorage.getItem(TAG)
    const storage = storageString ? JSON.parse(storageString) : {}
    return storage[this.walletId] as string
  }

  async setPrivateKey(key: string): Promise<void> {
    const storageString = await AsyncStorage.getItem(TAG)
    const storage = storageString ? JSON.parse(storageString) : {}
    storage[this.walletId] = key
    return await AsyncStorage.setItem(TAG, JSON.stringify(storage))
  }
}
