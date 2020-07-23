import * as actionTypes from './actionTypes'

// sync action creator
export const saveResult = data => {
    return {
        type: actionTypes.STORE,
        payload: data
    }
}

// async action creator
export const store = data => {
    return dispatch => {
        setTimeout(() => {
            dispatch(saveResult(data))
        }, 2000)
    }
}

export const remove = data => {
    return {
        type: actionTypes.REMOVE,
        payload: data
    }
}