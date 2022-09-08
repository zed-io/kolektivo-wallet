import { map } from 'lodash'
import * as RNFS from 'react-native-fs'
import PDFMaker, { Pdf } from 'react-native-html-to-pdf'
import { FeedTokenTransaction } from 'src/transactions/feed/TransactionFeed'
import { TokenTransfer } from 'src/transactions/types'
import Logger from 'src/utils/Logger'

const TAG = 'PdfUtil'

export const getPdfPath = (type: string) => {
  return `${RNFS.DocumentDirectoryPath}/${type}`
}

export const getPdfFile = (type: string) => {
  return `${getPdfPath(type)}/${Date.now()}.pdf`
}

export const getFolder = (filePath: string) => {
  return filePath.substr(0, filePath.lastIndexOf('/'))
}

export const createTransactionSummary = async (
  transactions: FeedTokenTransaction[]
): Promise<Pdf> => {
  const table = (value: string) => {
    return `<table>${value}</table>`
  }

  const row = (transaction: TokenTransfer) => {
    const { type, timestamp, amount } = transaction
    return `<tr><td>${type}</td><td>${timestamp}</td><td>${amount.value}</td></tr>`
  }

  const content = table(
    map(transactions, (transaction: TokenTransfer) => row(transaction)).join('')
  )

  const options = {
    html: content,
    fileName: new Date(Date.now())
      .toLocaleString('default', { month: 'long', year: 'numeric' })
      .replace(/ /g, ''),
    directory: 'Documents',
  }

  try {
    const file = await PDFMaker.convert(options)
    return file
  } catch (e) {
    throw e
  }
}

export const writePdfFile = async (content: Pdf) => {
  try {
    const fileName = Date.now().toString()
    const file = getPdfFile(fileName)
    if (!content.base64) throw new Error('Pdf file contents corrupted.')
    await RNFS.mkdir(getFolder(file))
    Logger.info(TAG, '@writePdfFile Wrote Documents Folder', file)
    await RNFS.writeFile(file, content.base64, 'base64')
  } catch (error: any) {
    Logger.error(TAG, '@writePdfFile Unable to write PDF', error)
    throw error
  }
}
