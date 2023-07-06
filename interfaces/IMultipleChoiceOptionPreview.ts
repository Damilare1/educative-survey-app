import { type QuestionOptionsEnum } from '~/enums/QuestionOptions.enums'
import { type IOptions } from './IOptionTypes'

export interface IMultipleChoiceOptionPreview {
  optionType: QuestionOptionsEnum
  options: IOptions[]
  questionIndex: number
}
