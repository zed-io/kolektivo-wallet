export abstract class ChallengeStorage {
  public publicKey: string
  protected userId: string

  protected abstract generatePair(): string

  protected abstract getPublicKey(): string | undefined

  public abstract signChallenge(message: string): string

  public constructor(userId: string) {
    this.userId = userId
    const publicKey = this.getPublicKey()
    this.publicKey = publicKey ?? this.generatePair()
  }
}

// TODO
export class ChallengeStorageDefault extends ChallengeStorage {
  protected generatePair(): string {
    return ''
  }

  protected getPublicKey(): string | undefined {
    return undefined
  }

  signChallenge(message: string): string {
    return ''
  }
}
