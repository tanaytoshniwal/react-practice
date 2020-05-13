import React from 'react';
import PropTypes from 'prop-types';
import classes from './Person.module.css';
import Wrapper from '../../../hoc/Wrapper';
import wrapperWithClass from '../../../hoc/wrapperWithClass';

class Person extends React.Component {
  // constructor (props) {
  //   super(props)
  // }
  render() {
    console.log('[Person.js] rendering...');
    return (
      <Wrapper>
        <div className={classes.Delete} onClick={this.props.delete}>X</div>
        <p>
          I'm {this.props.name} and I am {this.props.age} years old!
        </p>
        <p>{this.props.children}</p>
        <input type="text" onChange={this.props.changed} value={this.props.name} />
      </Wrapper>
    );
  }
}

Person.propTypes = {
  delete: PropTypes.func,
  name: PropTypes.string,
  age: PropTypes.number,
  key: PropTypes.string,
  changed: PropTypes.func
}

export default wrapperWithClass(Person, classes.Person);