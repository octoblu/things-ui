import { expect } from 'chai'
import _ from 'lodash'
import { searchActions } from 'redux-meshblu'

import {
  dismissGroupDialog,
  showGroupDialog,
} from '../../actions/groups'

import reducer from './'

describe('Groups Reducer', () => {
  const initialState = {
    devices: null,
    error: null,
    fetching: false,
    showGroupDialog: false,
  }

  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).to.deep.equal(initialState)
  })

  describe('fetchGroups', () => {
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
          type: 'octoblu:group',
          devices: [],
        },
        {
          uuid: 'my-app-2-uuid',
          type: 'octoblu:group',
          devices: [],
        },
      ]

      expect(reducer(undefined, {
        type: searchActions.searchSuccess.getType(),
        payload: devices,
      })).to.deep.equal({
        ...initialState,
        devices: _.filter(devices, { type: 'octoblu:group' }),
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

  describe('showGroupDialog', () => {
    it('should handle showGroupDialog action', () => {
      const state = {
        ...initialState,
        devices: [
          {
            uuid: 'app-uuid-1',
            type: 'octoblu:group',
            devices: [
              'thing-uuid-1',
              'thing-uuid-2',
              'thing-uuid-3',
            ],
          },
          {
            uuid: 'app-uuid-2',
            type: 'octoblu:group',
            devices: ['thing-uuid-1'],
          },
        ],
      }
      const expectedState = {
        ...state,
        selectedGroups: ['app-uuid-1'],
        showGroupDialog: true,
      }
      expect(
        reducer(state, {
          type: showGroupDialog.getType(),
          payload: ['thing-uuid-1', 'thing-uuid-3'],
        })
      ).to.deep.equal(expectedState)
    })
  })
  describe('dismissGroupDialog', () => {
    it('should handle dismissGroupDialog action', () => {
      const state = {
        ...initialState,
        showGroupDialog: true,
        selectedGroups: ['cats'],
      }
      const expectedState = {
        ...state,
        selectedGroups: [],
        showGroupDialog: false,
      }
      expect(
        reducer(state, {
          type: dismissGroupDialog.getType(),
        })
      ).to.deep.equal(expectedState)
    })
  })
})
