export interface IMenuItem {
  label: string
  icon: string
  id: string
}

export interface IMenuWithIconsOptions {
  items: IMenuItem[]
  selectedItemId: string
}
