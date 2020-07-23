import { STORE, REMOVE } from "../actions/actionTypes"
import { updateObject } from "../utility"

const initialState = {
    results: []
}

const deleteResult = (state, action) => {
    const results = state.results.filter(result => result.id !== action.payload)
    updateObject(state, {results: results})
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case STORE:
            return updateObject(state, {results: state.results.concat({ id: new Date(), value: action.payload })})
        case REMOVE:
            return deleteResult(state, action)
        default:
            return state
    }
}

export default reducer