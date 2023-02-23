import { AddressType, E164PhoneNumberType } from '@celo/utils/lib/io'
import { isLeft } from 'fp-ts/lib/Either'
import {
  keyof as ioKeyof,
  string as ioString,
  type as ioType,
  TypeOf as ioTypeOf,
  undefined as ioUndefined,
  union as ioUnion,
} from 'io-ts'
import { PathReporter } from 'io-ts/lib/PathReporter'
import { KeyshareType } from 'src/backup/mpc/hooks'
import { LocalCurrencyCode } from 'src/localCurrency/consts'
import { parse } from 'url'

export const UriDataType = ioType({
  address: AddressType,
  displayName: ioUnion([ioUndefined, ioString]),
  e164PhoneNumber: ioUnion([ioUndefined, E164PhoneNumberType]),
  currencyCode: ioUnion([ioUndefined, ioKeyof(LocalCurrencyCode)]),
  amount: ioUnion([ioUndefined, ioString]),
  comment: ioUnion([ioUndefined, ioString]),
  token: ioUnion([ioUndefined, ioString]),
})
export type UriData = ioTypeOf<typeof UriDataType>

export const uriDataFromJson = (obj: object): UriData => {
  const either = UriDataType.decode(obj)
  if (isLeft(either)) {
    throw new Error(PathReporter.report(either)[0])
  }
  return either.right
}
export const uriDataFromUrl = (url: string) => uriDataFromJson(parse(decodeURI(url), true).query)

enum UriMethod {
  pay = 'pay',
}

// removes undefined parameters for serialization
export const stripUndefined = (obj: object) => JSON.parse(JSON.stringify(obj))

export const urlFromUriData = (data: Partial<UriData>, method: UriMethod = UriMethod.pay) => {
  const params = new URLSearchParams(stripUndefined(data))
  return encodeURI(`kolektivo://wallet/${method.toString()}?${params.toString()}`)
}

export const KeyshareUriDataType = ioType({
  secret: ioUnion([ioUndefined, ioString]),
})

export type KeyshareUriData = ioTypeOf<typeof KeyshareUriDataType>

const keyshareDataFromJson = (obj: Object): KeyshareUriData => {
  const either = KeyshareUriDataType.decode(obj)
  if (isLeft(either)) {
    throw new Error(PathReporter.report(either)[0])
  }
  return either.right
}

export const keyshareDataFromUrl = (url: string) =>
  keyshareDataFromJson(parse(decodeURI(url), true).query)

export const urlFromKeyshareData = (
  data: Partial<KeyshareUriData>,
  type: KeyshareType = KeyshareType.User
) => {
  const params = new URLSearchParams(stripUndefined(data))
  return encodeURI(`kolektivo://keyshare/${type.toString()}?${params.toString()}`)
}
