import React from 'react'
import { Box, Button, Card, CardContent, CardMedia, Chip, Grid, Stack, Typography } from '@mui/material'

import { Add as AddIcon, LocalBar as LocalBarIcon } from '@mui/icons-material'
import { Drink, Meal } from '../../../types'

interface MealItemProps {
  meal: Meal
}

export function MealItem ({ meal }: MealItemProps) {
  return (
    <Grid item xs={12} md={6} data-testid='meal-item'>
      <Card sx={{ boxShadow: 3, position: 'relative' }}>
        <Box sx={{ position: 'absolute', top: 0, right: 0 }}>
          <Button aria-label='Add meal' variant='contained' size='large' sx={{ display: 'flex', alignItems: 'center' }} onClick={e => { console.log(e) }}>
            <AddIcon />
            <Box component='span' sx={{ pl: 1 }}>
              {meal.price} &euro;
            </Box>
          </Button>
        </Box>
        <MealCardContent meal={meal} />
      </Card>
    </Grid>
  )
}


interface MealCardContentProps {
  meal: Meal
}

function MealCardContent ({ meal }: MealCardContentProps) {
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
          {meal.title}
        </Typography>
        <Typography component='p' sx={labelTextStyle}>
          <b>Starter: </b>{meal.starter}
        </Typography>
        <Typography component='p' sx={labelTextStyle}>
          <b>Desert: </b>{meal.desert}
        </Typography>
        <Typography component='p' sx={labelTextStyle}>
          <b>Selected drink: </b>
        </Typography>
        <Stack direction='row' spacing={1}>
          {meal.drinks.map((drink: Drink) =>
            <Chip
              key={drink.id}
              clickable
              aria-label="Select drink"
              variant='outlined'
              label={drink.title}
              sx={{ px: '10px', height: '42px' }}
              onClick={(e: any) => console.log(e)}
              icon={<LocalBarIcon />}
            />
          )}
        </Stack>
      </CardContent>
    </>
  )
}

const labelTextStyle = { color: 'darkslategray', fontSize: '16px', mb: 1 }
