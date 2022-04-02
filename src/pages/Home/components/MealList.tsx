import React from 'react'
import { Grid } from '@mui/material'

import { mealsData } from '../../../mealsdata'
import { MealItem } from './MealItem'
import { Meal } from '../../../types'

export function MealList () {
  return (
    <Grid container spacing={3} sx={{ pb: 3 }}>
      {mealsData.meals.map((meal: Meal) =>
        <MealItem key={meal.id} meal={meal} />
      )}
    </Grid>
  )
}
