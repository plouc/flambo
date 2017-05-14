import React, { Component, PropTypes } from 'react'
import styled                          from 'styled-components'


const Container = styled.span`
    margin-right: 12px;
    cursor:       pointer;
    color:        ${props => props.isActive ? '#000' : '#bbb'};
    font-weight:  ${props => props.isActive ? '500' : '400'};
    user-select:  none;
`

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
            <Container
                onClick={this.handleClick}
                isActive={value === perPage}
            >
                {value}
            </Container>
        )
    }
}

PagerPerPageItem.propTypes = {
    perPage:  PropTypes.number.isRequired,
    value:    PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
}


export default PagerPerPageItem
