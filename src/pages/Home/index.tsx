import React, { useState, useEffect, useRef } from 'react'
import { CircularProgress, Container, Grid } from '@mui/material'

import { MealList } from './components/MealList';
import { PassengerListContainer } from './components/PassengerListContainer';
import { TagSelect } from '../../components/TagSelect';
import { useMealCategoriesQuery } from '../../redux/slices/apiSlice';


export function HomePage () {
  const [ currentMealCategory, setCurrentMealCategory ] = useState('all')

  const { data: mealCategories, error, isLoading } = useMealCategoriesQuery()

  if (isLoading) {
    return <CircularProgress />
  }

  if (error || !mealCategories) {
    return <div>Something went wrong</div>
  }

  return (
    <Container>
      <TagSelect
        value={currentMealCategory}
        options={[{ id: 'all', label: 'All' }, ...mealCategories ]}
        onSelect={setCurrentMealCategory}
      />
      <Grid container spacing={3} sx={{ pt: 3, pb: { xs: 5, md: 2 } }} >
        <Grid item md={8}>
          <MealList currentMealCategory={currentMealCategory} />
        </Grid>
        <PassengerListContainer />
      </Grid>
    </Container>
  )
}
