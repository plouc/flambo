import React from 'react'
import {Link} from 'react-router'
import Breakpoint from 'components/Breakpoint'
import find from 'lodash/find'
import {prefixLink} from 'gatsby-helpers'
import {config} from 'config'

import typography from 'utils/typography'
const {rhythm} = typography
import { inactiveColors, activeColors } from 'utils/colors'


module.exports = React.createClass({
    propTypes () {
        return {
            route: React.PropTypes.object,
        }
    },

    contextTypes: {
        router: React.PropTypes.object.isRequired,
    },

    handleTopicChange (e) {
        return this.context.router.push(e.target.value)
    },

    render () {
        const childPages = []
        Object.keys(config.docNav).map(component => {
            const componentConfig = config.docNav[component]
            const page            = find(this.props.route.pages, { path: componentConfig.path })

            const childPage = {
                title:    page.data.title,
                path:     page.path,
                children: [],
            }

            if (componentConfig.children) {
                componentConfig.children.forEach(child => {
                    const subPage = find(this.props.route.pages, { path: child })

                    childPage.children.push({
                        title: subPage.data.title,
                        path:  subPage.path,
                    })
                })
            }

            childPages.push(childPage)
        })

        const docOptions = childPages.map((child) =>
            <option
                key={prefixLink(child.path)}
                value={prefixLink(child.path)}
            >
                {child.title}
            </option>
        )

        const docPages = childPages.map((child) => {
            const isActive = this.props.location.pathname.startsWith(prefixLink(child.path))

            return (
                <li
                    key={child.path}
                    style={{
                        marginBottom: rhythm(1 / 2),
                    }}
                >
                    <Link
                        to={prefixLink(child.path)}
                        style={{
                            textDecoration: 'none',
                            color:          isActive ? activeColors.bg : inactiveColors.bg,
                            fontWeight:     isActive ? '500' : '400',
                        }}
                    >
                        {child.title}
                    </Link>
                    {child.children.length > 0 && isActive && (
                        <ul>
                            {child.children.map(subChild => {
                                const subIsActive = this.props.location.pathname.startsWith(prefixLink(subChild.path))

                                return (
                                    <li
                                        key={subChild.path}
                                        style={{
                                            marginBottom: rhythm(1 / 2),
                                        }}
                                    >
                                        <Link
                                            to={prefixLink(subChild.path)}
                                            style={{
                                                textDecoration: 'none',
                                                color:          subIsActive ? activeColors.bg : inactiveColors.bg,
                                                fontWeight:     subIsActive ? '500' : '400',
                                            }}
                                        >
                                            {subChild.title}
                                        </Link>
                                    </li>
                                )
                            })}
                        </ul>
                    )}
                </li>
            )
        })

        return (
            <div>
                <Breakpoint
                    mobile
                >
                    <div
                        style={{
                            overflowY:    'auto',
                            paddingRight: `calc(${rhythm(1 / 2)} - 1px)`,
                            position:     'absolute',
                            width:        `calc(${rhythm(8)} - 1px)`,
                            borderRight:  '1px solid lightgrey',
                        }}
                    >
                        <ul
                            style={{
                                listStyle:  'none',
                                marginLeft: 0,
                                marginTop:  rhythm(1 / 2),
                            }}
                        >
                            {docPages}
                        </ul>
                    </div>
                    <div
                        style={{
                            padding:     `0 ${rhythm(1)}`,
                            paddingLeft: `calc(${rhythm(8)} + ${rhythm(1)})`,
                        }}
                    >
                        {this.props.children}
                    </div>
                </Breakpoint>
                <Breakpoint>
                    <strong>Topics:</strong>
                    {' '}
                    <select
                        defaultValue={this.props.location.pathname}
                        onChange={this.handleTopicChange}
                    >
                        {docOptions}
                    </select>
                    <br />
                    <br />
                    {this.props.children}
                </Breakpoint>
            </div>
        )
    },
})
