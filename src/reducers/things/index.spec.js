import { expect } from 'chai'
import { searchActions } from 'redux-meshblu'

import { selectThing, unselectThing } from '../../actions/thing'
import {
  clearSelectedThings,
  deleteSelectedThings,
  deleteSelectedThingsSuccess,
  dismissTagDialog,
  showTagDialog,
} from '../../actions/things'

import reducer from './'

describe('Things Reducer', () => {
  const initialState = {
    applications: [],
    deletingThings: false,
    devices: null,
    error: null,
    fetching: false,
    selectedApplications: [],
    selectedThings: [],
    showDeleteDialog: false,
    showTagDialog: false,
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

      const applications = [
        'my-app-1-uuid',
        'my-app-2-uuid',
      ]

      expect(reducer(undefined, {
        type: searchActions.searchSuccess.getType(),
        payload: devices,
      })).to.deep.equal({
        ...initialState,
        applications,
        devices,
      })
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
      ).to.deep.equal({
        ...initialState,
        selectedThings: ['my-selected-thing-uuid'],
      })
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

  describe('clearSelectedThings', () => {
    it('should handle clearSelectedThings action', () => {
      const state = {
        ...initialState,
        selectedThings: [
          'thing-uuid-1',
          'thing-uuid-2',
          'thing-uuid-3',
        ],
      }

      expect(
        reducer(state, { type: clearSelectedThings.getType() })
      ).to.deep.equal(initialState)
    })
  })

  describe('showTagDialog', () => {
    it('should handle showTagDialog action', () => {
      const state = {
        ...initialState,
        applications: [
          'app-uuid-1',
          'app-uuid-2',
        ],
        devices: [
          { uuid: 'thing-uuid-1' },
          { uuid: 'thing-uuid-2' },
          { uuid: 'thing-uuid-3' },
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
        selectedThings: [
          'thing-uuid-1',
          'thing-uuid-3',
        ],
      }

      const expectedState = {
        ...state,
        selectedApplications: ['app-uuid-1'],
        showTagDialog: true,
      }

      expect(
        reducer(state, { type: showTagDialog.getType() })
      ).to.deep.equal(expectedState)
    })
  })

  describe('dismissTagDialog', () => {
    it('should handle dismissTagDialog action', () => {
      const state = {
        ...initialState,
        showTagDialog: true,
        selectedApplications: ['fool'],
      }

      const expectedState = {
        ...state,
        showTagDialog: false,
        selectedApplications: [],
      }
      expect(
        reducer(state, { type: dismissTagDialog.getType() })
      ).to.deep.equal(expectedState)
    })
  })

  describe('deleteThings', () => {
    it('should handle deleteThings action', () => {
      const currentState = {
        ...initialState,
        devices: [
          { uuid: 'thing-1-uuid' },
          { uuid: 'thing-2-uuid' },
          { uuid: 'thing-3-uuid' },
        ],
        selectedThings: [
          'thing-1-uuid',
          'thing-3-uuid',
        ],
        deletingThings: false,
      }

      const expectedState = {
        ...currentState,
        deletingThings: true,
      }

      expect(
        reducer(currentState, {
          type: deleteSelectedThings.getType(),
        })
      ).to.deep.equal(expectedState)
    })

    it('should handle deleteThingsSuccess action', () => {
      const currentState = {
        ...initialState,
        devices: [
          { uuid: 'thing-1-uuid' },
          { uuid: 'thing-2-uuid' },
          { uuid: 'thing-3-uuid' },
        ],
        selectedThings: [
          'thing-1-uuid',
          'thing-3-uuid',
        ],
        deletingThings: true,
      }

      const expectedState = {
        ...currentState,
        devices: [
          { uuid: 'thing-2-uuid' },
        ],
        selectedThings: [],
        deletingThings: false,
      }

      expect(
        reducer(currentState, {
          type: deleteSelectedThingsSuccess.getType(),
        })
      ).to.deep.equal(expectedState)
    })
  })
})
