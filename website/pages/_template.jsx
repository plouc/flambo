import React                    from 'react'
import { Link }                 from 'react-router'
import { prefixLink }           from 'gatsby-helpers'
import includes                 from 'underscore.string/include'
import DocIcon                  from 'react-icons/lib/fa/book'
import GithubIcon               from 'react-icons/lib/fa/github-alt'

import { colors, activeColors } from 'utils/colors'
import typography               from 'utils/typography'
import { config }               from 'config'

// Import styles.
import 'css/main.css'
import 'css/github.css'

import logo from 'images/flambo_logo.png'

const { rhythm, adjustFontSizeTo } = typography


module.exports = React.createClass({
    propTypes () {
        return {
            children: React.PropTypes.object,
        }
    },

    render () {
        const docsActive = includes(this.props.location.pathname, '/docs/')

        return (
            <div>
                <div
                    style={{
                        height:       60,
                        background:   colors.bg,
                        color:        colors.fg,
                        position:     'fixed',
                        top:          0,
                        right:        0,
                        left:         0,
                    }}
                >
                    <div
                        style={{
                            maxWidth:       960,
                            height:         60,
                            marginBottom:   rhythm(1.5),
                            display:        'flex',
                            justifyContent: 'space-between',
                            alignItems:     'center',
                            margin:         '0 auto',
                            fontFamily:     'Rajdhani, sans-serif',
                            textTransform:  'uppercase',
                            fontWeight:     '600',
                            fontSize:       '14px',
                            letterSpacing:  '.06em',
                        }}
                    >
                        <Link
                            to={prefixLink('/')}
                            style={{
                                height:  '100%',
                                padding: '12px 0',
                            }}
                        >
                            <img
                                src={logo}
                                alt={config.siteTitle}
                                style={{
                                    maxHeight: '100%',
                                }}
                            />
                        </Link>
                        <div
                            style={{
                                height:  '100%',
                                display: 'flex',
                            }}
                        >
                            <Link
                                to={prefixLink('/docs/getting-started/')}
                                style={{
                                    background:     docsActive ? activeColors.bg : colors.bg,
                                    color:          docsActive ? activeColors.fg : colors.fg,
                                    textDecoration: 'none',
                                    paddingLeft:    rhythm(1 / 1.5),
                                    paddingRight:   rhythm(1 / 1.5),
                                    lineHeight:     '60px',
                                }}
                            >
                                <DocIcon style={{ marginRight: 9 }}/>
                                Documentation
                            </Link>
                            <a
                                style={{
                                    float:          'right',
                                    color:          colors.fg,
                                    textDecoration: 'none',
                                    paddingLeft:    rhythm(1 / 1.5),
                                    paddingRight:   rhythm(1 / 1.5),
                                    lineHeight:     '60px',
                                }}
                                href="https://github.com/plouc/flambo"
                            >
                                <GithubIcon style={{ marginRight: 9 }}/>
                                Github
                            </a>
                        </div>
                    </div>
                </div>
                <div
                    style={{
                        maxWidth:   960,
                        margin:     '0 auto',
                        paddingTop: 96,
                    }}
                >
                    {this.props.children}
                </div>
            </div>
        )
    },
})
