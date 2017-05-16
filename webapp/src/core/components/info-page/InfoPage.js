import React, { Component, PropTypes } from 'react'
import Waypoint                 from 'react-waypoint'

import Helmet                   from '../HelmetIntl'
import { Tabs, Tab }            from '../tabs'
import AppBarOverlay            from './AppBarOverlay'
import Header                   from './Header'
import Picture                  from './Picture'
import Title                    from './Title'
import Bar                      from './Bar'
import Content                  from './Content'
import Sidebar                  from './Sidebar'


export default class InfoPage extends Component {
    static propTypes = {
        pageTitle:       PropTypes.string.isRequired,
        pageTitleValues: PropTypes.object,
        pictureUrl:      PropTypes.string,
        title:           PropTypes.string,
        sidebar:         PropTypes.node,
        tabs:            PropTypes.arrayOf(
            PropTypes.shape({
                label: PropTypes.string.isRequired,
                icon:  PropTypes.func,
                to:    PropTypes.string,
                exact: PropTypes.bool,

            })
        ),
    }

    constructor(props) {
        super(props)

        this.state = { isHeaderFixed: false }
    }

    handleBarEnter = () => {
        this.setState({ isHeaderFixed: false })
    }

    handleBarLeave = () => {
        this.setState({ isHeaderFixed: true })
    }

    render() {
        const {
            pageTitle,
            pageTitleValues,
            pictureUrl,
            title,
            tabs,
            sidebar,
            barInfo,
            controls,
            aside,
        } = this.props

        const { isHeaderFixed } = this.state

        const barStyle     = {}
        const contentStyle = {}
        if (isHeaderFixed) {
            barStyle.position      = 'fixed'
            barStyle.top           = '60px'
            barStyle.left          = '240px'
            barStyle.right         = '0'
            barStyle.zIndex        = 7
            contentStyle.marginTop = '84px'
        }

        return (
            <div>
                <Helmet
                    title={pageTitle}
                    titleValues={pageTitleValues}
                />
                <AppBarOverlay isVisible={isHeaderFixed}>
                    <Picture size={36} url={pictureUrl}>
                        {!pictureUrl && title !== undefined ? title.charAt(0) : null}
                    </Picture>
                    <Title
                        style={{
                            color:    'white',
                            fontSize: '22px',
                            margin:   '0 0 0 12px',
                        }}
                    >
                        {title}
                    </Title>
                </AppBarOverlay>
                <Waypoint
                    onEnter={this.handleBarEnter}
                    onLeave={this.handleBarLeave}
                >
                    <div>
                        <Header>
                            <Picture url={pictureUrl}>
                                {!pictureUrl && title !== undefined ? title.charAt(0) : null}
                            </Picture>
                            <Title>{title}</Title>
                        </Header>
                    </div>
                </Waypoint>
                <Bar style={barStyle}>
                    {barInfo || <span/>}
                    {tabs ? (
                        <Tabs>
                            {tabs.map(tab => (
                                <Tab
                                    key={tab.label}
                                    {...tab}
                                />
                            ))}
                        </Tabs>
                    ) : <span/>}
                    {controls}
                </Bar>
                <Content style={contentStyle}>
                    <Sidebar>
                        {sidebar}
                    </Sidebar>
                    <div style={{ overflow: 'hidden' }}>
                        {this.props.children}
                    </div>
                    <div>
                        {aside}
                    </div>
                </Content>
            </div>
        )
    }
}
