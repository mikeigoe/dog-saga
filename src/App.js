import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { connect } from 'react-redux';

class App extends Component {
  render() {
    const {fetching, dog, onRequestDog, error} = this.props;
    
    return (
      <div className="App">
        <header className="App-header">
          <img src={dog || logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Dog Saga</h1>
        </header>
        
        {dog ? (
          <p className="App-intro">Keep clicking for new dogs</p>
        ) : (
          <p className="App-intro">Replace the React icon with a dog!</p>
        )}

        {fetching ? (
          <button disabled>Fetching...</button>
        ) : (
          <button onClick={onRequestDog}>Requisition a Dog</button>
        )}

        {error && <p style={{ color: 'red' }}>Something went wrong. Also no dog for you.</p>}
        
      </div>
    );
  }
}

// mapStateToProps to make the most current state of fetching, dog and error available as props in the App component.
const mapStateToProps = state => {
  return {
    fetching: state.fetching,
    dog: state.dog,
    error: state.error
  };
};

// Using mapDispatchToProps, we create a function called onRequestDog that dispatches an API_CALL_REQUEST action to the Store.
const mapDispatchToProps = dispatch => {
  return {
    onRequestDog: () => dispatch({ type: "API_CALL_REQUEST" })
  };
};

//connect the App component and export this “reduxed” version of it for use in index.js.
export default connect(mapStateToProps, mapDispatchToProps)(App);
