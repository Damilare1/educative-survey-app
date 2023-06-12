export const useCounter = (): Ref<number> => useState<number>('counter', () => 0)
export const useColor = (): Ref<string> => useState<string>('color', () => 'pink')
