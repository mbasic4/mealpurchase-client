import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface PassengerMeal {
  id: string
  drinkId: string | null
}

export interface Passenger {
  id: number
  age: number
  seat: number
  meal: PassengerMeal | null
}

const initialState = {
  currentPassengerId: null as (number | null),
  passengers: [
    {
      id: 1,
      age: 54,
      seat: 23,
      meal: null as null | PassengerMeal
    },
    {
      id: 2,
      age: 12,
      seat: 24,
      meal: null as null | PassengerMeal
    },
    {
      id: 3,
      age: 32,
      seat: 54,
      meal: null as null | PassengerMeal
    },
    {
      id: 4,
      age: 60,
      seat: 77,
      meal: null as null | PassengerMeal
    }
  ] as (Array<Passenger>)
}

interface MealPayload {
  id: string
  drinkId: string | null
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
    },
    setMealForCurrentPassenger: (state, action: PayloadAction<MealPayload>) => {
      state.passengers.find(passenger => passenger.id === state.currentPassengerId)!.meal = action.payload
    }
  }
})

export const { setCurrentPassenger, setMealForCurrentPassenger } = passengerSlice.actions
