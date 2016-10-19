import _ from 'lodash'
import React, { PropTypes } from 'react'
import Page from 'zooid-page'

import ThingHeader from '../ThingHeader'
import ThingMessaging from '../ThingMessaging'

const propTypes = {
  formSchema: PropTypes.object,
  messageSchema: PropTypes.object,
  thing: PropTypes.object,
}

const defaultProps = {
  formSchema: null,
  messageSchema: null,
  thing: null,
}

const ThingLayout = ({ thing, formSchema, messageSchema }) => {
  const { device, error, fetching } = thing

  if (fetching) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>
  if (_.isEmpty(device)) return <div>No Thing Found</div>

  return (
    <Page>
      <ThingHeader thing={device} />

      <ThingMessaging
        formSchema={formSchema}
        messageSchema={messageSchema}
      />
    </Page>
  )
}

ThingLayout.propTypes    = propTypes
ThingLayout.defaultProps = defaultProps

export default ThingLayout
