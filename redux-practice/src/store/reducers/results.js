import { STORE, REMOVE } from "../actions"

const initialState = {
    results: []
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case STORE:
            return {
                ...state,
                results: state.results.concat({ id: new Date(), value: action.payload })
            }
        case REMOVE:
            const results = state.results.filter(result => result.id !== action.payload)
            return {
                ...state,
                results: results
            }
        default:
            return state
    }
}

export default reducer