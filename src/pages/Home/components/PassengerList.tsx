import React from 'react'
import { FlightTakeoff as FlightTakeOffIcon } from '@mui/icons-material'
import { CircularProgress, List, Stack, Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import { useGetMealListQuery } from '../../../redux/slices/apiSlice'
import { PassengerListItem } from './PassengerListItem'
import { calculateAndFormatTotalPrice } from './utils'

export function PassengerList () {
  const currentPassengerId = useSelector(state => state.passenger.currentPassengerId)
  const passengers = useSelector(state => state.passenger.passengers)

  const { data: meals, error, isLoading } = useGetMealListQuery()

  if (isLoading) {
    return <CircularProgress />
  }

  if (error || !meals) {
    return <div>Something went wrong</div>
  }

  return (
    <>
      <Typography variant='h6' sx={{ display: 'flex', alignItems: 'center' }}>
        <FlightTakeOffIcon fontSize='medium' sx={{ pr: 1 }} /> Passengers
      </Typography>
      <Stack>
        <List component="div" aria-label="Passenger list">
          {passengers.map((passenger: any) =>
            <PassengerListItem
              key={passenger.id}
              passenger={passenger}
              isSelected={passenger.id === currentPassengerId}
              meals={meals}
            />
          )}
        </List>
      </Stack>
      <Typography component='div' sx={{ textAlign: 'right', fontWeight: 'bold' }}>
        {calculateAndFormatTotalPrice({ passengers, meals }).formattedPrice}
      </Typography>
    </>
  )
}
