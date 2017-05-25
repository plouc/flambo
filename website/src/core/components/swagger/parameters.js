import React     from 'react'
import PropTypes from 'prop-types'
import Parameter from './parameter'


const Parameters = ({ parameters }) => {
    return (
        <table style={{ fontSize: '13px' }}>
            <thead>
                <tr>
                    <th>
                        name
                    </th>
                    <th>
                        type
                    </th>
                    <th>
                        default
                    </th>
                    <th>
                        description
                    </th>
                </tr>
            </thead>
            <tbody>
                {parameters.map(param => (
                    <Parameter key={param.name} parameter={param}/>
                ))}
            </tbody>
        </table>
    )
}

Parameters.propTypes = {
    type:       PropTypes.oneOf(['path', 'query', 'body']).isRequired,
    parameters: PropTypes.array.isRequired,
}

export default Parameters
