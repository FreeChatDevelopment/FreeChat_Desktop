import {configureStore} from '@reduxjs/toolkit'
import wallet from './modules/wallet'

export const store = configureStore({
  reducer: {
    wallet
  }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch