'use strict'

import React, { Component, PropTypes }         from 'react'
import { Link, hashHistory }                   from 'react-router'
import { FormattedMessage, FormattedRelative } from 'react-intl'
import SourceCollectButton                     from '../containers/SourceCollectButton'


const stopPropagation = e => e.stopPropagation()
const clickHandler    = id => () => hashHistory.push(`/sources/${id}`)

const SourceListItem = ({ source }) => (
    <div
        className={`list-item list-item--source list-item--${source.type}`}
        onClick={clickHandler(source.id)}
    >
        <span className="item-title" to={`/sources/${source.id}`}>
            {source.name}
        </span>
        <span className="item-date">
            <FormattedRelative value={source.createdAt} updateInterval={60000} />
        </span>
        <div className="list-item__controls button-group">
            <Link
                to={`/sources/${source.id}/edit`}
                className="button button--action button--small"
                onClick={stopPropagation}
            >
                <FormattedMessage id="edit" />
            </Link>
            <SourceCollectButton
                sourceId={source.id}
                className="button button--action button--small"
            />
        </div>
    </div>
)

SourceListItem.propTypes = {
    source: PropTypes.shape({
        id:   PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
    }).isRequired,
}


export default SourceListItem
