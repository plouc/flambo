import React, { Component, PropTypes }         from 'react'
import { Link, hashHistory }                   from 'react-router'
import { FormattedMessage, FormattedRelative } from 'react-intl'
import SourceTopics                            from './SourceTopics'
import SourceCollectButton                     from '../containers/SourceCollectButton'


const stopPropagation = e => e.stopPropagation()
const clickHandler    = id => () => hashHistory.push(`/sources/${id}`)

const SourceListItem = ({ source }) => (
    <li className="list-item" onClick={clickHandler(source.id)}>
        <span className="item-title" to={`/sources/${source.id}`}>
            [{source.type}] {source.name}
        </span>
        <SourceTopics source={source} topics={source.topics}/>
        <span className="item-date">
            <FormattedRelative value={source.createdAt} updateInterval={60000} />
        </span>
        <div className="list-item__controls">
            <Link
                to={`/sources/${source.id}/edit`}
                className="button button--outline button--small"
                onClick={stopPropagation}
            >
                <FormattedMessage id="edit" />
            </Link>
            <SourceCollectButton
                sourceId={source.id}
                className="button--outline button--small"
            />
        </div>
    </li>
)

SourceListItem.propTypes = {
    source: PropTypes.shape({
        id:   PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
    }).isRequired,
}


export default SourceListItem
