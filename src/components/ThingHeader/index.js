import _ from 'lodash'
import React, { PropTypes } from 'react'
import Heading from 'zooid-heading'

import ThingName from '../ThingName'

const propTypes = {
  thing: PropTypes.object,
}

const defaultProps = {
  thing: null,
}
  
const ThingHeader = ({ thing }) => {
  if (_.isEmpty(thing)) return null

  return (
    <header>
      <Heading level={3}><ThingName thing={thing} /></Heading>
      <Heading level={5}>{thing.type}</Heading>
    </header>
  )
}

ThingHeader.propTypes    = propTypes
ThingHeader.defaultProps = defaultProps

export default ThingHeader
