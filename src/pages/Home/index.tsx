import React from 'react'
import { Container, Grid } from '@mui/material'

import { MealList } from './components/MealList';
import { PassengerListContainer } from './components/PassengerListContainer';
import { TagSelect } from '../../components/TagSelect';
import { mealsData } from '../../mealsdata';

export function HomePage () {
  return (
    <Container>
      <TagSelect options={[{ id: 'all', label: 'All' }, ...mealsData.labels ]} />
      <Grid container spacing={3} sx={{ pt: 3, pb: { xs: 5, md: 2 } }} >
        <Grid item md={8}>
          <MealList />
        </Grid>
        <PassengerListContainer />
      </Grid>
    </Container>
  )
}
