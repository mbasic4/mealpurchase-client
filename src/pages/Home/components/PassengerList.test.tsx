import { render, fireEvent, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Provider } from 'react-redux'

import { PassengerList } from './PassengerList'
import { initializeStore } from '../../../redux/store'
import { fixture } from '../../../fixture'
import { removeMealForPassenger, setCurrentPassenger, setMealForCurrentPassenger } from '../../../redux/slices/passengerSlice'

describe('PassengerList', () => {
  test('Given a remove meal button is clicked for a passenger with selected meal then meal should no longer be visible', async () => {
    const store = initializeStore()
    const passengers = store.getState().passenger.passengers

    store.dispatch(setCurrentPassenger(passengers[0].id))
    store.dispatch(setMealForCurrentPassenger({ id: fixture.meals[2].id, drinkId: null }))
  
    render(
      <Provider store={store}>
        <PassengerList />
      </Provider>
    )
  
    const removeButton = await waitFor(() => screen.getByTestId('RemoveShoppingCartIcon'))
    fireEvent.click(removeButton)
  
    expect(screen.queryByText(fixture.meals[2].title)).toBeNull()


  })

  test('Given a remove meal button is clicked for a passenger with selected meal then removeMealForPassenger action should be dispatched', async () => {
    const store = initializeStore()
    const passengers = store.getState().passenger.passengers

    store.dispatch(setCurrentPassenger(passengers[0].id))
    store.dispatch(setMealForCurrentPassenger({ id: fixture.meals[3].id, drinkId: null }))

    render(
      <Provider store={store}>
        <PassengerList />
      </Provider>
    )
  
    const dispatchSpy = jest.spyOn(store, 'dispatch').mockImplementation()

    const removeButton = await waitFor(() => screen.getByTestId('RemoveShoppingCartIcon'))
    fireEvent.click(removeButton)

    expect(dispatchSpy).toHaveBeenLastCalledWith(removeMealForPassenger(passengers[0].id))

    dispatchSpy.mockRestore()
  })
})
