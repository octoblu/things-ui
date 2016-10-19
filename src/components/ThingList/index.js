import _ from 'lodash'
import React, { PropTypes } from 'react'

import ThingListItem from '../ThingListItem'

import styles from './styles.css'

const propTypes = {
  onThingSelection: PropTypes.func,
  selectedThings: PropTypes.array,
  things: PropTypes.array,
}

const defaultProps = {
  onThingSelection: _.noop,
  selectedThings: [],
  things: [],
}

const ThingList = ({ onThingSelection, things, selectedThings }) => {
  if (_.isEmpty(things)) return null

  const thingItems = _.map(things, (thing) => {
    return (
      <ThingListItem
        onThingSelection={onThingSelection}
        selected={!(_.isEmpty(_.find(selectedThings, thingUuid => thingUuid === thing.uuid)))}
        thing={thing}
        key={thing.uuid}
      />
    )
  })

  return <div className={styles.root}>{thingItems}</div>
}

ThingList.propTypes    = propTypes
ThingList.defaultProps = defaultProps

export default ThingList
