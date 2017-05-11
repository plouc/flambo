'use strict'

import React, { PropTypes } from 'react'
import SourceTopics         from './SourceTopics'
import sourceTitle          from '../../../lib/sourceTitle'


const SourceSubHeader = ({ source, isFetching }) => {
    if (isFetching) {
        return <section className="sub-header" />
    }

    return (
        <section className="section sub-header">
            <div>{sourceTitle(source)}</div>
        </section>
    )
}

SourceSubHeader.propTypes = {
    isFetching: PropTypes.bool.isRequired,
    source:     PropTypes.object,
}


export default SourceSubHeader
