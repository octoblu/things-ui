import _ from 'lodash'
import React, { PropTypes } from 'react'
import Page from 'zooid-page'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'

import ThingHeader from '../ThingHeader'
import MessageThing from '../MessageThing'

const propTypes = {
  thing: PropTypes.object,
}

const defaultProps = {
  thing: null,
}

const handleSendMessage = (message) => {
    console.log('The message is', message)
}

const ThingLayout = ({ thing }) => {
  const { device, error, fetching } = thing

  if (fetching) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>
  if (_.isEmpty(device)) return <div>No Thing Found</div>

  return (
    <Page>
      <ThingHeader thing={device} />

      <Tabs>
        <TabList>
          <Tab>Message</Tab>
        </TabList>
        <TabPanel>
          <MessageThing
            thing={thing}
            onSend={handleSendMessage.bind(this)}
          />
        </TabPanel>
      </Tabs>
    </Page>
  )
}

ThingLayout.propTypes    = propTypes
ThingLayout.defaultProps = defaultProps

export default ThingLayout
