const createCreateReducer = ({
    actionTypes: { request, success, failure, reset },
}) => {
    return (state = {
        data:       {},
        isCreating: false,
        error:      null,
        created:    false,
    }, action) => {
        switch (action.type) {
            case request:
                return {
                    ...state,
                    data:       action.data,
                    isCreating: true,
                    error:      null,
                }

            case success:
                return {
                    ...state,
                    isCreating: false,
                    error:      null,
                    created:    true,
                    createdId:  action.createdId,
                }

            case failure:
                return {
                    ...state,
                    isCreating: false,
                    error:      action.error,
                }

            case reset:
                return {
                    ...state,
                    data:       {},
                    isCreating: false,
                    error:      null,
                    created:    false,
                }

            default:
                return state
        }
    }
}

export default createCreateReducer
