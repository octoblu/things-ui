import {
  addMessagingPermissionsForDevice,
  createMessageSubscriptionsForDevice,
} from './subscription-service'


xdescribe('Subscription Service', () => {
  const initialState = {
    deletingThings: false,
    devices: null,
    error: null,
    fetching: false,
    selectedThings: [],
    showDeleteDialog: false,
    showTagDialog: false,
  }

  xdescribe('->addMessagingPermissionsForDevice', () => {
    context('When the emitter is a V1 device', () => {
      it('should update the sendWhitelist and receiveWhitelist', () => {

      })
    })
  })
})
