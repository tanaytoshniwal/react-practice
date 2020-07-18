import React, { useState, useEffect, useRef } from 'react';

import Card from '../UI/Card';
import './Search.css';

const Search = React.memo(props => {

  const { onLoadFilteredIngredients } = props

  const [filter, setFilter] = useState('')

  const inputRef = useRef()

  useEffect(() => {
    const timer = setTimeout(() => {
      if (filter === inputRef.current.value) {
        const queryParams = filter.length === 0 ? '' : `?orderBy="title"&equalTo="${filter}"`
        fetch('https://react-hooks-b92be.firebaseio.com/ingredients.json' + queryParams).then(response => response.json()).then(responseData => {
          const fetchedIngredients = []
          for (const key in responseData) {
            fetchedIngredients.push({
              id: key,
              ...responseData[key]
            })
          }
          onLoadFilteredIngredients(fetchedIngredients)
        })
      }
    }, 500)
    return () => {
      clearTimeout(timer)
    }
  }, [filter, onLoadFilteredIngredients, inputRef])

  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input ref={inputRef} type="text" value={filter} onChange={event => setFilter(event.target.value)} />
        </div>
      </Card>
    </section>
  );
});

export default Search;
