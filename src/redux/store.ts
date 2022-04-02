import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'

import { apiSlice } from './slices/apiSlice'

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()

declare global {
  type RootState = ReturnType<typeof store.getState>
}

declare module 'react-redux' {
  interface DefaultRootState extends RootState { }
}
