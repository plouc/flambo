import React        from 'react'

import CommentsList from '../../comments/components/CommentsList'


const CollectionComments = props => (
    <CommentsList
        {...props}
        emptyMessageId="collection_comments_none"
    />
)

export default CollectionComments
