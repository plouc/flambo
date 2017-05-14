import React, { PropTypes } from 'react'
import { FormattedMessage } from 'react-intl'
import Paper                from 'material-ui/Paper'
import scrollTopWhenAppear  from '../scrollTopWhenAppear'

const styles = {
    container: {
        margin:         '30px',
        display:        'flex',
        flexDirection:  'row',
        justifyContent: 'center',
    },
    card: {
        width:          '960px',
        padding:        '20px 30px',
    },
}

const ValidationError = ({
    error: { data: { details } },
    style,
}) => (
    <div style={{ ...styles.container, ...style }}>
        <Paper style={styles.card}>
            <h3>
                <FormattedMessage id="validation_error"/>
            </h3>
            <ul>
                {details.map(detail => {
                    return (
                        <li key={`${detail.path}.${detail.type}`}>
                            {detail.message} ({detail.path})
                        </li>
                    )
                })}
            </ul>
        </Paper>
    </div>
)

ValidationError.propTypes = {
    error: PropTypes.object.isRequired,
    style: PropTypes.object.isRequired,
}

ValidationError.defaultProps = {
    style: {},
}

export default scrollTopWhenAppear(ValidationError)
