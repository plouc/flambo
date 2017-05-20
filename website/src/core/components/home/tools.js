import React    from 'react'
import styled   from 'styled-components'


const Container = styled.div`
    background: white;
    box-shadow: 0 1px 2px rgba(0, 0, 0, .07);
`

const InnerContainer = styled.div`
    max-width: 1080px;
    margin: 0 auto;
`

export default () => (
    <Container>
        <InnerContainer>
            <h3>Tools</h3>
        </InnerContainer>
    </Container>
)