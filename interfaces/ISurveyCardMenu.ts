export interface ISurveyCardMenu {
  label: string
  isAdminAction: boolean
  isLink: boolean
  action?: () => void
}
