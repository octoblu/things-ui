import _ from 'lodash'
import { createReducer } from 'redux-act'
import { searchActions } from 'redux-meshblu'

// import {
//   addThingsToApplication,
//   removeThingsFromApplication,
// } from '../../actions/things'

const { searchRequest, searchSuccess, searchFailure } = searchActions

const initialState = {
  devices: null,
  error: null,
  fetching: false,
}

export default createReducer({
  [searchFailure]: (state, error) => ({ ...initialState, error, fetching: false }),
  [searchRequest]: () => ({ ...initialState, fetching: true }),
  [searchSuccess]: (state, devices) => {
    return {
      ...initialState,
      devices: _.filter(devices, { type: 'octoblu:application' }),
      fetching: false,
    }
  },
}, initialState)


//
// const computeSelectedApplications = ({ devices, selectedThings }) => {
//   return _(devices)
//     .filter({ type: 'octoblu:application' })
//     .filter(application => (_.difference(selectedThings, application.devices).length === 0))
//     .map('uuid')
//     .value()
// }
//
// export default createReducer({
//   [addThingsToApplication]: (state, applicationUuid) => {
//     const updatedDevices = _.map(state.devices, (device) => {
//       if (device.uuid !== applicationUuid) return device
//       return {
//         ...device,
//         devices: _.uniq([...device.devices, ...state.selectedThings]),
//       }
//     })
//
//     return {
//       ...state,
//       devices: updatedDevices,
//       selectedApplications: computeSelectedApplications({
//         devices: updatedDevices,
//         selectedThings: state.selectedThings,
//       }),
//     }
//   },
//   [removeThingsFromApplication]: (state, applicationUuid) => {
//     const updatedDevices = _.map(state.devices, (device) => {
//       if (device.uuid !== applicationUuid) return device
//       return {
//         ...device,
//         devices: _.difference(device.devices, state.selectedThings),
//       }
//     })
//
//     return {
//       ...state,
//       devices: updatedDevices,
//       selectedApplications: computeSelectedApplications({
//         devices: updatedDevices,
//         selectedThings: state.selectedThings,
//       }),
//     }
//   },
// }, initialState)
