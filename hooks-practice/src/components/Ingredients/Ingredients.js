import React, { useEffect, useCallback, useReducer, useMemo } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList'
import ErrorModal from '../UI/ErrorModal'
import Search from './Search';

import useHttp from '../../hooks/http'

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

const Ingredients = () => {

  const [ingredients, dispatch] = useReducer(ingredientReducer, [])

  const [{ loading, data, error, extra, identifier }, sendRequest, clear] = useHttp()

  // const [ingredients, setIngredients] = useState([])

  // const [loading, setLoading] = useState(false)
  // const [error, setError] = useState()

  useEffect(() => {
    if (!loading && identifier === 'REMOVE_INGREDIENT') {
      dispatch({ type: 'DELETE', id: extra })
    }
    else if (!loading && !error && identifier === 'ADD_INGREDIENT') {
      dispatch({ type: 'ADD', ingredient: { id: data.name, ...extra } })
    }
  }, [data, extra, identifier, loading, error])

  const addIngredientHandler = useCallback(ingredient => {
    sendRequest(
      'https://react-hooks-b92be.firebaseio.com/ingredients.json',
      'POST',
      JSON.stringify(ingredient),
      ingredient,
      'ADD_INGREDIENT'
    )
  }, [sendRequest])

  const removeIngredientHandler = useCallback(id => {
    sendRequest(`https://react-hooks-b92be.firebaseio.com/ingredients/${id}.json`, 'DELETE', null, id, 'REMOVE_INGREDIENT')
  }, [sendRequest])

  const filteredIngredients = useCallback(filteredIngredients => {
    // setIngredients(filteredIngredients)
    dispatch({ type: 'SET', ingredients: filteredIngredients })
  }, [])

  const ingredientList = useMemo(() => {
    return <IngredientList ingredients={ingredients} onRemoveItem={removeIngredientHandler} />
  }, [ingredients, removeIngredientHandler])

  return (
    <div className="App">
      {error && <ErrorModal onClose={clear}>{error}</ErrorModal>}

      <IngredientForm onAddIngredient={addIngredientHandler} loading={loading} />

      <section>
        <Search onLoadFilteredIngredients={filteredIngredients} />
        {ingredientList}
      </section>
    </div>
  );
}

export default Ingredients;
