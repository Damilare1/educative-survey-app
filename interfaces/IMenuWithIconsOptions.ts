import { type QuestionOptionsEnum } from '~/enums/QuestionOptions.enums'
export interface IMenuItem {
  label: string
  icon: string
}

export interface IMenuWithIconsOptions {
  items: IMenuItem[]
  selected: QuestionOptionsEnum
}
