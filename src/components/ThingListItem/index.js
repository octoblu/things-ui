import _ from 'lodash'
import React, { PropTypes } from 'react'
import { Link } from 'react-router'

const propTypes = {
  thing: PropTypes.object,
}

const defaultProps = {
  thing: null,
}

const ThingListItem = ({ thing }) => {
  if (_.isEmpty(thing)) return null
  if (_.isEmpty(thing.uuid)) return null

  const { name, uuid } = thing

  return (
    <div>
      <Link to={`/things/${uuid}`}>
        {name || "no-name"}
      </Link>
    </div>
  )
}

ThingListItem.propTypes    = propTypes
ThingListItem.defaultProps = defaultProps

export default ThingListItem
