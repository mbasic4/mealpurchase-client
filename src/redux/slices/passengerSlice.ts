import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Passenger {
  id: number
  age: number
  seat: number
  meals: Array<any>
}

const initialState = {
  currentPassengerId: null as (number | null),
  passengers: [
    {
      id: 1,
      age: 54,
      seat: 23,
      meals: []
    },
    {
      id: 2,
      age: 12,
      seat: 22,
      meals: []
    },
    {
      id: 3,
      age:32,
      seat:77,
      meals: []
    }
  ] as (Array<Passenger>)
}

export const passengerSlice = createSlice({
  name: 'passenger',
  initialState,
  reducers: {
    setCurrentPassenger: (state, action: PayloadAction<number | null>) => {
      if (state.currentPassengerId === action.payload) {
        state.currentPassengerId = null
        return
      }
      state.currentPassengerId = action.payload
    }
  }
})

export const { setCurrentPassenger } = passengerSlice.actions
