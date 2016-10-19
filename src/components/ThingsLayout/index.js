import _ from 'lodash'
import React, { PropTypes } from 'react'
import Page from 'zooid-page'

import ThingList from '../ThingList'
import ThingListActions from '../ThingListActions'

import styles from './styles.css'

const propTypes = {
  onClearSelection: PropTypes.func,
  onDeleteSelection: PropTypes.func,
  onTagSelection: PropTypes.func,
  onThingSelection: PropTypes.func,
  things: PropTypes.object.isRequired,
}

const defaultProps = {
  onClearSelection: _.noop,
  onDeleteSelection: _.noop,
  onTagSelection: _.noop,
  onThingSelection: _.noop,
}

const ThingsLayout = (props) => {
  const {
    onThingSelection,
    onClearSelection,
    onDeleteSelection,
    onTagSelection,
    things,
  } = props
  const { devices, error, fetching, selectedThings } = things

  if (fetching) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>
  if (_.isEmpty(devices)) return <div>No Things Found</div>

  return (
    <div>
      <ThingListActions
        onClearSelection={onClearSelection}
        onDeleteSelection={onDeleteSelection}
        onTagSelection={onTagSelection}
        selectedThings={selectedThings}
      />

      <Page width="medium" className={styles.root}>
        <ThingList
          onThingSelection={onThingSelection}
          selectedThings={selectedThings}
          things={devices}
        />
      </Page>
    </div>
  )
}

ThingsLayout.propTypes    = propTypes
ThingsLayout.defaultProps = defaultProps

export default ThingsLayout
