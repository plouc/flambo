import React        from 'react'

import CommentsList from '../../comments/components/CommentsList'


const GroupComments = props => (
    <CommentsList
        {...props}
        emptyMessageId="group_comments_none"
    />
)

export default GroupComments
