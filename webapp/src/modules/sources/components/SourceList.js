import React, { Component, PropTypes } from 'react'
import SourceListItem                  from './SourceListItem'


const SourceList = ({ sources }) => (
    <ul className="list">
        {sources.map(source => (
            <SourceListItem key={source.id} source={source}/>
        ))}
    </ul>
)

SourceList.propTypes = {
    sources: PropTypes.array.isRequired,
}


export default SourceList
