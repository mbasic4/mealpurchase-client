import React, { useState } from 'react'
import { Box, Button, Grid, SwipeableDrawer } from '@mui/material'
import { ExpandLess as ExpandLessIcon } from '@mui/icons-material'

import { PassengerList } from './PassengerList'
import { useSelector } from 'react-redux'

export function PassengerListContainer () {
  return (
    <>
      <DesktopContainer />
      <MobileContainer />
    </>
  )
}

function DesktopContainer () {
  return (
    <Grid item md={4} sx={{ display: { xs: 'none', md: 'block' } }}>
      <PassengerList />
    </Grid>
  )
}

function MobileContainer () {
  const [ drawerOpen, setDrawerOpen ] = useState(false)

  const currentPassengerId = useSelector(state => state.passenger.currentPassengerId)
  const passengers = useSelector(state => state.passenger.passengers)
  
  const currentPassenger = passengers.find(passenger => passenger.id === currentPassengerId)

  return (
    <Box sx={{ display: { xs: 'block', md: 'none' } }}>
      <Button
        fullWidth
        variant='contained'
        color='primary'
        size='large'
        aria-label='Show passenger list'
        onClick={() => setDrawerOpen(!drawerOpen)}
        sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}
        endIcon={<ExpandLessIcon fontSize='large' />}
      >
        {!currentPassengerId
          ? 'No passenger selected'
          : `${currentPassenger!.age < 18 ? 'Child' : 'Adult'}, seat no. ${currentPassenger!.seat}`
        }
      </Button>
      <SwipeableDrawer
        anchor='bottom'
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onOpen={() => setDrawerOpen(true)}
      >
        <Box sx={{ p: 1.5, maxHeight: 'calc(100vh - 200px)' }}>
          <PassengerList />
        </Box>
      </SwipeableDrawer>
    </Box>
  )
}
