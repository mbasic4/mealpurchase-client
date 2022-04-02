import React from 'react'
import { FlightTakeoff as FlightTakeOffIcon } from '@mui/icons-material'
import { Paper, Stack, Typography } from '@mui/material'
import { Box } from '@mui/system'

const passengers = [
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
]

export function PassengerList () {
  return (
    <>
      <Typography variant='h6' sx={{ display: 'flex', alignItems: 'center' }}>
        <FlightTakeOffIcon fontSize='medium' sx={{ pr: 1 }} /> Passengers
      </Typography>
      <Stack spacing={2}>
        {passengers.map((passenger: any) =>
          <Paper key={passenger.id} sx={{ p: 2 }} aria-label='Passenger'>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography component='span'>
                <b>{passenger.age < 18 ? 'Child' : 'Adult'}, seat no. {passenger.seat}</b>
              </Typography>
              <Typography component='span'>
                {!!passenger.meals.length ? 'Select meal' : 'No meals selected'}
              </Typography>
            </Box>
          </Paper>
        )}
      </Stack>
    </>
  )
}