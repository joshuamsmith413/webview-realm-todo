
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text, Button } from 'react-native';
import { createStore } from 'redux';
import { connect } from 'react-redux';

// function counterReducer(state = { value: 0 }, action) {
//   switch (action.type) {
//     case 'counter/incremented':
//       return { value: state.value + 1 }
//     case 'counter/decremented':
//       return { value: state.value - 1 }
//     default:
//       return state
//   }
// }



class CounterRedux extends Component{
  constructor(props) {
      super(props)    
    // store.dispatch({ type: 'INCREMENT' })
    this.incrementAsync = this.incrementAsync.bind(this);
    this.incrementIfOdd = this.incrementIfOdd.bind(this);
  }
  incrementIfOdd() {
    if (this.props.value % 2 !== 0) {
      this.props.onIncrement()
    }
  }

  incrementAsync() {
    setTimeout(this.props.onIncrement, 1000)
  }

  render() {
    
    return (
      <View style={{marginTop: 200, marginLeft: 30}}>
        <Text>Clicked: {this.props.counter} times</Text>
        <Button title="+" onPress={() => this.props.dispatch({ type: 'INCREMENT' })}/>
        <Button title="-" onPress={() => this.props.dispatch({ type: 'DECREMENT' })}/>
        <Button title="ifOdd" onPress={this.incrementIfOdd}/>
        <Button title="async" onPress={this.incrementAsync}/>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
    return state;
}

export default connect(mapStateToProps)(CounterRedux);