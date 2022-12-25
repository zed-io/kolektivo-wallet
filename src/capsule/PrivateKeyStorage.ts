export abstract class PrivateKeyStorage {
  public walletId: string

  public abstract setPrivateKey(key: string): undefined

  public abstract getPrivateKey(): string

  public constructor(walletId: string) {
    this.walletId = walletId
  }
}

// TODO
export class PrivateKeyStorageDefault extends PrivateKeyStorage {
  getPrivateKey(): string {
    return ''
  }

  setPrivateKey(key: string): undefined {
    return undefined
  }
}
