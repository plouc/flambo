import { initialize }   from 'redux-form'

import history          from '../../../../core/history'
import { switchLocale } from './i18nActions'


export const updateSettings = settings => dispatch => {
    dispatch(switchLocale(settings.locale))
    dispatch(initialize('settings', {}))
    setTimeout(() => history.push('/settings'), 0)
}
