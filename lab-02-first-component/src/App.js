import React, { Component } from 'react';
import './App.css';
import Hello from './hello/Hello';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      greeting : props.greeting,
    };
  }

  render() {
    return (
      <div className="App">
        <Hello friend={this.state.greeting} />
      </div>
    );
  }
}

App.defaultProps = {
  greeting : 'App User'
};

export default App;
