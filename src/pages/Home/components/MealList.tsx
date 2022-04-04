import React, { ChangeEvent, useState } from 'react'
import { Grid, CircularProgress, Pagination } from '@mui/material'

import { MealItem } from './MealItem'
import { useMealListQuery } from '../../../redux/slices/apiSlice'
import { Box } from '@mui/system'

interface MealListProps {
  currentMealCategory: string
}

const LIMIT = 4

export function MealList ({ currentMealCategory }: MealListProps) {
  const [ page, setPage ] = useState(1)

  const handlePageChange = (event: ChangeEvent<unknown>, page: number) => {
    setPage(page)
  }

  let mealCategoryId
  if (currentMealCategory !== 'all') {
    mealCategoryId = currentMealCategory
  }

  const { data, error, isLoading } = useMealListQuery({ limit: LIMIT, page, mealCategoryId })

  if (isLoading) {
    return <CircularProgress />
  }

  if (error || !data) {
    return <div>Something went wrong</div>
  }

  const { data: meals, totalCount } = data

  return (
    <>
      <Grid container spacing={3} sx={{ pb: 3 }} >
        {meals.map(meal =>
          <MealItem key={meal.id} meal={meal} />
        )}
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'center', pb: 4 }}>
        <Pagination color='primary' count={Math.ceil(totalCount/LIMIT)} page={page} onChange={handlePageChange} />
      </Box>
    </>
  )
}
