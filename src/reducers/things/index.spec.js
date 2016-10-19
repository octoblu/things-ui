import { expect } from 'chai'
import { searchActions } from 'redux-meshblu'

import { selectThing, unselectThing } from '../../actions/thing'
import { clearSelectedThings } from '../../actions/things'

import reducer from './'

describe('Things Reducer', () => {
  const initialState = {
    devices: null,
    error: null,
    fetching: false,
    selectedThings: [],
  }

  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).to.deep.equal(initialState)
  })

  describe('fetchThings', () => {
    it('should handle fetching request', () => {
      expect(
        reducer(undefined, { type: searchActions.searchRequest.getType() })
      ).to.deep.equal({ ...initialState, fetching: true })
    })

    it('should handle fetching success', () => {
      const devices = [
        { uuid: 'my-thing-1-uuid' },
        { uuid: 'my-thing-2-uuid' },
      ]

      expect(reducer(undefined, {
        type: searchActions.searchSuccess.getType(),
        payload: devices,
      })).to.deep.equal({ ...initialState, devices })
    })

    it('should handle fetching failure', () => {
      expect(reducer(undefined, {
        type: searchActions.searchFailure.getType(),
        payload: new Error('Bang!'),
      })).to.deep.equal({ ...initialState, error: new Error('Bang!') })
    })
  })

  describe('selectThing', () => {
    it('should handle selectThing action', () => {
      expect(
        reducer(undefined, {
          type: selectThing.getType(),
          payload: 'my-selected-thing-uuid',
        })
      ).to.deep.equal({ ...initialState, selectedThings: ['my-selected-thing-uuid'] })
    })
  })

  describe('clearSelectedThings', () => {
    it('should handle clearSelectedThings action', () => {
      const currentState = {
        ...initialState,
        selectedThings: [
          'thing-uuid-1',
          'thing-uuid-2',
          'thing-uuid-3',
        ],
      }

      expect(
        reducer(currentState, { type: clearSelectedThings.getType() })
      ).to.deep.equal(initialState)
    })
  })
  describe('unselectThing', () => {
    it('should handle unselecting a thing', () => {
      const currentState = {
        ...initialState,
        selectedThings: [
          'thing-uuid-1',
          'thing-uuid-2',
          'thing-uuid-3',
        ],
      }

      const expectedState = {
        ...currentState,
        selectedThings: [
          'thing-uuid-1',
          'thing-uuid-3',
        ],
      }

      expect(
        reducer(currentState, {
          type: unselectThing.getType(),
          payload: 'thing-uuid-2',
        })
      ).to.deep.equal(expectedState)
    })
  })
})
