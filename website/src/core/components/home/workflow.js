import React    from 'react'
import { Link } from 'react-router-dom'
import styled   from 'styled-components'

import WorkflowImg from '../../../../assets/images/workflow.png'


const Container = styled.div`
    padding: 24px 0;
    position: relative;
    min-height: 648px;
`

const Schema = styled.img`
    height: 600px;
    position: absolute;
    top: 24px;
    left: 0;
`

const Legend = styled.div`
    position: absolute;
    //background: #F00;
    right: 0;
    //left: 179px;
    left: 220px;
`

const Title = styled.h3`
    margin: -12px 0 6px;
    padding: 0;
    font-size: 16px;
    font-weight: 800;
    line-height: 1em;
`

const Body = styled.div`
    font-size: 14px;
    line-height: 20px;
    //display: none;
`

export default () => (
    <Container>
        <Schema src={WorkflowImg} alt="flambo workflow"/>
        <Legend style={{ top: 146 }}>
            <Title>expose.</Title>
            <Body>
                expose your data to multiple channels<br/>
                <Link to="/doc/api">API</Link>,{' '}
                <Link to="/doc/webapp">webapp</Link>,{' '}
                <Link to="/doc/bot">bot</Link>{' '}
                or even a <Link to="/doc/cli">CLI</Link>{' '}
            </Body>
        </Legend>
        <Legend style={{ top: 249 }}>
            <Title>store.</Title>
            <Body>
                store your qualified data in a robust
                data store.
            </Body>
        </Legend>
        <Legend style={{ top: 353 }}>
            <Title>qualify.</Title>
            <Body>
                qualify the collected data, add meta
                or decorate with images…
            </Body>
        </Legend>
        <Legend style={{ top: 456 }}>
            <Title>collect.</Title>
            <Body>
                collect data from various sources,
                from rss feeds to internal chats{' '}
                <Link to="/doc/sources">and many more</Link>…
            </Body>
        </Legend>
    </Container>
)