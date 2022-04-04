import React, { useState } from 'react'
import { Container, Grid } from '@mui/material'

import { MealList } from './components/MealList/MealList';
import { PassengerListContainer } from './components/PassengerList/PassengerListContainer';
import { TagSelect } from '../../components/TagSelect';
import { useMealCategoriesQuery } from '../../redux/slices/apiSlice';
import { Loader } from '../../components/Loader';
import { ErrorFallback } from '../../components/ErrorFallback';


export function HomePage () {
  const [ currentMealCategory, setCurrentMealCategory ] = useState('all')

  const { data: mealCategories, error, isLoading } = useMealCategoriesQuery()

  if (isLoading) {
    return <Loader />
  }

  if (error || !mealCategories) {
    return <ErrorFallback />
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
