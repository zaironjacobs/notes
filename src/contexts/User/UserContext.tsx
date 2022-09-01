import { IUser } from '@interfaces'
import { createContext } from 'react'

export const UserContext = createContext<IUser>(undefined as any)
