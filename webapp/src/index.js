import React                     from 'react'
import ReactDOM                  from 'react-dom'
import { Router }                from 'react-router-dom'
import { addLocaleData }         from 'react-intl'
import { IntlProvider }          from 'react-intl-redux'
import frLocaleData              from 'react-intl/locale-data/fr'
import jaLocaleData              from 'react-intl/locale-data/ja'
import { Provider }              from 'react-redux'

import './core/styles/global.css'
import history                   from './core/history'
import translations              from './i18n'
import configureStore            from './core/store/configureStore'
import App                       from './core/containers/App'
import { DEFAULT_LANGUAGE }      from './config'


addLocaleData([
    ...frLocaleData,
    ...jaLocaleData,
])

const currentLocale = localStorage.getItem('settings.locale') || DEFAULT_LANGUAGE

const store = configureStore({
    intl: {
        locale:   currentLocale,
        messages: translations[currentLocale],
    },
})

ReactDOM.render((
        <Provider store={store}>
            <IntlProvider locale="fr">
                <Router history={history}>
                    <App/>
                </Router>
            </IntlProvider>
        </Provider>
    ),
    document.getElementById('root')
)
