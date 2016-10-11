import _ from 'lodash'
import React, { PropTypes } from 'react'
import Page from 'zooid-page'

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

  return <Page className={styles.root} width="medium">{thingItems}</Page>
}

ThingList.propTypes    = propTypes
ThingList.defaultProps = defaultProps

export default ThingList
