import { type IOptions } from './IOptionTypes'

export interface IMultipleChoiceOptionPreview {
  optionType: string
  optionTypes: any[]
  options: IOptions[]
  questionIndex: number
}
