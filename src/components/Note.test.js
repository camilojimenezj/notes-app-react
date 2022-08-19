import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import Note from './Note'

test('renders content', () => {
  const note = {
    content: 'This is a test',
    important: true
  }

  const component = render(<Note note={note} />)

  component.getByText(note.content)
  component.getByText('make not important')
})

test('clicking the button calls event handler once', () => {
  const note = {
    content: 'This is a test',
    important: true
  }

  const mocklHandler = jest.fn()

  const component = render(<Note note={note} toggleImportance={mocklHandler} />)

  const button = component.getByText('make not important')
  fireEvent.click(button)

  expect(mocklHandler).toHaveBeenCalledTimes(1)
})
