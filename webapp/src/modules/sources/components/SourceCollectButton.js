import React, { PropTypes } from 'react'
import { FormattedMessage } from 'react-intl'
import classNames           from 'classnames'


const stopPropagation = handler => event => {
    event.stopPropagation()
    handler(event)
}

const SourceCollectButton = ({ sourceId, className = '', onClick }) => (
    <span className={classNames('button', className)} onClick={stopPropagation(onClick)}>
        <FormattedMessage id="source.collect" />
    </span>
)

SourceCollectButton.propTypes = {
    sourceId:  PropTypes.string.isRequired,
    className: PropTypes.string,
    onClick:   PropTypes.func.isRequired,
}


export default SourceCollectButton