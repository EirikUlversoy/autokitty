import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './global';
var Web3 = require('web3');
var MakeFancyCatModule = require('make-fancy-cat-module');
const web3 = new Web3(
  new Web3.providers.HttpProvider('https://mainnet.infura.io/'),
);




class App extends Component {
  componentDidMount() {
    console.log('I was triggered during componentDidMount');
    MakeFancyCatModule.start();
  }
  render() {
      
      web3.eth.getBlock('latest').then(console.log);
      web3.eth.isSyncing().then(console.log);
      console.log("Hi!");
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
