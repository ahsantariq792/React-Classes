import React from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {

  function send(){
    axios.get('http://localhost:5000/api/v1/email')
  }


  return (
    <div className="App">
      <div>
        <p>Hello World</p>
        <p>checking send email from node js</p>
        <button onClick={send}>Send Email</button>
      </div>
    </div>
  );
}

export default App;
