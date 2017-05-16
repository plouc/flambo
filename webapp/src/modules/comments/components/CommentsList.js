import React, { PropTypes }                    from 'react'
import styled                                  from 'styled-components'
import { Link }                                from 'react-router-dom'
import { FormattedRelative, FormattedMessage } from 'react-intl'
import DiscussionsIcon                         from 'react-icons/lib/go/comment-discussion'

import Loader                                  from '../../../core/components/Loader'
import Form                                    from '../containers/CommentFormContainer'


const Container = styled.div`
    background-color: #fff;
    box-shadow:       0 1px 2px rgba(0, 0, 0, .07);
    min-height:       260px;
`

const List = styled.div`
    padding:  12px 24px;
    position: relative;
`

const ListItem = styled.div`
    display:       flex;
    align-items:   flex-start;
    font-size:     14px;
    margin-bottom: 24px;
`

const AuthorAvatar = styled.div`
    width:               36px;
    height:              36px;
    margin-right:        24px;
    background-size:     cover;
    background-color:    #fff;
    background-repeat:   no-repeat;
    background-position: center center;
    background-image:    ${props => props.url ? `url(${props.url})` : 'none'};
    border:              1px solid rgba(0, 0, 0, .1);
`

const AuthorName = styled.span`
    color:        ${props => props.theme.primaryTextColor};
    display:      inline-block;
    margin-right: 9px;
    font-weight:  500;
`

const CreatedAt = styled.span`
    color:   #999;
    display: inline-block;
`

const Main = styled.div`
    flex-grow: 1;
`

const Content = styled.div`
    width:         100%;
    margin-bottom: 3px;
    border-radius: 2px;
    color:         #000;
`

const Footer = styled.div`
    display:         flex;
    font-size:       12px;
    justify-content: flex-start;
`

const Empty = styled.div`
    display:        flex;
    flex-direction: column;
    align-items:    center;
    color:          #ddd;
    padding:        24px;
`

const EmptyMessage = styled.div`
    color:      #777;
    margin-top: 36px;
    font-size:  14px;
`

const CommentsList = ({
    hasBeenFetched,
    isFetching,
    comments,
    emptyMessageId,
    canComment,
    me,
    comment,
    isCreating,
    onCancel,
}) => {
    return (
        <Container>
            {isFetching && <Loader/>}
            {canComment && me && (
                <Form
                    me={me}
                    onSubmit={comment}
                    onCancel={onCancel}
                    isSubmitting={isCreating}
                />
            )}
            {hasBeenFetched && comments.length === 0 && (
                <Empty>
                    <DiscussionsIcon size={96}/>
                    <EmptyMessage>
                        <FormattedMessage id={emptyMessageId}/>
                    </EmptyMessage>
                </Empty>
            )}
            <List>
                {hasBeenFetched && comments.map(comment => (
                    <ListItem key={comment.id}>
                        <Link to={`/users/${comment.author.id}`}>
                            <AuthorAvatar
                                url={comment.author.avatar ? comment.author.avatar.url : null}
                            />
                        </Link>
                        <Main>
                            <Content>
                                {comment.content}
                            </Content>
                            <Footer>
                                <AuthorName>
                                    <Link to={`/users/${comment.author.id}`}>
                                        {comment.author.last_name} {comment.author.first_name}
                                    </Link>
                                </AuthorName>
                                <CreatedAt>
                                    <FormattedRelative value={comment.created_at}/>
                                </CreatedAt>
                            </Footer>
                        </Main>
                    </ListItem>
                ))}
            </List>
        </Container>
    )
}

CommentsList.propTypes = {
    hasBeenFetched: PropTypes.bool.isRequired,
    isFetching:     PropTypes.bool.isRequired,
    comments:       PropTypes.array.isRequired,
    emptyMessageId: PropTypes.string.isRequired,
    comment:        PropTypes.func,
    isCreating:     PropTypes.bool,
    canComment:     PropTypes.bool.isRequired,
    me:             PropTypes.object,
}

CommentsList.defaultProps = {
    emptyMessageId: 'comments_none',
    canComment:     true,
}

export default CommentsList
