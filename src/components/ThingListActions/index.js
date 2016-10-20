import _ from 'lodash'
import pluralize from 'pluralize'
import React, { PropTypes } from 'react'
import Button from 'zooid-button'

import styles from './styles.css'

const propTypes = {
  onClearSelection: PropTypes.func,
  onDeleteDialogShow: PropTypes.func,
  onTagDialogShow: PropTypes.func,
  selectedThings: PropTypes.array,
}

const defaultProps = {
  selectedThings: [],
}

const ThingListActions = (props) => {
  const {
    onClearSelection,
    onDeleteDialogShow,
    onTagDialogShow,
    selectedThings,
  } = props

  if (_.isEmpty(selectedThings)) return null

  return (
    <div className={styles.root}>
      <div>{`${selectedThings.length} ${pluralize('Thing', selectedThings.length)} selected`}</div>
      <Button kind="no-style" onClick={onTagDialogShow}>Tag</Button>
      <Button kind="no-style" onClick={onDeleteDialogShow}>Delete</Button>
      <Button kind="no-style" onClick={onClearSelection}>Clear Selection</Button>
    </div>
  )
}

ThingListActions.propTypes    = propTypes
ThingListActions.defaultProps = defaultProps

export default ThingListActions
