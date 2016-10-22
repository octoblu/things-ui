import _ from 'lodash'
import React, { PropTypes } from 'react'
import Page from 'zooid-page'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import ThingHeader from '../ThingHeader'
import ThingMessaging from '../ThingMessaging'
import MessageThing from '../../containers/MessageThing'
import {Nav} from 'zooid-ui'
import {Link} from 'react-router'

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
  console.log("Message Schema in ThingLayout", messageSchema)
  if (fetching) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>
  if (_.isEmpty(device)) return <div>No Thing Found</div>

  return (
    <Page>
      <ThingHeader thing={device} />
      <Tabs>
      <TabList>
          <Tab>Message</Tab>
          <Tab>Configure</Tab>
        </TabList>
        <TabPanel>
          <MessageThing thing={thing} formSchema={formSchema} messageSchema={messageSchema} />
        </TabPanel>
        <TabPanel>
          <h2>Configure Me</h2>
        </TabPanel>
      </Tabs>
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
