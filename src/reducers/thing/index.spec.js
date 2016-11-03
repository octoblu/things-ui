import { expect } from 'chai'
import { searchActions } from 'redux-meshblu'

import { messageReceived } from '../../actions/thing'

import reducer from './'

describe('Thing Reducer', () => {
  const initialState = {
    device: null,
    error: null,
    fetching: false,
    messages: [],
    schemasDerefed: false,
  }


  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).to.deep.equal(initialState)
  })

  it('should handle messageReceived action', () => {
    const expectedMessage = {
      data: {
        foo: 'bar',
      },
      metadata: {
        fool: 'bool',
      },
    }

    expect(
      reducer(initialState, {
        type: messageReceived.getType(),
        payload: expectedMessage,
      })
    ).to.deep.equal({ ...initialState, messages: [expectedMessage] })
  })
})
