import React from 'react'
import { Grid, CircularProgress } from '@mui/material'

import { MealItem } from './MealItem'
import { useGetMealListQuery } from '../../../redux/slices/apiSlice'

interface MealListProps {
  currentMealCategory: string
}

export function MealList ({ currentMealCategory }: MealListProps) {
  const { data: meals, error, isLoading } = useGetMealListQuery()

  if (isLoading) {
    return <CircularProgress />
  }

  if (error || !meals) {
    return <div>Something went wrong</div>
  }

  let mealList = meals
  if (currentMealCategory !== 'all') {
    mealList = meals.filter(meal => meal.labels.includes(currentMealCategory))
  }

  return (
    <Grid container spacing={3} sx={{ pb: 3 }} >
      {mealList.map(meal =>
        <MealItem key={meal.id} meal={meal} />
      )}
    </Grid>
  )
}
