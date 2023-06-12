import { reactive } from 'vue'
import type { IModalsDataStore, IPayloadDataStore, IDataStore, IDialogDataStore } from '../interfaces/IModalsDataStore'

const dialogInitial = {
  show: false,
  name: ''
}
const dialog: IDialogDataStore = reactive({ ...dialogInitial })

const dataInitial = { payload: {} }
const data: IDataStore = reactive({ ...dataInitial })

export const useModals = (): IModalsDataStore => {
  const toggleDialog = (): void => {
    dialog.show = !dialog.show
  }

  const setData = (payload: IPayloadDataStore): void => {
    data.payload = payload
  }

  const reset = (): void => {
    Object.assign(dialog, dialogInitial)
    Object.assign(data, dataInitial)
  }
  return { dialog, data, toggleDialog, setData, reset }
}
