import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './global';
var net = require('net');
const Web3 = require('web3');




class App extends Component {
  render() {
      var web3 = new Web3(new Web3.providers.IpcProvider('\\\\.\\pipe\\geth.ipc', net));

      web3.eth.getBlock('latest').then(console.log);
      
        return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
        
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
