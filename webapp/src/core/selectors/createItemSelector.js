import { createSelector } from 'reselect'


export default (collectionKey, itemKey) => {
    const dictSelector = ({ state })  => state[collectionKey].byId
    const idSelector   = ({ params }) => params.id

    return createSelector(
        dictSelector,
        idSelector,
        (dict, id) => {
            const item = dict[id]

            return {
                id,
                isFetching: item ? item.isFetching : false,
                [itemKey]:  (item && item.data) ? item.data : null,
                error:      item ? item.error : null,
            }
        }
    )
}
