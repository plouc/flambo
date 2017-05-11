/**
 * @module core/reducers/localeReducer
 */
'use strict'

import { SET_LOCALE } from '../constants/actionTypes'


export default function newsItems(state = { locale: 'en' }, action) {
    switch (action.type) {
        case SET_LOCALE:
            return {
                ...state,
                locale: action.locale,
            }

        default:
            return state
    }
}
