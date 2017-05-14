const createUpdateReducer = ({
    actionTypes: { request, success, failure, reset },
}) => {
    return (state = {
        id:         null,
        data:       {},
        isUpdating: false,
        error:      null,
    }, action) => {
        switch (action.type) {
            case request:
                return {
                    ...state,
                    id:         action.id,
                    data:       action.data,
                    isUpdating: true,
                    error:      null,
                }

            case success:
                return {
                    ...state,
                    id:         action.id,
                    isUpdating: false,
                    error:      null,
                }

            case failure:
                return {
                    ...state,
                    id:         action.id,
                    isUpdating: false,
                    error:      action.error,
                }

            case reset:
                return {
                    ...state,
                    id:         null,
                    data:       {},
                    isUpdating: false,
                    error:      null,
                }

            default:
                return state
        }
    }
}

export default createUpdateReducer
