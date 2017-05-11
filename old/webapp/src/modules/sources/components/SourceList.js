'use strict'

import React, { PropTypes } from 'react'
import SourceListItem       from './SourceListItem'
import ContentLoading       from '../../core/components/ContentLoading'


const SourceList = ({ loading, sources }) => (
    <ContentLoading loading={loading} hasItem={sources.length > 0}>
        <div>
            {sources.map(source => (
                <SourceListItem key={source.id} source={source}/>
            ))}
        </div>
    </ContentLoading>
)

SourceList.propTypes = {
    loading: PropTypes.bool.isRequired,
    sources: PropTypes.array.isRequired,
}


export default SourceList
