import { Record } from 'immutable'

const GroupRecord = Record({
  devices: [],
  logo: '',
  meshblu: null,
  name: '',
  octoblu: null,
  online: true,
  type: 'octoblu:group',
  uuid: null,
})

class Group extends GroupRecord {
  getLabel() {
    return this.get('name') || this.get('uuid')
  }
}

export default Group
