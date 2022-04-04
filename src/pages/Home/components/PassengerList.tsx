import React from 'react'
import { FlightTakeoff as FlightTakeOffIcon } from '@mui/icons-material'
import { CircularProgress, List, Stack, Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import { useMealListQuery } from '../../../redux/slices/apiSlice'
import { PassengerListItem } from './PassengerListItem'
import { calculateAndFormatTotalPrice } from './utils'

export function PassengerList () {
  const currentPassengerId = useSelector(state => state.passenger.currentPassengerId)
  const passengers = useSelector(state => state.passenger.passengers)

  const mealIds = passengers.filter(passenger => passenger.meal).map(passenger => passenger.meal?.id)

  const { data, error, isFetching } = useMealListQuery({ mealIds }, { skip: !mealIds.length })

  if (isFetching) {
    return <CircularProgress />
  }

  if (error) {
    return <div>Something went wrong</div>
  }

  const meals = data ? data.data : []

  return (
    <>
      <Typography variant='h6' sx={{ display: 'flex', alignItems: 'center' }}>
        <FlightTakeOffIcon fontSize='medium' sx={{ pr: 1 }} /> Passengers
      </Typography>
      <Stack>
        <List component="div" aria-label="Passenger list">
          {passengers.map(passenger =>
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
