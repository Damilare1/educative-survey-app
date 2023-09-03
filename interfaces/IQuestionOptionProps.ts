import { type IOptions } from './IOptionTypes'

export interface IQuestion {
  id?: number
  question: string
  input_type_id: string
  options: IOptions[]
}

export interface IQuestionOptionProps {
  question: IQuestion
  isAdmin: boolean
  preview: boolean
  index: number
  inputOptionTypes: any[]
}
