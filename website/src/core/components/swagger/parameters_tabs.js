import React, { Component } from 'react'
import Parameters           from './parameters'
import PropTypes            from 'prop-types'
import Tabs                 from './tabs'


class ParametersTabs extends Component {
    constructor(props) {
        super(props)

        this.state = {
            types:          [],
            hasParams:      false,
            hasPathParams:  false,
            hasQueryParams: false,
        }
    }

    handlePropsUpdate = props => {
        const { path, query, body } = props

        const hasPathParams  = path.length  > 0
        const hasQueryParams = query.length > 0
        const hasBodyParams  = body.length  > 0
        const hasParams      = hasPathParams || hasQueryParams || hasBodyParams

        const types          = []

        if (hasParams) {
            if (hasPathParams)  types.push('path')
            if (hasQueryParams) types.push('query')
            if (hasBodyParams)  types.push('body')
        }

        this.setState({
            types,
            hasParams,
            hasPathParams,
            hasQueryParams,
        })
    }

    componentDidMount = () => {
        this.handlePropsUpdate(this.props)
    }

    componentWillReceiveProps = nextProps => {
        this.handlePropsUpdate(nextProps)
    }

    render() {
        const { types, hasParams } = this.state

        if (!hasParams) return null

        return (
            <Tabs
                title="parameters"
                tabs={types.map(type => ({
                    id:     type,
                    label:  type,
                    render: () => (
                        <Parameters
                            type={type}
                            parameters={this.props[type]}
                        />
                    ),
                }))}
            />
        )
    }
}

ParametersTabs.propTypes = {
    path:  PropTypes.array.isRequired,
    query: PropTypes.array.isRequired,
    body:  PropTypes.array.isRequired,
}

ParametersTabs.defaultProps = {
    path:  [],
    query: [],
    body:  [],
}

export default ParametersTabs