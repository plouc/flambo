import React, { Component }       from 'react'
import Helmet                     from 'react-helmet'
import _                          from 'lodash'
import { Switch, Route, NavLink } from 'react-router-dom'
import styled                     from 'styled-components'
import Swagger                    from 'swagger-client'
import Operation                  from '../../../../core/components/swagger/operation'
import spec                       from './swagger.json'
import Home                       from './home'


const operations = []
const tags       = {}

const operationId = (method, path) => {
    return _.kebabCase(`${method.toLowerCase()} ${_.deburr(path)}`)
}

Object.keys(spec.paths).forEach(path => {
    Object.keys(spec.paths[path]).forEach(method => {
        const operation = Object.assign({},
            spec.paths[path][method],
            {
                method, path,
                id:     operationId(method, path),
            }
        )

        if (operation.tags) {
            operation.tags.forEach(tag => {
                if (!tags[tag]) tags[tag] = []
                tags[tag].push(operation)
            })
        }

        operations.push(operation)
    })
})

const Container = styled.div`
    display: grid;
    grid-template-columns: auto 200px;
    grid-column-gap: 36px;
`

const Header = styled.div`
    display: flex;
    align-items: flex-end;
    margin-bottom: 36px;
    justify-content: space-between;
`

const Title = styled.h1`
    //margin: 0;
    //padding: 0;
`

const Aside = styled.div`
    border-left: 1px solid rgba(0, 0, 0, .07);
`

const Nav = styled.nav`
    padding-top: 20px;
    position: sticky;
    top: 84px;
`

const Tag = styled.div`
    cursor: pointer;
    font-weight: 600;
    padding: 3px 0 3px 24px;
    margin-left: -1px;
    border-left: 1px solid transparent;
    color: #555;
    text-decoration: none;
    
    .active & {
        border-left-color: #17385d;
        color: #000;
    }
`

const OperationItem = styled.div`
    font-size: 14px;
    cursor: pointer;
    padding-left: 24px;
`

const ApiMeta = styled.span`
    font-family: 'Fira mono';
    font-size: 12px;
    border: 1px solid rgba(0, 0, 0, .2)
    line-height: 1em;
    border-radius: 2px;
    padding: 6px 9px;
    cursor: pointer;
`

class RestApiIndex extends Component {
    constructor(props) {
        super(props)

        this.state = {
            client: null,
        }
    }

    componentDidMount() {
        Swagger({ spec }).then(client => {
            this.setState({ client })
        })
    }

    render() {
        const { match }  = this.props
        const { client } = this.state

        let url
        if (client !== null) {
            const scheme   = (client.spec.schemes && client.spec.schemes.length > 0) ? client.spec.schemes[0] : 'http'
            const host     = client.spec.host || ''
            const basePath = client.spec.basePath || ''

            url = `${scheme}://${host}${basePath}`
        }

        return (
            <Container>
                <Helmet title="API"/>
                <div>
                    <Header>
                        <Title>API</Title>
                        {false && client && <ApiMeta>{url}</ApiMeta>}
                    </Header>
                    <Switch>
                        <Route path={match.url} exact component={Home}/>
                        {Object.keys(tags).map(tag => (
                            <Route key={tag} path={`${match.url}/${tag}`} render={() => {
                                return (
                                    <div>
                                        {tags[tag].map(operation => (
                                            <Operation
                                                key={operation.id}
                                                operation={operation}
                                                client={client}
                                            />
                                        ))}
                                    </div>
                                )
                            }}/>
                        ))}
                    </Switch>
                </div>
                <Aside>
                    <Nav>
                        <NavLink
                            to={match.url}
                            style={{ textDecoration: 'none' }}
                            exact
                            activeClassName="active"
                        >
                            <Tag>index</Tag>
                        </NavLink>
                        {Object.keys(tags).map(tag => (
                            <div key={tag}>
                                <NavLink
                                    to={`${match.url}/${tag}`}
                                    style={{ textDecoration: 'none' }}
                                    activeClassName="active"
                                >
                                    <Tag>{tag}</Tag>
                                </NavLink>
                                <Route path={`${match.url}/${tag}`} render={() => (
                                    <div>
                                        {tags[tag].map(operation => (
                                            <NavLink
                                                key={operation.id}
                                                to={{
                                                    pathname: `${match.url}/${tag}`,
                                                    search:   `?operation=${operation.id}`,
                                                }}
                                                style={{ textDecoration: 'none' }}
                                                activeClassName="active"
                                            >
                                                <OperationItem>
                                                    {operation.summary}
                                                </OperationItem>
                                            </NavLink>
                                        ))}
                                    </div>
                                )}/>
                            </div>
                        ))}
                    </Nav>
                </Aside>
            </Container>
        )
    }
}

export default RestApiIndex
