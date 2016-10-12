import _ from 'lodash'
import React, { PropTypes } from 'react'
import Page from 'zooid-page'

import ThingList from '../ThingList'
import ThingListActions from '../ThingListActions'

import styles from './styles.css'

const propTypes = {
  things: PropTypes.object.isRequired,
}

const defaultProps = {}

const ThingsLayout = ({ things }) => {
  const { devices, error, fetching } = things

  if (fetching) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>
  if (_.isEmpty(devices)) return <div>No Things Found</div>

  return (
    <Page width="medium" className={styles.root}>
      <ThingList things={devices} />
      {/* <ThingListActions /> */}
    </Page>
  )
}

ThingsLayout.propTypes    = propTypes
ThingsLayout.defaultProps = defaultProps

export default ThingsLayout
