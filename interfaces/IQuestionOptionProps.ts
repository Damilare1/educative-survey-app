import { type IOptions } from './IOptionTypes'
export interface IQuestion {
  title: string
  options: IOptions[]
}

export interface IQuestionOptionProps {
  question: IQuestion
  isAdmin: boolean
}
