import _ from 'lodash'
import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import Button from 'zooid-button'
import Input from 'zooid-input'

import styles from './styles.css'

const propTypes = {}
const defaultProps = {}

const ThingListActions = () => {
  return (
    <div className={styles.root}>
      <Button kind="hollow-primary" block>Add to Collection</Button>
      <Button kind="hollow-danger" block>Delete</Button>
    </div>
  )
}

ThingListActions.propTypes    = propTypes
ThingListActions.defaultProps = defaultProps

export default ThingListActions
