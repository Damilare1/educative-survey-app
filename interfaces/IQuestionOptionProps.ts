import { survey } from './../pages/__tests__/mocks/survey';
import { type IOptions } from './IOptionTypes'

export interface IResponse {
  question_id: string
  option_id: string
  survey_id: string
}

export interface IQuestion {
  id?: string
  question: string
  input_type_id: string
  options: IOptions[]
  response?: IResponse[]
}

export interface IQuestionOptionProps {
  question: IQuestion
  isAdmin: boolean
  preview: boolean
  index: number
  inputOptionTypes: any[]
}
