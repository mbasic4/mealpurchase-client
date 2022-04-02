import {render, fireEvent, screen,} from '@testing-library/react'
import '@testing-library/jest-dom'

import { TagSelect } from './index'
 
describe('TagSelect', () => {
  const options = [
    { id: 'all', label: 'All' },
    { id: 'cat', label: 'Cat' },
    { id: 'dog', label: 'Dog' },
    { id: 'mouse', label: 'Mouse' }
  ]

  test('Given an option is clicked then chip color is primary', () => {
    render(<TagSelect options={options} />)

    fireEvent.click(screen.getByText(options[0].label))

    expect(screen.getByText(options[0].label).parentElement).toHaveClass('MuiChip-colorPrimary')
  })

  test('Given an option is clicked then chip variant is filled', () => {
    render(<TagSelect options={options} />)

    fireEvent.click(screen.getByText(options[0].label))

    expect(screen.getByText(options[0].label).parentElement).toHaveClass('MuiChip-filled')
  })

  test('Given an option is clicked then onClick is invoked with selected option', () => {
    const onSelectMock = jest.fn()
    render(<TagSelect options={options} onSelect={onSelectMock} />)

    fireEvent.click(screen.getByText(options[1].label))

    expect(onSelectMock).toHaveBeenLastCalledWith(options[1].id)
  })

  test('Given an option is selected then its chip variant is filled, and other options are not selected/their chip variant is outlined', () => {
    render(<TagSelect options={options} />)

    fireEvent.click(screen.getByText(options[2].label))

    expect(screen.getByText(options[2].label).parentElement).toHaveClass('MuiChip-filled')
    options.filter(option => option.label !== 'Dog').map(option =>
      expect(screen.getByText(option.label).parentElement).toHaveClass('MuiChip-outlined')
    )
  })

  test('Given an option is selected then its chip color is primary, and other options are not selected/their chip color is default', () => {
    render(<TagSelect options={options} />)

    fireEvent.click(screen.getByText(options[3].label))

    expect(screen.getByText(options[3].label).parentElement).toHaveClass('MuiChip-colorPrimary')
    options.filter(option => option.label !== 'Mouse').map(option =>
      expect(screen.getByText(option.label).parentElement).toHaveClass('MuiChip-colorDefault')
    )
  })
})
