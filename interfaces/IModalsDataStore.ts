import type { UnwrapNestedRefs } from 'vue'

export interface IDialogDataStore {
  show: boolean
  name: string
}

export interface IPayloadDataStore {
  message?: string
  action?: () => void
  text?: string
  id?: number | string
}

export interface IDataStore {
  payload: IPayloadDataStore
}

export interface IModalsDataStore {
  dialog: UnwrapNestedRefs<IDialogDataStore>
  data: UnwrapNestedRefs<IDataStore>
  toggleDialog: () => void
  setData: (payload: IPayloadDataStore) => void
  reset: () => void
}
