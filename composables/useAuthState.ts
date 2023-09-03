import { type IUseAuthState } from '../interfaces/IAuthState'

export const useAuthState = (): Ref<IUseAuthState> => useState<IUseAuthState>('auth', () => ({
  isAuthenticated: false,
  userName: '',
  email: ''
}))
