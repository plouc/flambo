import React                from 'react'
import _                    from 'lodash'
import { Link }             from 'react-router-dom'
import { FormattedMessage } from 'react-intl'
import styled               from 'styled-components'


const Container = styled.div`
    display:     inline-flex;
    align-items: center;
    font-size:   14px;
    line-height: 18px;
`

const Avatar = styled.span`
    width:               36px;
    height:              36px;
    background-image:    url(${props => props.url});
    background-size:     cover;
    margin-right:        12px;
    background-repeat:   no-repeat;
    background-position: center center;
    border:              1px solid rgba(0, 0, 0, .1);
`

const Name = styled.span`
    font-weight: 500;
`

const RelatedUser = ({ user, messageId, avatarUrlKey, ...props }) => {
    if (!user) return null

    const fullname = <Name>{user.last_name}&nbsp;{user.first_name}</Name>

    let message = fullname
    if (messageId) {
        message = (
            <FormattedMessage
                id={messageId}
                values={{ user: fullname }}
            />
        )
    }

    const avatarUrl = _.get(user, avatarUrlKey)

    return (
        <Link to={`/users/${user.id}`}>
            <Container {...props}>
                {avatarUrl && <Avatar url={avatarUrl}/>}
                {message}
            </Container>
        </Link>
    )
}

RelatedUser.defaultProps = {
    avatarUrlKey: 'avatar.url',
}

export default RelatedUser
