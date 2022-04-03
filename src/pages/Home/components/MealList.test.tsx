import React from 'react'
import {rest} from 'msw'
import {setupServer} from 'msw/node'
import {render, waitFor, screen} from '@testing-library/react'
import '@testing-library/jest-dom'

import { MealList } from './MealList'
import { Provider } from 'react-redux'
import { store } from '../../../redux/store'
import { mealsData } from '../../../mealsdata'

const meals = mealsData.meals

const server = setupServer(
  rest.get('/api/v1/meals', (req, res, ctx) => {
    return res(ctx.json(meals))
  }),
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())
 
describe('MealList', () => {
  test(`When a current meal category prop is 'all' then all meals should be rendered`, async () => {
    render(
      <Provider store={store}>
       <MealList currentMealCategory={'all'} />
      </Provider>
    )

    for (const meal of meals) {
      await waitFor(() => expect(screen.getByAltText(meal.title)).toBeVisible())
    }
  })

  test(`When a current meal category prop is provided, and is not equal to 'all' then only meals of that category should be rendered`, async () => {
    const { queryByAltText } = render(
      <Provider store={store}>
       <MealList currentMealCategory={'chicken'} />
      </Provider>
    )

    await waitFor(() => {
      expect(screen.getAllByTestId('meal-item').length).toBe(2)
    })

    const filteredOutMeals = meals.filter(meal => !meal.labels.includes('chicken'))
    for (const meal of filteredOutMeals) {
      await waitFor(() => expect(queryByAltText(meal.title)).toBeNull())
    }
  })
})
