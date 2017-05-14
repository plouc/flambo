import { combineReducers }     from 'redux'
import { intlReducer as intl } from 'react-intl-redux'
import { reducer as form }     from 'redux-form'

import auth                    from '../../modules/auth/reducers'
import users                   from '../../modules/users/reducers'
import groups                  from '../../modules/groups/reducers'
import sources                 from '../../modules/sources/reducers'
import collections             from '../../modules/collections/reducers'


const rootReducer = combineReducers({
    intl,
    form,
    auth,
    ...users,
    ...groups,
    ...sources,
    ...collections,
})

export default rootReducer
