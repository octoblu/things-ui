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

  return (
    <div>
      <Heading level={3}>Jason Thing</Heading>
      <Heading level={5}>Fancy Type</Heading>
    </div>
  )
}

ThingHeader.propTypes    = propTypes
ThingHeader.defaultProps = defaultProps

export default ThingHeader
