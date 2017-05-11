import React        from 'react'
import styled       from 'styled-components'

import CommentsList from '../../comments/components/CommentsList'


const Container = styled.div`
    background-color: #fff;
    box-shadow:       0 1px 2px rgba(0, 0, 0, .07);
    border-radius:    3px;
`

const GroupComments = ({ comments }) => (
    <Container>
        <CommentsList comments={comments}/>
    </Container>
)

export default GroupComments
