import * as actionTypes from "./actionTypes"

export const increment = () => {
    return {
        type: actionTypes.INCREMENT
    }
}

export const decrement = () => {
    return {
        type: actionTypes.DECREMENT
    }
}

export const add = data => {
    return {
        type: actionTypes.ADD,
        payload: data
    }
}

export const sub = data => {
    return {
        type: actionTypes.SUB,
        payload: data
    }
}