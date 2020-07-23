import { useReducer, useCallback } from "react"

const initialState = {
    loading: false,
    error: null,
    data: null,
    extra: null,
    identifier: null
}

const httpReducer = (httpState, action) => {
    switch (action.type) {
        case 'REQ':
            return { loading: true, error: null, data: null, extra: null, identifier: action.identifier }
        case 'RES':
            return { ...httpState, loading: false, data: action.responseData, extra: action.extra }
        case 'ERR':
            return { loading: false, error: action.error, data: null }
        case 'CLEAR':
            return initialState
        default:
            throw new Error('Should not reach here!')
    }
}

const useHttp = () => {
    const [httpState, dispatchHttp] = useReducer(httpReducer, initialState)

    const clear = useCallback(() => dispatchHttp({ type: 'CLEAR' }), [])

    const sendRequest = useCallback((url, method, body, extra, identifier) => {
        dispatchHttp({ type: 'REQ', identifier: identifier })
        fetch(url, {
            method: method,
            body: body,
            headers: { 'Content-Type': 'application/json' }
        }).then(response => response.json()).then(responseData => {
            dispatchHttp({ type: 'RES', responseData: responseData, extra: extra })
        }).catch(error => {
            // setError('Something went wrong! ERROR: ' + error.message)
            dispatchHttp({ type: 'ERR', error: 'Something went wrong! ERROR: ' + error.message })
        })
    }, [])

    return [
        {
            loading: httpState.loading,
            data: httpState.data,
            error: httpState.error,
            extra: httpState.extra,
            identifier: httpState.identifier
        },
        sendRequest,
        clear
    ]
}

export default useHttp