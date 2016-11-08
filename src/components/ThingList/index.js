import _ from 'lodash'
import React, { PropTypes } from 'react'

import ThingListItem from '../ThingListItem'

import styles from './styles.css'

const propTypes = {
  onThingSelection: PropTypes.func,
  selectedThings: PropTypes.array,
  things: PropTypes.array,
  groups: PropTypes.array,
}

const defaultProps = {
  groups: [],
  onThingSelection: _.noop,
  selectedThings: [],
  things: [],
}

const ThingList = ({ groups, onThingSelection, things, selectedThings }) => {
  if (_.isEmpty(things)) return null

  const thingItems = _.map(things, (thing) => {
    const { uuid } = thing
    const parentGroups = _.filter(groups, group => _.includes(group.devices, thing.uuid))

    return (
      <ThingListItem
        onThingSelection={onThingSelection}
        selected={_.includes(selectedThings, uuid)}
        thing={thing}
        groups={parentGroups}
        key={uuid}
      />
    )
  })

  return <div className={styles.root}>{thingItems}</div>
}

ThingList.propTypes    = propTypes
ThingList.defaultProps = defaultProps

export default ThingList
