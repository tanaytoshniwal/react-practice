import React from 'react';

import classes from './Person.module.css';

class Person extends React.Component {
  // constructor (props) {
  //   super(props)
  // }
  render() {
    console.log('[Person.js] rendering...');
    return (
      <div className={classes.Person}>
        <div className={classes.Delete} onClick={this.props.delete}>X</div>
        <p>
          I'm {this.props.name} and I am {this.props.age} years old!
      </p>
        <p>{this.props.children}</p>
        <input type="text" onChange={this.props.changed} value={this.props.name} />
      </div>
    );
  }
}

export default Person;