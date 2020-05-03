import React, { useState } from 'react';

function App() {
  const [nameState, setName] = useState({
    name: 'tanay'
  })
  const handler = (value) => {
    setName({
      name: value
    })
  }
  return (
    <div>
      <p>using react hooks: {nameState.name}</p>
      <button onClick={handler.bind(this, 'koi bhi')}>click me</button>
    </div>
  );
}

export default App;
