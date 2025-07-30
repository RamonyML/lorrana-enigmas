import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Lightbulb, Trophy, Heart, Sparkles } from 'lucide-react';
import { enigmas } from '../data/enigmas';
import { GameState } from '../types/enigmas';
import SnakeGame from './SnakeGame';
import './EnigmaGame.css';

const EnigmaGame: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    currentEnigmaId: 1,
    completedEnigmas: [],
    showHint: false,
    userAnswer: '',
    isCorrect: null,
    gameCompleted: false,
    startTime: new Date()
  });

  // Snake Game temporariamente desabilitado
  // const [showSnakeGame, setShowSnakeGame] = useState(false);

  const currentEnigma = enigmas.find(e => e.id === gameState.currentEnigmaId);

  const handleAnswerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentEnigma) return;

    const isCorrect = gameState.userAnswer.toLowerCase().trim() === currentEnigma.answer.toLowerCase();
    
    setGameState(prev => ({
      ...prev,
      isCorrect,
      showHint: false
    }));

    if (isCorrect) {
      setTimeout(() => {
        // Pula o jogo Snake - vai direto do enigma 5 para o 6
        if (currentEnigma.id === 5) {
          setGameState(prev => ({
            ...prev,
            currentEnigmaId: 6, // Pula direto para o enigma 6
            completedEnigmas: [...prev.completedEnigmas, currentEnigma.id],
            userAnswer: '',
            isCorrect: null
          }));
        } else if (currentEnigma.isFinal) {
          setGameState(prev => ({
            ...prev,
            gameCompleted: true,
            completedEnigmas: [...prev.completedEnigmas, currentEnigma.id]
          }));
        } else {
          setGameState(prev => ({
            ...prev,
            currentEnigmaId: currentEnigma.nextEnigmaId,
            completedEnigmas: [...prev.completedEnigmas, currentEnigma.id],
            userAnswer: '',
            isCorrect: null
          }));
        }
      }, 2000);
    } else {
      // Se a resposta estiver errada, limpa o input e permite nova tentativa
      setTimeout(() => {
        setGameState(prev => ({
          ...prev,
          userAnswer: '',
          isCorrect: null
        }));
      }, 2000);
    }
  };

  // Funções do Snake Game temporariamente desabilitadas
  /*
  const handleSnakeComplete = () => {
    setShowSnakeGame(false);
    setGameState(prev => ({
      ...prev,
      currentEnigmaId: 6, // Vai para o próximo enigma após o Snake
      completedEnigmas: [...prev.completedEnigmas, 5],
      userAnswer: '',
      isCorrect: null
    }));
  };

  const handleSnakeClose = () => {
    setShowSnakeGame(false);
  };
  */

  const resetGame = () => {
    setGameState({
      currentEnigmaId: 1,
      completedEnigmas: [],
      showHint: false,
      userAnswer: '',
      isCorrect: null,
      gameCompleted: false,
      startTime: new Date()
    });
    // setShowSnakeGame(false); // Snake Game desabilitado
  };

  const getTimeElapsed = () => {
    const now = new Date();
    const diff = now.getTime() - gameState.startTime.getTime();
    const minutes = Math.floor(diff / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Snake Game temporariamente desabilitado
  /*
  if (showSnakeGame) {
    return (
      <div className="enigma-game" style={{ 
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}>
        <SnakeGame onComplete={handleSnakeComplete} onClose={handleSnakeClose} />
      </div>
    );
  }
  */

  if (gameState.gameCompleted) {
    return (
      <motion.div 
        className="game-completed"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="completion-card">
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <Trophy size={80} color="#FFD700" />
          </motion.div>
          <h1>🎉 Feliz Aniversário, Lorrana! 🎉</h1>
          <p>Você completou todos os enigmas em {getTimeElapsed()}!</p>
          <p>Você é minha melhor amiga e eu sinto muita saudade de você! 💖</p>
          <p>Te amo muito e merece todas as felicidades do mundo! ✨</p>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1, type: "spring" }}
          >
            <Heart size={60} color="#FF69B4" />
          </motion.div>
          <button onClick={resetGame} className="reset-button">
            Jogar Novamente
          </button>
        </div>
      </motion.div>
    );
  }

  if (!currentEnigma) return <div>Erro: Enigma não encontrado</div>;

  return (
    <motion.div 
      className="enigma-game"
      style={{ background: currentEnigma.background }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="game-header">
        <div className="progress">
          <span>Enigma {currentEnigma.id} de {enigmas.length}</span>
          <div className="progress-bar">
            <motion.div 
              className="progress-fill"
              initial={{ width: 0 }}
              animate={{ width: `${(gameState.completedEnigmas.length / enigmas.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
        <div className="timer">
          <span>⏱️ {getTimeElapsed()}</span>
        </div>
      </div>

      <motion.div 
        className="enigma-card"
        key={currentEnigma.id}
        data-enigma-id={currentEnigma.id}
        initial={{ x: 300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -300, opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="enigma-header">
          <span className="enigma-icon">{currentEnigma.icon}</span>
          <h2>{currentEnigma.title}</h2>
        </div>

        <div className="enigma-question">
          <Brain size={24} />
          <p>{currentEnigma.question}</p>
        </div>

        <form onSubmit={handleAnswerSubmit} className="answer-form">
          <input
            type="text"
            value={gameState.userAnswer}
            onChange={(e) => setGameState(prev => ({ ...prev, userAnswer: e.target.value }))}
            placeholder="Digite sua resposta..."
            className="answer-input"
            disabled={gameState.isCorrect !== null}
          />
          
          <div className="button-group">
            <button 
              type="submit" 
              className="submit-button"
              disabled={!gameState.userAnswer.trim() || gameState.isCorrect !== null}
            >
              <Sparkles size={20} />
              Responder
            </button>
            
            {currentEnigma.hint && (
              <button
                type="button"
                onClick={() => setGameState(prev => ({ ...prev, showHint: !prev.showHint }))}
                className="hint-button"
              >
                <Lightbulb size={20} />
                Dica
              </button>
            )}
          </div>
        </form>

        <AnimatePresence>
          {gameState.showHint && currentEnigma.hint && (
            <motion.div 
              className="hint-box"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
            >
              <Lightbulb size={20} />
              <p>{currentEnigma.hint}</p>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {gameState.isCorrect !== null && (
            <motion.div 
              className={`result-message ${gameState.isCorrect ? 'correct' : 'incorrect'}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              {gameState.isCorrect ? (
                <>
                  <Trophy size={30} />
                  <span>Correto! 🎉</span>
                </>
              ) : (
                <>
                  <span>❌ Tente novamente!</span>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default EnigmaGame; 