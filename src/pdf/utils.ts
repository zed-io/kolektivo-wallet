import { map } from 'lodash'
import PDFMaker, { Pdf } from 'react-native-html-to-pdf'
import { FeedTokenTransaction } from 'src/transactions/feed/TransactionFeed'
import { TokenTransfer } from 'src/transactions/types'

export const createTransactionSummary = async (
  transactions: FeedTokenTransaction[]
): Promise<Pdf> => {
  const table = (value: string) => {
    return `<table>${value}</table>`
  }

  const row = (transaction: TokenTransfer) => {
    const { type, timestamp, amount } = transaction
    return `<tr>
        <td>${type}</td>
        <td>${timestamp}</td>
        <td>${amount}</td>
      </tr>`
  }

  const content = table(
    map(transactions, (transaction: TokenTransfer) => row(transaction)).join('')
  )

  const options = {
    html: content,
    fileName: 'test',
    directory: 'Documents',
  }

  const file = await PDFMaker.convert(options)
  return file
}
