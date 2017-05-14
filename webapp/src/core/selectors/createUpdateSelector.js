import _                  from 'lodash'
import { createSelector } from 'reselect'


export default namespace => {
    const selector = state  => state[`update${_.upperFirst(namespace)}`]

    return createSelector(
        selector,
        update => ({
            isUpdating: update.isUpdating,
            error:      update.error,
        })
    )
}
