import _ from 'lodash'
import React, { PropTypes } from 'react'

const propTypes = {
  thing: PropTypes.object,
}

const defaultProps = {
  thing: null,
}

const ThingName = ({ thing }) => {
  const { name, uuid } = thing

  if (_.isEmpty(name)) return <div>{uuid}</div>

  return <div>{name}</div>
}

ThingName.propTypes    = propTypes
ThingName.defaultProps = defaultProps

export default ThingName
