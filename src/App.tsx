import React from 'react';
import './App.css';
import Counter from "./components/Counter";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";

function App() {
  return (
    <Router>
      <div className="App">
        <main className="App-main">
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/counter" element={<Counter/>}/>
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
