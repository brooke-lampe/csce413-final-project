import React from 'react';
import logo from './logo.svg';
import './App.scss';

class App extends React.Component {

  componentDidMount() {
    const url = 'http://csce413.loc/api/cities/';
    var data = new FormData();
    data.append('ids', '1,2');
    fetch(url, {
      method: 'POST',
      body: data
    })
    .then(response => response.json())
    .then(data => console.log(data));
}

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
