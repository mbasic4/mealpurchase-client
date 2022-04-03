import {render, fireEvent, screen,} from '@testing-library/react'
import '@testing-library/jest-dom'

import { MealItem } from './MealItem'
import { initializeStore } from '../../../redux/store'
import { Provider } from 'react-redux'
import { setCurrentPassenger } from '../../../redux/slices/passengerSlice'
 
describe('MealItem', () => {
  const meal = {
    "id": "meal6",
    "title": "3 course Kids",
    "starter": "Lorem Ipsum",
    "desert": "Cake",
    "price": 29.99,
    "labels": [
      "kids",
      "breakfast"
    ],
    "img": "https://source.unsplash.com/PLyJqEJVre0",
    "drinks": [
      {
        "id": "drink-1",
        "title": "Vine",
        "price": 4.99
      },
      {
        "id": "drink-2",
        "title": "Juice",
        "price": 5.99
      },
      {
        "id": "drink-3",
        "title": "Beer",
        "price": 6.99
      }
    ]
  }

  test('Given a passenger is not selected then add/select meal button is disabled', () => {
    const store = initializeStore()

    render(
      <Provider store={store}>
        <MealItem meal={meal} />
      </Provider>
    )

    expect(screen.getByLabelText('Add meal')).toHaveClass('Mui-disabled')
  })

  test('Given a passenger is selected then add/select meal button is enabled', () => {
    const store = initializeStore()
    store.dispatch(setCurrentPassenger(2))

    render(
      <Provider store={store}>
        <MealItem meal={meal} />
      </Provider>
    )

    expect(screen.getByLabelText('Add meal')).not.toHaveClass('Mui-disabled')
  })

  test('Given a drink is selected then chip button is selected', () => {
    const store = initializeStore()

    render(
      <Provider store={store}>
        <MealItem meal={meal} />
      </Provider>
    )

    fireEvent.click(screen.getByText(meal.drinks[0].title))

    expect(screen.queryByLabelText(`Select drink ${meal.drinks[0].title}`)).toHaveClass('MuiChip-filled')
    expect(screen.queryByLabelText(`Select drink ${meal.drinks[0].title}`)).toHaveClass('MuiChip-colorPrimary')
  })

  test('Given a drink is selected then price is correctly reflecting that', () => {
    const store = initializeStore()

    render(
      <Provider store={store}>
        <MealItem meal={meal} />
      </Provider>
    )

    fireEvent.click(screen.getByText(meal.drinks[0].title))

    expect(screen.getByLabelText('Add meal')).toHaveTextContent((meal.price + meal.drinks[0].price).toFixed(2))
  })
})