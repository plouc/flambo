/**
 * @module core/actions/LocaleActions
 */
'use strict'

import { SET_LOCALE } from '../constants/actionTypes'

export const setLocale = locale => ({
    type: SET_LOCALE,
    locale,
})
