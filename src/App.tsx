import React from 'react';
import EnigmaGame from './components/EnigmaGame';
import BackgroundAudio from './components/BackgroundAudio';
import './App.css';

function App() {
  // Bloqueio de clique direito removido conforme solicitado

  return (
    <div className="App">
      <BackgroundAudio />
      <EnigmaGame />
    </div>
  );
}

export default App;
