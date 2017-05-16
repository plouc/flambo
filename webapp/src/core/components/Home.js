import React                     from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { Link }                  from 'react-router-dom'
import { FormattedMessage }      from 'react-intl'
import GroupsIcon                from 'react-icons/lib/md/people-outline'
import CollectionsIcon           from 'react-icons/lib/md/folder-open'
import SourcesIcon               from 'react-icons/lib/fa/bolt'
import ArrowIcon                 from 'react-icons/lib/md/keyboard-arrow-right'

import { themes }                from '../theme'
import { Grid }                  from './Grid'
import { Footer }                from './IndexGrid'


const Item = styled.div`
    height:        160px;
    display:       flex;
    padding:       12px;
    border:        2px solid ${props => props.theme.primaryColor};
    border-radius: 2px;
    color:         ${props => props.theme.primaryColor};
`

const Icon = styled.div`
    width:           132px;
    height:          132px;
    background:      #f3f4f8;
    color:           ${props => props.theme.secondaryColor};
    border:          1px solid ${props => props.theme.secondaryColor};
    display:         flex;
    justify-content: center;
    align-items:     center;
    font-size:       48px;
`

const Info = styled.div`
    margin:          6px 0 6px 24px;
    display:         flex;
    flex:            1;
    justify-content: space-between;
    flex-direction:  column;
`

const Title = styled.div`
    margin-bottom: 3px;
    font-weight:   600;
    font-size:     18px;
    font-family:   'Rajdhani', sans-serif;
`

const Description = styled.div`
    font-size: 14px;
`

const Home = () => (
    <div>
        <Grid
            style={{
                background: 'transparent',
            }}
        >
            <ThemeProvider theme={themes.groups}>
                <Link to="/groups">
                    <Item>
                        <Icon>
                            <GroupsIcon/>
                        </Icon>
                        <Info>
                            <div>
                                <Title>
                                    <FormattedMessage id="groups"/>
                                </Title>
                                <Description>
                                    <FormattedMessage id="groups_intro"/>
                                </Description>
                            </div>
                            <Footer style={{ fontSize: '24px' }}>
                                <ArrowIcon/>
                            </Footer>
                        </Info>
                    </Item>
                </Link>
            </ThemeProvider>
            <ThemeProvider theme={themes.collections}>
                <Link to="/collections">
                    <Item>
                        <Icon>
                            <CollectionsIcon/>
                        </Icon>
                        <Info>
                            <div>
                                <Title>
                                    <FormattedMessage id="collections"/>
                                </Title>
                                <Description>
                                    <FormattedMessage id="collections_intro"/>
                                </Description>
                            </div>
                            <Footer style={{ fontSize: '24px' }}>
                                <ArrowIcon/>
                            </Footer>
                        </Info>
                    </Item>
                </Link>
            </ThemeProvider>
            <ThemeProvider theme={themes.sources}>
                <Link to="/sources">
                    <Item>
                        <Icon>
                            <SourcesIcon/>
                        </Icon>
                        <Info>
                            <div>
                                <Title>
                                    <FormattedMessage id="sources"/>
                                </Title>
                                <Description>
                                    <FormattedMessage id="sources_intro"/>
                                </Description>
                            </div>
                            <Footer style={{ fontSize: '24px' }}>
                                <ArrowIcon/>
                            </Footer>
                        </Info>
                    </Item>
                </Link>
            </ThemeProvider>
        </Grid>
    </div>
)

export default Home
