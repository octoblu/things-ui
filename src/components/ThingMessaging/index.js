import _ from 'lodash'
import React, { PropTypes } from 'react'
import { SchemaForm } from 'react-schema-form'

const propTypes = {
  formSchema: PropTypes.object,
  messageSchema: PropTypes.object,
}

const defaultProps = {
}

const ThingMessaging = ({ formSchema, messageSchema }) => {
  if (_.isEmpty(messageSchema)) return null

  console.log('formSchema', formSchema);
  console.log('messageSchema', messageSchema);

  return (
    <div>
      <SchemaForm
        schema={messageSchema.SendEmail}
        form={formSchema.SendEmail}
        onModelChange={_.noop}
      />
    </div>
  )
}

ThingMessaging.propTypes    = propTypes
ThingMessaging.defaultProps = defaultProps

export default ThingMessaging
