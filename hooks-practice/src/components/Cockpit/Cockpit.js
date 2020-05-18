import React, { useEffect, useRef, useContext } from 'react';
import PropTypes from 'prop-types';
import classes from './Cockpit.module.css';
import AuthContext from '../../context/AuthContext';

const Cockpit = (props) => {

  const toggleButtonRef = useRef(null)

  const authContext = useContext(AuthContext)

  useEffect(() => {
    console.log('[Cockpit.js] useEffect everytime')
  })

  useEffect(() => {
    console.log('[Cockpit.js] useEffect depending on a data')
  }, [props.persons])

  useEffect(() => {
    console.log('[Cockpit.js] useEffect only first time')
  }, [])

  useEffect(() => {
    console.log('[Cockpit.js] useEffect demonstrate cleanup')
    toggleButtonRef.current.click()
    return () => {
      console.log('[Cockpit.js] useEffect cleanup done')
    }
  }, [])

  const assignedClasses = [];
  let btnClass = classes.toggleButton;
  if (props.showPersons) {
    btnClass += ' ' + classes.Red;
  }

  if (props.personsLength <= 2) {
    assignedClasses.push(classes.red); // classes = ['red']
  }
  if (props.personsLength <= 1) {
    assignedClasses.push(classes.bold); // classes = ['red', 'bold']
  }

  return (
    <div className={classes.Cockpit}>
      <h1>{props.title}</h1>
      <p className={assignedClasses.join(' ')}>This will change color according to list's length!</p>
      <button
        className={classes.addButton}
        onClick={authContext.login}>{authContext.authenticated ? "Logout" : "Login"}</button>
      <button
        ref={toggleButtonRef}
        className={btnClass}
        onClick={props.clicked}>Toggle Persons</button>
      <button
        className={classes.addButton}
        onClick={props.addPersonHandler}>Add Persons</button>
    </div>
  );
};

Cockpit.propTypes = {
  title: PropTypes.string,
  showPersons: PropTypes.bool,
  personsLength: PropTypes.number,
  clicked: PropTypes.func,
  addPersonHandler: PropTypes.func
}

export default React.memo(Cockpit);