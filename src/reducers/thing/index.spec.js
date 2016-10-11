import { expect } from 'chai'
import { searchActions } from 'redux-meshblu'

import reducer from './'

describe('Thing Reducer', () => {
  const initialState = {
    device: null,
    error: null,
    fetching: false,
  }

  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).to.deep.equal(initialState)
  })
})
