import React from 'react';

import Person from './Person/Person';

class Persons extends React.Component {
    
    // static getDerivedStateFromProps(props, state) {
    //     console.log('[Persons.js] getDerivedStateFromProps')
    //     return state
    // }

    shouldComponentUpdate(nextProps, nextState) {
        console.log('[Persons.js] shouldComponentUpdate')
        return true
    }

    getSnapshotBeforeUpdate(prevProps, prevState) {
        console.log('[Persons.js] getSnapshotBeforeUpdate')
        // return null
        return { message: 'this is a snapshot' }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('[Persons.js] componentDidUpdate')
        console.log('snapshot:', snapshot)
    }

    render() {
        console.log('[Persons.js] rendering...');
        return this.props.persons.map((person, index) => {
          return (
            <Person
              delete={() => this.props.delete(index)}
              name={person.name}
              age={person.age}
              key={person.id}
              changed={event => this.props.changed(event, person.id)}
            />
          );
        });
    }
}

export default Persons;
