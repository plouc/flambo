import React     from 'react'
import { Link }  from 'react-router-dom'
import styled    from 'styled-components'

import BannerImg from '../../../../assets/images/banner_screenshot.png'
import Workflow  from './workflow'
import Tools     from './tools'

const Banner = styled.div`
    background: #17385d;
    width: 100%;
    height: 340px;
    color: white;
    overflow: hidden;
    position: relative;
`

const InnerBanner = styled.div`
    max-width: 1080px;
    height: 100%;
    margin: 0 auto;
    position: relative;
`

const BannerShadow = styled.div`
    box-shadow: 0 -5px 7px rgba(0, 0, 0, 0.07) inset;
    height: 100%;
    position: absolute;
    width: 100%;
    left: 0px;
    top: 0px;
`

const BannerTitle = styled.h1`
    padding-top: 36px;
    line-height: 1.1em;
    font-weight: 700;
    font-size: 42px;
`

const BannerImage = styled.img`
    max-width: 50%;
    max-height: 100%;
    position: absolute;
    right: 0;
    bottom: 0;
`

const InfoBar = styled.div`
    background: white;
    height: 60px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, .07);
    color: #777;
    
    & a {
        color: #17385d;
        font-weight: 600;
        text-decoration: none;
    }
    & a:hover {
        text-decoration: underline;
    }
`

const InnerInfoBar = styled.div`
    max-width: 1080px;
    margin: 0 auto;
    height: 60px;
    display: flex;
    align-items: center;
`

const Container = styled.div`
    max-width: 1080px;
    margin: 12px auto 12px;
    padding-bottom: 60px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 36px;
    
    & a {
        color: #17385d;
        font-weight: 600;
        text-decoration: none;
    }
    & a:hover {
        text-decoration: underline;
    }
`

const List = styled.ul`
    margin: 0;
    padding-left: 24px;
    list-style-type: square;
`

const ListItem = styled.li`
    margin-bottom: 9px;
`

export default () => (
    <div>
        <Banner>
            <InnerBanner>
                <BannerTitle>The open-source<br/>content aggregation<br/>platform.</BannerTitle>
                <BannerImage src={BannerImg} alt="flambo"/>
            </InnerBanner>
            <BannerShadow/>
        </Banner>
        <InfoBar>
            <InnerInfoBar>
                This website is currently under heavy development, so do not hesitate to directly check the
                project status on&nbsp;<a href="https://github.com/plouc/flambo" target="_blank">GitHub</a>.
            </InnerInfoBar>
        </InfoBar>
        <Container>
            <Workflow/>
            <div>
                <h2>Intro</h2>
                <p>
                    Nowadays it's pretty easy to get data on almost every topic, from how to
                    deploy a complete HA microservice based project on AWS to how to make
                    a chrome effect in photoshop (however you'll probably have to search for
                    old HTML table based websites for this one…).
                </p>
                <h3>Nice, so what?</h3>
                <p>
                    Unfortunately, several problems arise :
                </p>
                <List>
                    <ListItem>
                        It's too easy and sometimes intrusive, making filtering difficult,
                        manually picking up the relevant parts from 3 newsletters, 10 rss feeds,
                        two specific websites and some twitter feeds is almost impossible,
                        and you just skip in the end.
                    </ListItem>
                    <ListItem>
                        If you're a company and let your employees check twitter or facebook
                        to theoretically follow news about your business, it will often ends up
                        with animated gifs involving cats…
                    </ListItem>
                    <ListItem>
                        While some resources can be easily shared (like a tweet), it's more
                        difficult for newsletters or rss feed without sharing the whole source,
                        which brings us back to first point…
                    </ListItem>
                </List>
            </div>
        </Container>
            <Tools/>
        <Container>
            <div>
                <h2>Features</h2>
                <List>
                    <ListItem>Groups to help grouping data by topic</ListItem>
                    <ListItem>Collections to let users manage their very own feed</ListItem>
                    <ListItem>Sources pull data from various providers, for now:</ListItem>
                    <ListItem>RSS feeds</ListItem>
                    <ListItem>Meetup</ListItem>
                    <ListItem>hoping to add more in the future (contributions are welcome :))</ListItem>
                </List>
                <h2>Components</h2>
                <p>flambo is made up of several components:</p>
                <List>
                    <ListItem>
                        an API, available in both <Link to="/doc/rest-api">Rest</Link>{' '}
                        and <Link to="/doc/graphql-api">GraphQL</Link>
                    </ListItem>
                    <ListItem>
                        a <strong><Link to="/doc/bot">chatbot</Link></strong> to let you
                        easily integrate flambo in your everyday communication
                        tools
                    </ListItem>
                    <ListItem>
                        a web <Link to="/doc/webapp">GUI</Link> to administer flambo & consult collected data
                    </ListItem>
                    <ListItem>
                        a <Link to="/doc/cli">Command Line Interface</Link>
                    </ListItem>
                    <ListItem>
                        and <Link to="/doc/api-client">few other Node.js packages</Link> on which top level components depend
                    </ListItem>
                </List>
            </div>
            <div>
                <h2>Proposal</h2>
                <p>
                    Delegate data collection to a tool using some predefined qualifiers,
                    let your teams do some collaborative filtering, instead of a single person
                    processing tons of posts, tweets & Co, several people can contribute.
                </p>
                <p>
                    Integrate the data collection in tools you use everyday to communicate,
                    like chats, using a chatbot, and let the users enrich the database from it.
                </p>
                <p>
                    Provide several restitution channels (the previously mentioned chatbot is one
                    of them), but you should also expose some dedicated rss feeds or use
                    the dedicated UI, and if you're dealing with some IT folks you could
                    eventually let them use a CLI tool.
                </p>
                <p>
                    Make the solution modular and versatile, allowing developers to easily
                    add more source and restitution channel types.
                </p>
            </div>
        </Container>
    </div>
)