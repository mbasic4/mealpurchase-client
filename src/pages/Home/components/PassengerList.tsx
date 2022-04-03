import React from 'react'
import { FlightTakeoff as FlightTakeOffIcon } from '@mui/icons-material'
import { List, ListItemButton, Paper, Stack, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentPassenger } from '../../../redux/slices/passengerSlice'


export function PassengerList () {
  const dispatch = useDispatch()

  const handleListItemClick = (event: React.MouseEvent, passengerId: number) => {
    dispatch(setCurrentPassenger(passengerId))
  }

  const currentPassengerId = useSelector(state => state.passenger.currentPassengerId)
  const passengers = useSelector(state => state.passenger.passengers)

  return (
    <>
      <Typography variant='h6' sx={{ display: 'flex', alignItems: 'center' }}>
        <FlightTakeOffIcon fontSize='medium' sx={{ pr: 1 }} /> Passengers
      </Typography>
      <Stack spacing={2}>
        <List component="div" aria-label="Passenger list">
          {passengers.map((passenger: any) =>
            <ListItemButton
              key={passenger.id}
              selected={passenger.id === currentPassengerId}
              onClick={(event) => handleListItemClick(event, passenger.id)}
            >
              <Paper
                sx={{ p: 2, width: '100%', backgroundColor: passenger.id === currentPassengerId ? '#fbfb73' : 'inherit' }}
                aria-label='Passenger'
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography component='span'>
                    <b>{passenger.age < 18 ? 'Child' : 'Adult'}, seat no. {passenger.seat}</b>
                  </Typography>
                  <Typography component='span'>
                    {!!passenger.meals.length ? 'Select meal' : 'No meals selected'}
                  </Typography>
                </Box>
              </Paper>
            </ListItemButton>
          )}
        </List>
      </Stack>
    </>
  )
}