import { act } from '@testing-library/react'
import { renderToDOM } from '.'

describe('index', () => {
  it('should be able to run tests', () => {
    expect(1 + 2).toEqual(3)
  })

  it('renders without crashing', () => {
    act(() => renderToDOM())
  })
})
