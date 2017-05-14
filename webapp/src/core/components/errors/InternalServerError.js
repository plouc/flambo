import React, { PropTypes } from 'react'
import { FormattedMessage } from 'react-intl'
import Paper                from 'material-ui/Paper'

const styles = {
    container: {
        margin:        '30px 30px 0',
        display:       'flex',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    card: {
        width:          '960px',
        padding:        '20px 30px',
    },
}

const InternalServerError = ({ error }) => {
    return (
        <div style={styles.container}>
            <Paper style={styles.card}>
                <h3>
                    <FormattedMessage id="internal_server_error"/>
                </h3>
                {error.data && error.data.message && (
                    <p>{error.data.message}</p>
                )}
            </Paper>
        </div>
    )
}

InternalServerError.propTypes = {
    error: PropTypes.object.isRequired,
}

export default InternalServerError
