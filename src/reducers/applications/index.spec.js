import { expect } from 'chai'
import _ from 'lodash'
import { searchActions } from 'redux-meshblu'

import {
  dismissApplicationDialog,
  showApplicationDialog,
} from '../../actions/applications'

import reducer from './'

describe('Applications Reducer', () => {
  const initialState = {
    devices: null,
    error: null,
    fetching: false,
    showApplicationDialog: false,
  }

  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).to.deep.equal(initialState)
  })

  describe('fetchApplications', () => {
    it('should handle fetching request', () => {
      expect(reducer(undefined, {
        type: searchActions.searchRequest.getType(),
      })).to.deep.equal({
        ...initialState,
        fetching: true,
      })
    })

    it('should handle fetching success', () => {
      const devices = [
        { uuid: 'my-thing-1-uuid' },
        { uuid: 'my-thing-2-uuid' },
        { uuid: 'my-thing-3-uuid' },
        { uuid: 'my-thing-4-uuid' },
        {
          uuid: 'my-app-1-uuid',
          type: 'octoblu:application',
          devices: [],
        },
        {
          uuid: 'my-app-2-uuid',
          type: 'octoblu:application',
          devices: [],
        },
      ]

      expect(reducer(undefined, {
        type: searchActions.searchSuccess.getType(),
        payload: devices,
      })).to.deep.equal({
        ...initialState,
        devices: _.filter(devices, { type: 'octoblu:application' }),
        fetching: false,
      })
    })

    it('should handle fetching error', () => {
      expect(reducer(undefined, {
        type: searchActions.searchFailure.getType(),
        payload: new Error('Nooooo'),
      })).to.deep.equal({
        ...initialState,
        fetching: false,
        error: new Error('Nooooo'),
      })
    })
  })

  describe('showApplicationDialog', () => {
    it('should handle showApplicationDialog action', () => {
      const state = {
        ...initialState,
        devices: [
          {
            uuid: 'app-uuid-1',
            type: 'octoblu:application',
            devices: [
              'thing-uuid-1',
              'thing-uuid-2',
              'thing-uuid-3',
            ],
          },
          {
            uuid: 'app-uuid-2',
            type: 'octoblu:application',
            devices: ['thing-uuid-1'],
          },
        ],
      }
      const expectedState = {
        ...state,
        selectedApplications: ['app-uuid-1'],
        showApplicationDialog: true,
      }
      expect(
        reducer(state, {
          type: showApplicationDialog.getType(),
          payload: ['thing-uuid-1', 'thing-uuid-3'],
        })
      ).to.deep.equal(expectedState)
    })
  })
  describe('dismissApplicationDialog', () => {
    it('should handle dismissApplicationDialog action', () => {
      const state = {
        ...initialState,
        showApplicationDialog: true,
        selectedApplications: ['cats'],
      }
      const expectedState = {
        ...state,
        selectedApplications: [],
        showApplicationDialog: false,
      }
      expect(
        reducer(state, {
          type: dismissApplicationDialog.getType(),
        })
      ).to.deep.equal(expectedState)
    })
  })
})
