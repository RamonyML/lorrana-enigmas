import React from 'react';
import EnigmaGame from './components/EnigmaGame';
import BackgroundAudio from './components/BackgroundAudio';
import './App.css';

function App() {
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    alert('Boa tentativa, Daniel. Não tem nada aqui kkkk');
  };

  return (
    <div className="App" onContextMenu={handleContextMenu}>
      <BackgroundAudio />
      <EnigmaGame />
    </div>
  );
}

export default App;
