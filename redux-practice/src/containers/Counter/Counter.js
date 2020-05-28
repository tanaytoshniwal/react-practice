import React, { Component } from 'react';
import { connect } from 'react-redux'
import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';
import { INCREMENT, DECREMENT, ADD, SUB, STORE, REMOVE } from '../../store/actions';

class Counter extends Component {

    render() {
        return (
            <React.Fragment>
                <div>
                    <CounterOutput value={this.props.count} />
                    <CounterControl label="Increment" clicked={this.props.increment} />
                    <CounterControl label="Decrement" clicked={this.props.decrement} />
                    <CounterControl label="Add 5" clicked={this.props.add} />
                    <CounterControl label="Subtract 5" clicked={this.props.sub} />
                </div>
                <hr />
                <button onClick={() => this.props.store(this.props.count)}>Store Result</button>
                <ul>
                    {this.props.results.map(result =>
                        <li key={result.id} onClick={() => this.props.remove(result.id)}>{result.value}</li>
                    )}
                </ul>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        count: state.ctr.counter,
        results: state.res.results
    }
}

const mapDispatchToProps = dispatch => {
    return {
        increment: () => dispatch({ type: INCREMENT }),
        decrement: () => dispatch({ type: DECREMENT }),
        add: () => dispatch({ type: ADD, payload: 5 }),
        sub: () => dispatch({ type: SUB, payload: 5 }),
        store: (data) => dispatch({ type: STORE, payload: data }),
        remove: (data) => dispatch({ type: REMOVE, payload: data })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter);