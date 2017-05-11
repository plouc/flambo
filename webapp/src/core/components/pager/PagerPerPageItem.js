import React, { Component, PropTypes } from 'react'


class PagerPerPageItem extends Component {
    constructor(props) {
        super(props)

        this.handleClick = this.handleClick.bind(this)
    }

    handleClick() {
        const { value, onChange } = this.props
        onChange(value)
    }

    render() {
        const { value, perPage } = this.props

        return (
            <span
                onClick={this.handleClick}
                className={`pager__per-page__item${value === perPage ? ' _is-active' : ''}`}
            >
                {value}
            </span>
        )
    }
}

PagerPerPageItem.propTypes = {
    perPage:  PropTypes.number.isRequired,
    value:    PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
}


export default PagerPerPageItem
