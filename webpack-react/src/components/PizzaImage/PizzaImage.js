import React from 'react'
import classes from './PizzaImage.css'
import Pizza from '../../assets/pizza.jpeg'

const PizzaImage = props => {
    return (
        <div className={classes.pizzaImage}>
            <img src={Pizza} className={classes.pizzaImg} />
        </div>
    )
}

export default PizzaImage
