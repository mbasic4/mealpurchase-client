import {render, fireEvent, screen, waitFor} from '@testing-library/react'
import '@testing-library/jest-dom'
import { Provider } from 'react-redux'

import { PassengerList } from './PassengerList'
import { initializeStore } from '../../../redux/store'

describe('PassengerList', () => {
  test('When item from passenger list is clicked then it should be selected', async() => {
    const store = initializeStore()
    const passengers = store.getState().passenger.passengers
    render(
      <Provider store={store}>
        <PassengerList />
      </Provider>
    )

    fireEvent.click(screen.getByText(`seat no. ${passengers[0].seat}`, { exact: false }))

    await waitFor(() => expect(
      screen.getByText(`seat no. ${passengers[0].seat}`, { exact: false }).parentElement?.parentElement?.parentElement?.parentElement)
      .toHaveClass('Mui-selected')
    )
  })

  test('When item from passenger list is clicked then action should be dispatched', async() => {
    const store = initializeStore()
    const passengers = store.getState().passenger.passengers
    const dispatchSpy = jest.spyOn(store, 'dispatch').mockImplementation()
    render(
      <Provider store={store}>
        <PassengerList />
      </Provider>
    )

    fireEvent.click(screen.getByText(`seat no. ${passengers[0].seat}`, { exact: false }))

    expect(dispatchSpy).toHaveBeenLastCalledWith({"payload": 1, "type": "passenger/setCurrentPassenger"})

    dispatchSpy.mockRestore()
  })
})
