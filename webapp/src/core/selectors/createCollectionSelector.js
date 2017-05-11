import { createSelector } from 'reselect'


export default path => {
    const idsSelector   = state => state[path].currentIds
    const itemsSelector = state => state[path].byId

    return createSelector(
        idsSelector,
        itemsSelector,
        (ids, byId) => ids.map(id => byId[id].data)
    )
}
