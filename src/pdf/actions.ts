export enum Actions {
  GENERATE_PDF = 'PDF/GENERATING_PDF',
  SAVING_PDF = 'PDF/SAVING_PDF',
  OPENING_PDF = 'PDF/OPENING_PDF',
}

export interface GeneratePdfAction {
  type: Actions.GENERATE_PDF
  content: any
}

export interface SavePdfAction {
  type: Actions.SAVING_PDF
  filePath: string
}

export interface OpenPdfAction {
  type: Actions.OPENING_PDF
}

export const generatePdf = (content: any): GeneratePdfAction => ({
  type: Actions.GENERATE_PDF,
  content,
})

export const savePdf = (filePath: string): SavePdfAction => ({
  type: Actions.SAVING_PDF,
  filePath,
})

export const openPdf = (): OpenPdfAction => ({
  type: Actions.OPENING_PDF,
})

export type ActionTypes = GeneratePdfAction | OpenPdfAction | SavePdfAction
