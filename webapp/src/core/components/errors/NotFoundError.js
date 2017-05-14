import React, { PropTypes } from 'react'
import { FormattedMessage } from 'react-intl'
import styled               from 'styled-components'


const Container = styled.div`
    text-align: center;
    padding:    60px 30px;
`

const Status = styled.div`
    font-weight: 100;
    font-size:   220px;
    color:       #ddd;    
`

const NotFoundError = ({
    error: {
        message,
        data,
    }
}) => (
    <Container>
        <Status>OOPS!</Status>
        <div>
            <FormattedMessage id={message} values={data} />
        </div>
    </Container>
)

NotFoundError.propTypes = {
    error: PropTypes.object.isRequired,
}

export default NotFoundError
