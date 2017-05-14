import React    from 'react'
import styled   from 'styled-components'


const Container = styled.div`
    background: white;
    boxShadow:  0 1px 2px rgba(0,0,0,0.07);
    padding:    12px 24px;
    font-size:  14px;
`

const ListItem = styled.div`
    padding:     12px 0;
    border-top:  1px solid #f3f4f8;
    
    &:first-child {
        border-width: 0;
    }
`

const Title = styled.div`
    font-weight:   500;
    color:         black;
`

const SourceJobs = ({ jobs }) => (
    <Container>
        {jobs.map(job => (
            <ListItem key={job.id}>
                <Title>{job.id} {job.status}</Title>
            </ListItem>
        ))}
    </Container>
)

export default SourceJobs
