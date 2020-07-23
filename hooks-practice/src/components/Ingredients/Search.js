import React, { useState, useEffect, useRef } from 'react';

import Card from '../UI/Card';
import './Search.css';
import useHttp from '../../hooks/http';
import ErrorModal from '../UI/ErrorModal';

const Search = React.memo(props => {

  const { onLoadFilteredIngredients } = props

  const [filter, setFilter] = useState('')

  const inputRef = useRef()

  const [{ loading, data, error }, sendRequest, clear] = useHttp()

  useEffect(() => {
    const timer = setTimeout(() => {
      if (filter === inputRef.current.value) {
        const queryParams = filter.length === 0 ? '' : `?orderBy="title"&equalTo="${filter}"`
        sendRequest('https://react-hooks-b92be.firebaseio.com/ingredients.json' + queryParams, 'GET')

      }
    }, 500)
    return () => {
      clearTimeout(timer)
    }
  }, [filter, inputRef, sendRequest])

  useEffect(() => {
    if (!loading && !error && data) {
      const fetchedIngredients = []
      for (const key in data) {
        fetchedIngredients.push({
          id: key,
          ...data[key]
        })
      }
      onLoadFilteredIngredients(fetchedIngredients)
    }
  }, [data, loading, error, onLoadFilteredIngredients])

  return (
    <section className="search">
      {error && <ErrorModal onClose={clear}>{error}</ErrorModal>}
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          {loading && <span>Loading...</span>}
          <input ref={inputRef} type="text" value={filter} onChange={event => setFilter(event.target.value)} />
        </div>
      </Card>
    </section>
  );
});

export default Search;
