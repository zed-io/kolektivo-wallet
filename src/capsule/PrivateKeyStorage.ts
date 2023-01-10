export abstract class PrivateKeyStorage {
  public walletId: string

  public abstract setPrivateKey(key: string): Promise<void>

  public abstract getPrivateKey(): Promise<string>

  public constructor(walletId: string) {
    this.walletId = walletId
  }
}
