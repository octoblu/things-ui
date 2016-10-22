import React, { PropTypes } from 'react'
import { SchemaContainer } from 'zooid-meshblu-device-editor'
import _ from 'lodash'
import styles from './styles.css'

const propTypes = {
  onSend: PropTypes.func,
  messageSchema: PropTypes.object,
}

const defaultProps = {
  onSend: _.noop,
  messageSchema: null
}

const ThingMessageInputForm = ({messageSchema, onSend}) => {
  if (_.isEmpty(messageSchema)) return null
  return (
    <div className={styles.root}>
      <SchemaContainer schema={messageSchema} onSubmit={onSend} />
    </div>
  )
}

ThingMessageInputForm.propTypes    = propTypes
ThingMessageInputForm.defaultProps = defaultProps

export default ThingMessageInputForm
