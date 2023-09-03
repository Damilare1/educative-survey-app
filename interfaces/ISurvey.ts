import { type IQuestion } from './IQuestionOptionProps'
export interface ISurvey {
  id?: string
  survey_name: string
  survey_description: string
  is_active: boolean
  start_date?: string
  end_date?: string
  admin_id?: number
  questions: IQuestion[]
}
