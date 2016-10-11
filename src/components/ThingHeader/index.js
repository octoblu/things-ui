import _ from 'lodash'
import React, { PropTypes } from 'react'
import Heading from 'zooid-heading'

const propTypes = {
  thing: PropTypes.object,
}

const defaultProps = {
  thing: null,
}

const ThingHeader = ({ thing }) => {
  if (_.isEmpty(thing)) return null

  const { name, type } = thing

  return (
    <header>
      <Heading level={3}>{name}</Heading>
      <Heading level={5}>{type}</Heading>
    </header>
  )
}

ThingHeader.propTypes    = propTypes
ThingHeader.defaultProps = defaultProps

export default ThingHeader
