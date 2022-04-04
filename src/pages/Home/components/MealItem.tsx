import React, { useState } from 'react'
import { Box, Button, Card, CardContent, CardMedia, Chip, Grid, Stack, Typography } from '@mui/material'

import { LocalBar as LocalBarIcon, ShoppingCartCheckout as ShoppingCartCheckoutIcon } from '@mui/icons-material'
import { Meal } from '../../../types'
import { useDispatch, useSelector } from 'react-redux'
import { muiTheme } from '../../../muiTheme'
import { setMealForCurrentPassenger } from '../../../redux/slices/passengerSlice'

interface MealItemProps {
  meal: Meal
}

export function MealItem ({ meal }: MealItemProps) {
  const [ selectedDrinkId, setSelectedDrinkId ] = useState(null as string | null)
  const dispatch = useDispatch()

  const handleSelectDrink = (drinkId: string | null) => {
    if (drinkId === selectedDrinkId) {
      setSelectedDrinkId(null)
    } else {
      setSelectedDrinkId(drinkId)
    }
  }

  let mealPrice = meal.price
  if (selectedDrinkId) {
    mealPrice = mealPrice + meal.drinks.find(drink => drink.id === selectedDrinkId)!.price
  }

  const handleSelectMeal = () => {
    let mealPayload = {
      id: meal.id,
      drinkId: selectedDrinkId,
    }

    dispatch(setMealForCurrentPassenger(mealPayload))
  }

  const currentPassengerId = useSelector(state => state.passenger.currentPassengerId)
  const disabled = !currentPassengerId

  return (
    <Grid item xs={12} md={6} data-testid='meal-item'>
      <Card sx={{ boxShadow: 3, position: 'relative' }}>
        <Box sx={{ position: 'absolute', top: 0, right: 0 }}>
          <Button
            aria-label='Select meal'
            variant='contained'
            size='large'
            sx={{
              display: 'flex',
              alignItems: 'center',
              '&.Mui-disabled': {
                backgroundColor: muiTheme.palette.primary.main,
                color: 'black'
              }
            }}
            onClick={handleSelectMeal}
            disabled={disabled}
          >
            {!disabled && <ShoppingCartCheckoutIcon />}
            <Box component='span' sx={{ pl: 1 }}>
              {mealPrice.toFixed(2)} &euro;
            </Box>
          </Button>
        </Box>
        <MealCardContent
          meal={meal}
          selectedDrinkId={selectedDrinkId}
          setSelectedDrinkId={handleSelectDrink}
        />
      </Card>
    </Grid>
  )
}


interface MealCardContentProps {
  meal: Meal
  selectedDrinkId: null | string
  setSelectedDrinkId: (drinkId: null | string) => void
}

function MealCardContent ({ meal, selectedDrinkId, setSelectedDrinkId }: MealCardContentProps) {
  return (
    <>
      <CardMedia
        component="img"
        height={240}
        image={meal.img}
        alt={meal.title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h5">
          {meal.title} {selectedDrinkId ? `+ drink` : ''}
        </Typography>
        <Typography component='p' sx={labelTextStyle}>
          <b>Starter: </b>{meal.starter}
        </Typography>
        <Typography component='p' sx={labelTextStyle}>
          <b>Desert: </b>{meal.desert}
        </Typography>
        <Typography component='p' sx={labelTextStyle}>
          <b>Selected drink: </b>
          {
            selectedDrinkId ? meal.drinks.find(drink => drink.id === selectedDrinkId)!.title : ''
          }
        </Typography>
        <Stack direction='row' spacing={1} sx={{ mt: 1.4 }}>
          {meal.drinks.map(drink =>
            <Chip
              key={drink.id}
              clickable
              aria-label={`Select drink ${drink.title}`}
              label={drink.title}
              variant={drink.id === selectedDrinkId ? 'filled' : 'outlined'}
              color={drink.id === selectedDrinkId ? 'primary' : 'default'}
              onClick={() => setSelectedDrinkId(drink.id)}
              icon={<LocalBarIcon />}
              sx={{ px: '10px', height: '42px' }}
            />
          )}
        </Stack>
      </CardContent>
    </>
  )
}

const labelTextStyle = { color: 'darkslategray', fontSize: '16px', mb: 1 }
