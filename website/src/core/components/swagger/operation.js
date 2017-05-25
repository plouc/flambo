import React, { Component } from 'react'
import styled     from 'styled-components'
import Spec from './operation_spec'
import Console from './operation_console'
import SpecIcon from 'react-icons/lib/md/info-outline'
import ConsoleIcon from 'react-icons/lib/fa/terminal'


const Container = styled.div`
    font-size: 14px;
    margin-bottom: 60px;
`

const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0 0 12px 0;
`

const Title = styled.h3`
    margin: 0 12px 0 0;
    padding: 0;
    font-size: 18px;
`

const HeaderInfo = styled.div`
    display: flex;
    align-items: center;
    line-height: 1em;
`

const PathInfo = styled.div`
    display: flex;
    align-items: center;
    margin-right: 12px;
`

const Method = styled.span`
    background: #6f9ad1;
    text-transform: uppercase;
    color: white;
    font-weight: 600;
    padding: 3px 6px;
    border-radius: 2px;
    font-size: 12px;
    margin-right: 9px;
`

const Path = styled.span`
    font-family: 'Fira mono';
`

const ModeButton = styled.span`
    line-height: 1em;
    cursor: pointer;
    color: #17385d;
    border: 1px solid #17385d;
    padding: 6px 9px 6px 6px;
    border-radius: 2px;
    user-select: none;
    white-space: pre;
    
    &:hover {
        background: #17385d;
        color: white;
    }
`

class Operation extends Component {
    constructor(props) {
        super(props)

        this.state = {
            mode: 'spec',
        }
    }

    handleModeUpdate = mode => {
        this.setState({ mode })
    }

    render() {
        const { operation, client } = this.props
        const { mode } = this.state

        return (
            <Container id={operation}>
                <Header>
                    <HeaderInfo>
                        <Title>{operation.summary}</Title>
                        <PathInfo>
                            <Method>{operation.method}</Method>
                            <Path>{operation.path}</Path>
                        </PathInfo>
                    </HeaderInfo>
                    {false && mode === 'spec' && client !== null && (
                        <ModeButton
                            onClick={() => { this.handleModeUpdate('console') }}
                        >
                            <ConsoleIcon style={{ marginRight: 6 }}/>
                            console
                        </ModeButton>
                    )}
                    {mode === 'console' && (
                        <ModeButton
                            onClick={() => { this.handleModeUpdate('spec') }}
                        >
                            <SpecIcon style={{ marginRight: 6 }}/>
                            specification
                        </ModeButton>
                    )}
                </Header>
                {mode === 'console' && client !== null && (
                    <Console
                        operation={operation}
                        client={client}
                    />
                )}
                {mode === 'spec' && <Spec operation={operation}/>}
            </Container>
        )
    }
}

export default Operation