import _ from 'lodash'
import React, { PropTypes } from 'react'

import ThingListItem from '../ThingListItem'

import styles from './styles.css'

const propTypes = {
  things: PropTypes.array,
}

const defaultProps = {
  things: [],
}

const ThingList = ({ things }) => {
  if (_.isEmpty(things)) return null

  const thingItems = _.map(things, thing => <ThingListItem thing={thing} key={thing.uuid} />)

  return <div className={styles.root}>{thingItems}</div>
}

ThingList.propTypes    = propTypes
ThingList.defaultProps = defaultProps

export default ThingList
