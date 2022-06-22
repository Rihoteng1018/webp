import './App.css';
import * as React from 'react';
import Todo from './Todo';
const {useState,useEffect}=React;
function App() {
  return (
    <div className="App">
      <Todo useState={useState} useEffect={useEffect}/>
    </div>
  );
}

export default App;

