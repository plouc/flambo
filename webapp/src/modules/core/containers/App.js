import React, { Component }                              from 'react'
import Combokeys                                         from 'combokeys'
import { connect }                                       from 'react-redux'
import { IntlProvider, addLocaleData, FormattedMessage } from 'react-intl'
import en                                                from 'react-intl/locale-data/en'
import fr                                                from 'react-intl/locale-data/fr'
import es                                                from 'react-intl/locale-data/es'
import translations                                      from '../../../translations'
import { Link, hashHistory }                             from 'react-router'
import Notifications                                     from '../../notifications/containers/NotificationsContainer'
import LocaleSwitch                                      from '../containers/LocaleSwitch'
import Menu                                              from '../components/Menu'
import CollectionsMenu                                   from '../../collections/containers/CollectionsMenu'


addLocaleData([...en, ...fr, ...es])


class App extends Component {
    componentDidMount() {
        const combokeys = new Combokeys(document.documentElement)
        combokeys.bind('t', () => {
            hashHistory.push('/topics')
        })
        combokeys.bind('u', () => {
            hashHistory.push('/users')
        })
        combokeys.bind('s', () => {
            hashHistory.push('/sources')
        })
        combokeys.bind('n', () => {
            const { location: { pathname } } = this.props

            switch (pathname) {
                case '/topics':
                    hashHistory.push('/topics/new')
                    break

                case '/sources':
                    hashHistory.push('/sources/new')
                    break
            }
        })
    }

    render () {
        const { locale } = this.props

        return (
            <IntlProvider locale={locale} messages={translations[locale]}>
                <div className="page-wrapper">
                    <div className="sidebar">
                        <span className="brand">flambo</span>
                        <div className="sidebar-wrapper">
                            <Menu />
                            <CollectionsMenu />
                        </div>
                        <LocaleSwitch />
                    </div>
                    {this.props.children}
                    <Notifications />
                </div>
            </IntlProvider>
        )
    }
}

export default connect(
    ({ locale }) => ({ locale: locale.locale })
)(App)