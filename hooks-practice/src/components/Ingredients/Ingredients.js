import React, { useEffect, useCallback, useReducer, useMemo } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList'
import ErrorModal from '../UI/ErrorModal'
import Search from './Search';

const ingredientReducer = (currentIngredients, action) => {
  switch (action.type) {
    case 'SET':
      return action.ingredients
    case 'ADD':
      return [...currentIngredients, action.ingredient]
    case 'DELETE':
      return currentIngredients.filter(ing => ing.id !== action.id)
    default:
      throw new Error('Should not reach here!')
  }
}

const httpReducer = (httpState, action) => {
  switch (action.type) {
    case 'REQ':
      return { loading: true, error: null }
    case 'RES':
      return { ...httpState, loading: false }
    case 'ERR':
      return { loading: false, error: action.error }
    case 'CLEAR':
      return { ...httpState, error: null }
    default:
      throw new Error('Should not reach here!')
  }
}

const Ingredients = () => {

  const [ingredients, dispatch] = useReducer(ingredientReducer, [])
  const [{loading, error}, dispatchHttp] = useReducer(httpReducer, {
    loading: false,
    error: null
  })
  // const [ingredients, setIngredients] = useState([])

  // const [loading, setLoading] = useState(false)
  // const [error, setError] = useState()

  useEffect(() => {
    console.log('[RENDERING INGREDIENTS]:', ingredients)
  }, [ingredients])

  const addIngredientHandler = useCallback(ingredient => {
    // setLoading(true)
    dispatchHttp({ type: 'REQ' })
    fetch('https://react-hooks-b92be.firebaseio.com/ingredients.json', {
      method: 'POST',
      body: JSON.stringify(ingredient),
      headers: { 'Content-Type': 'application/json' }
    }).then(response => response.json()).then(responseData => {
      // setLoading(false)
      dispatchHttp({ type: 'RES' })
      // setIngredients(prevState => [...prevState, { id: responseData.name, ...ingredient }])
      dispatch({ type: 'ADD', ingredient: { id: responseData.name, ...ingredient } })
    }).catch(error => {
      // setError('Something went wrong! ERROR: ' + error.message)
      dispatchHttp({ type: 'ERR', error: 'Something went wrong! ERROR: ' + error.message })
    })
  }, [])

  const removeIngredientHandler = useCallback(id => {
    // setLoading(true)
    dispatchHttp({ type: 'REQ' })
    fetch(`https://react-hooks-b92be.firebaseio.com/ingredients/${id}.json`, {
      method: 'DELETE'
    }).then(response => {
      // setLoading(false)
      dispatchHttp({ type: 'RES' })
      // const modifiedList = [...ingredients].filter(d => d.id !== id)
      // setIngredients(modifiedList)
      dispatch({ type: 'DELETE', id: id })
    }).catch(error => {
      // setError('Something went wrong! ERROR: ' + error.message)
      dispatchHttp({ type: 'ERR', error: 'Something went wrong! ERROR: ' + error.message })
    })
  }, [])

  const filteredIngredients = useCallback(filteredIngredients => {
    // setIngredients(filteredIngredients)
    dispatch({ type: 'SET', ingredients: filteredIngredients })
  }, [])

  const clearError = useCallback(() => {
    // setError(null)
    // setLoading(false)
      dispatchHttp({ type: 'CLEAR' })
  }, [])

  const ingredientList = useMemo(() => {
    return <IngredientList ingredients={ingredients} onRemoveItem={removeIngredientHandler} />
  }, [ingredients, removeIngredientHandler])

  return (
    <div className="App">
      {error && <ErrorModal onClose={clearError}>{error}</ErrorModal>}

      <IngredientForm onAddIngredient={addIngredientHandler} loading={loading} />

      <section>
        <Search onLoadFilteredIngredients={filteredIngredients} />
        {ingredientList}
      </section>
    </div>
  );
}

export default Ingredients;
