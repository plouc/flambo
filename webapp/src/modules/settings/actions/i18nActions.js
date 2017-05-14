import { updateIntl } from 'react-intl-redux'

import translations   from '../../../i18n'


export const switchLocale = locale => {
    return dispatch => {
        dispatch(updateIntl({
            locale,
            messages: translations[locale],
        }))
        localStorage.setItem('settings.locale', locale)
    }
}

