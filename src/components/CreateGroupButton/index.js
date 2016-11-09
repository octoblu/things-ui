import React, { PropTypes } from 'react'
import _ from 'lodash'
import Button from 'zooid-button'

const propTypes = {
  nameFilter: PropTypes.string,
  onCreate: PropTypes.func,
  visible: PropTypes.bool,
}

const defaultProps = {
  nameFilter: '',
  onCreate: _.noop,
  visible: false,
}

const CreateGroupButton = ({ nameFilter, onCreate, visible }) => {
  if (!visible) return null

  return (
    <Button kind="no-style" onClick={onCreate}>Create "{nameFilter}" Group</Button>
  )
}

CreateGroupButton.propTypes    = propTypes
CreateGroupButton.defaultProps = defaultProps

export default CreateGroupButton
