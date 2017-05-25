import React, { Component } from 'react'
import PropTypes            from 'prop-types'
import styled               from 'styled-components'
import Tabs                 from './tabs'


const StatusCode = styled.span`
    font-family: 'Fira mono';
    font-weight: 600;
`

class Responses extends Component {
    render() {
        const { responses } = this.props

        const responseTypes = Object.keys(responses)

        if (responseTypes.length === 0) return null

        return (
            <Tabs
                title="response"
                tabWidth={56}
                tabs={responseTypes.map(type => ({
                    id:     type,
                    label:  <StatusCode>{type}</StatusCode>,
                    render: () => {
                        const response = responses[type]

                        return (
                            <div>
                                {response.description}
                            </div>
                        )
                    },
                }))}
            />
        )
    }
}

Responses.propTypes = {
    responses: PropTypes.object.isRequired,
}

Responses.defaultProps = {
    responses: {},
}

export default Responses
