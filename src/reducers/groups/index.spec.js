import { expect } from 'chai'
import _ from 'lodash'
import { searchActions } from 'redux-meshblu'

import {
  addSelectedThingsToGroup,
  removeSelectedThingsFromGroup,
  dismissGroupDialog,
  showGroupDialog,
  updateDirtyGroupsRequest,
  updateDirtyGroupsSuccess,
  updateDirtyGroupsFailure,
} from '../../actions/groups'

import reducer from './'

describe('Groups Reducer', () => {
  const initialState = {
    devices: null,
    dirtyDevices: [],
    error: null,
    fetching: false,
    groupUpdateError: null,
    showGroupDialog: false,
    updatingGroups: false,
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

  describe('updateDirtyGroups', () => {
    it('should handle updateDirtyGroupsRequest', () => {
      const expectedState = {
        ...initialState,
        updatingGroups: true,
      }

      expect(
        reducer(initialState, { type: updateDirtyGroupsRequest.getType() })
      ).to.deep.equal(expectedState)
    })

    it('updateDirtyGroupsSuccess', () => {
      const expectedState = {
        ...initialState,
        updatingGroups: false,
      }

      expect(
        reducer(initialState, { type: updateDirtyGroupsSuccess.getType() })
      ).to.deep.equal(expectedState)
    })

    it('updateDirtyGroupsFailure', () => {
      const expectedState = {
        ...initialState,
        groupUpdateError: new Error('Error: Group update failed.'),
        updatingGroups: false,
      }

      expect(
        reducer(initialState, {
          type: updateDirtyGroupsFailure.getType(),
          payload: new Error('Error: Group update failed.'),
        })
      ).to.deep.equal(expectedState)
    })
  })

  describe('addSelectedThingsToGroup', () => {
    it('should handle addSelectedThingsToGroup action', () => {
      const state = {
        ...initialState,
        devices: [
          {
            uuid: 'group-1',
            devices: ['thing-1'],
          },
          {
            uuid: 'group-2',
            devices: ['thing-3'],
          },
        ],
      }
      const expectedState = {
        ...state,
        devices: [
          {
            uuid: 'group-1',
            devices: ['thing-1', 'thing-2', 'thing-3'],
          },
          {
            uuid: 'group-2',
            devices: ['thing-3'],
          },
        ],
        dirtyDevices: ['group-1'],
      }

      expect(
        reducer(state, {
          type: addSelectedThingsToGroup.getType(),
          payload: {
            groupUuid: 'group-1',
            selectedThings: ['thing-2', 'thing-3'],
          },
        })
      ).to.deep.equal(expectedState)
    })
  })

  describe('removeSelectedThingsFromGroup', () => {
    it('should handle removeSelectedThingsFromGroup action', () => {
      const state = {
        ...initialState,
        devices: [
          {
            uuid: 'group-1',
            devices: ['thing-1', 'thing-2', 'thing-3'],
          },
          {
            uuid: 'group-2',
            devices: ['thing-3'],
          },
        ],
      }
      const expectedState = {
        ...state,
        devices: [
          {
            uuid: 'group-1',
            devices: ['thing-1'],
          },
          {
            uuid: 'group-2',
            devices: ['thing-3'],
          },
        ],
        dirtyDevices: ['group-1'],
      }

      expect(
        reducer(state, {
          type: removeSelectedThingsFromGroup.getType(),
          payload: {
            groupUuid: 'group-1',
            selectedThings: ['thing-2', 'thing-3'],
          },
        })
      ).to.deep.equal(expectedState)
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
        dirtyDevices: ['meh'],
      }
      const expectedState = {
        ...state,
        selectedGroups: ['app-uuid-1'],
        showGroupDialog: true,
        dirtyDevices: [],
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
        dirtyDevices: ['meh'],
      }
      const expectedState = {
        ...state,
        selectedGroups: [],
        showGroupDialog: false,
        dirtyDevices: [],
      }
      expect(
        reducer(state, {
          type: dismissGroupDialog.getType(),
        })
      ).to.deep.equal(expectedState)
    })
  })
})
