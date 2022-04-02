import React from 'react'
import { Grid, CircularProgress } from '@mui/material'

import { MealItem } from './MealItem'
import { useGetMealListQuery } from '../../../redux/slices/apiSlice'

export function MealList () {
  const { data: meals, error, isLoading } = useGetMealListQuery()

  if (isLoading) {
    return <CircularProgress />
  }

  if (error || !meals) {
    return <div>Something went wrong</div>
  }

  return (
    <Grid container spacing={3} sx={{ pb: 3 }}>
      {meals.map(meal =>
        <MealItem key={meal.id} meal={meal} />
      )}
    </Grid>
  )
}
