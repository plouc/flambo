import React, { Component, PropTypes } from 'react'


class SourceTypeSelectorItem extends Component {
    constructor(props) {
        super(props)

        this.handleClick = this.handleClick.bind(this)
    }

    handleClick() {
        const { value, onSelect } = this.props
        onSelect(value)
    }

    render() {
        const { label, isSelected } = this.props

        return (
            <span
                onClick={this.handleClick}
                className="button"
            >
                {label}
            </span>
        )
    }
}

SourceTypeSelectorItem.propTypes = {
    onSelect:   PropTypes.func.isRequired,
    isSelected: PropTypes.bool.isRequired,
}


export default SourceTypeSelectorItem
