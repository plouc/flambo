import React, { Component, PropTypes } from 'react'
import SourceTypeSelectorItem          from './SourceTypeSelectorItem'

const types = [
    { value: 'twitter', label: 'Twitter' },
    { value: 'rss',     label: 'RSS'     },
    { value: 'meetup',  label: 'Meetup' },
]


const SourceTypeSelector = ({ value, onChange }) => (
    <div className="button-group">
        {types.map(type => (
            <SourceTypeSelectorItem
                key={type.value}
                onSelect={onChange}
                isSelected={value === type.value}
                {...type}
            />
        ))}
    </div>
)

SourceTypeSelector.propTypes = {
    value:    PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
}


export default SourceTypeSelector
