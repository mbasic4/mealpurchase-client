import { render, fireEvent, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Provider } from 'react-redux'

import { PassengerListItem } from './PassengerListItem'
import { initializeStore } from '../../../redux/store'
import { mealsData } from '../../../mealsdata'
import { setCurrentPassenger, setMealForCurrentPassenger } from '../../../redux/slices/passengerSlice'

describe('PassengerListItem', () => {
  test('When item from passenger list is clicked then it should be selected', () => {
    const store = initializeStore()
    const passengers = store.getState().passenger.passengers

    render(
      <Provider store={store}>
        <PassengerListItem isSelected={true} meals={mealsData.meals} passenger={passengers[0]} />
      </Provider>
    )

    fireEvent.click(screen.getByText(`seat no. ${passengers[0].seat}`, { exact: false }))

    expect(
      screen.getByText(`seat no. ${passengers[0].seat}`, { exact: false }).parentElement?.parentElement?.parentElement?.parentElement)
      .toHaveClass('Mui-selected')
  })

  test('When item from passenger list is clicked then setCurrentPassenger action should be dispatched', () => {
    const store = initializeStore()
    const passengers = store.getState().passenger.passengers
    const dispatchSpy = jest.spyOn(store, 'dispatch').mockImplementation()

    render(
      <Provider store={store}>
        <PassengerListItem isSelected={true} meals={mealsData.meals} passenger={passengers[0]} />
      </Provider>
    )

    fireEvent.click(screen.getByText(`seat no. ${passengers[0].seat}`, { exact: false }))

    expect(dispatchSpy).toHaveBeenLastCalledWith(setCurrentPassenger(1))

    dispatchSpy.mockRestore()
  })

  test('Given no meal is selected for passenger then it should be evident', () => {
    const store = initializeStore()
    const passengers = store.getState().passenger.passengers
  
    render(
      <Provider store={store}>
        <PassengerListItem isSelected={true} meals={mealsData.meals} passenger={passengers[0]} />
      </Provider>
    )

    const passenger = `${passengers[0].age > 18 ? 'Adult' : 'Child'}, seat no. ${passengers[0].seat}`

    expect(screen.getByText(passenger, { exact: false }).parentElement?.parentElement).toHaveTextContent('No meal selected')
  })

  test('Given a meal is selected for current user then selected meal is instantly visible', () => {
    const store = initializeStore()
    store.dispatch(setCurrentPassenger(1))
    store.dispatch(setMealForCurrentPassenger({ id: mealsData.meals[2].id, drinkId: null }))
    const passengers = store.getState().passenger.passengers
  
    render(
      <Provider store={store}>
        <PassengerListItem isSelected={true} meals={mealsData.meals} passenger={passengers[0]} />
      </Provider>
    )

    expect(screen.getByTestId('ExpandLessIcon')).toBeVisible()
    expect(screen.getByText(mealsData.meals[2].title)).toBeVisible()
  })

  test('Given a meal is selected for current user then selected meal info is toggleable', () => {
    const store = initializeStore()
    store.dispatch(setCurrentPassenger(1))
    store.dispatch(setMealForCurrentPassenger({ id: mealsData.meals[2].id, drinkId: null }))
    const passengers = store.getState().passenger.passengers
  
    render(
      <Provider store={store}>
        <PassengerListItem isSelected={true} meals={mealsData.meals} passenger={passengers[0]} />
      </Provider>
    )

    fireEvent.click(screen.getByTestId('ExpandLessIcon'))

    expect(screen.getByTestId('ExpandMoreIcon')).toBeVisible()
  })
})
