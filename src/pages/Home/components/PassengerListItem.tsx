import React, { SyntheticEvent, useState } from 'react'
import { ExpandLess as ExpandLessIcon, ExpandMore as ExpandMoreIcon } from '@mui/icons-material'
import { Box, Button, ListItemButton, Paper, Typography } from '@mui/material'
import { useDispatch } from 'react-redux'

import { Passenger, setCurrentPassenger } from '../../../redux/slices/passengerSlice'
import { muiTheme } from '../../../muiTheme'
import { Meal } from '../../../types'
import { calculateAndFormatPriceForSingleMeal, getSelectedMealAndDrink } from './utils'

interface PassengerListItemProps {
  passenger: Passenger,
  isSelected: boolean,
  meals: Array<Meal>
}

export function PassengerListItem ({ passenger, isSelected, meals }: PassengerListItemProps) {
  const [isExpanded, setIsExpanded] = useState(true)
  const dispatch = useDispatch()

  const toggleListItem = (e: SyntheticEvent) => {
    e.stopPropagation()
    setIsExpanded(!isExpanded);
  }

  const handleListItemClick = (passengerId: number) => {
    dispatch(setCurrentPassenger(passengerId))
  }

  const { selectedMeal, selectedDrink } = getSelectedMealAndDrink({ passenger, meals })

  return (
    <Box sx={{ border: isExpanded ? `1px solid ${muiTheme.palette.text.secondary}` : '', mt: 2 }}>
      <ListItemButton
        key={passenger.id}
        selected={isSelected}
        onClick={() => handleListItemClick(passenger.id)}
        sx={{ p: 0 }}
      >
        <Paper
          sx={{ px: 2, width: '100%', backgroundColor: isSelected ? muiTheme.palette.primary.main : 'inherit' }}
          aria-label='Passenger'
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography component='span' sx={{ py: 2 }}>
              <b>{passenger.age < 18 ? 'Child' : 'Adult'}, seat no. {passenger.seat}</b>
            </Typography>
            {!passenger.meal &&
              <Typography component='span'>No meal selected</Typography>
            }
            {!!passenger.meal &&
              <Button variant='text' color='inherit' onClick={toggleListItem}>
                {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </Button>
            }
          </Box>
        </Paper>
      </ListItemButton>
      {(isExpanded && !!selectedMeal) &&
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2, backgroundColor: '#efefef' }} >
          <Typography component='span'>
            {selectedMeal.title} {selectedDrink ? `+ ${selectedDrink.title}` : ''}
          </Typography>
          <Typography component='span'>
            {calculateAndFormatPriceForSingleMeal(selectedMeal, selectedDrink).formattedPrice}
          </Typography>
        </Box>
      }
    </Box>
  )
}
