import React, { useState, useEffect, useCallback } from 'react';
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';
import './SnakeGame.css';

interface Position {
  x: number;
  y: number;
}

interface SnakeGameProps {
  onComplete: () => void;
  onClose: () => void;
}

const SnakeGame: React.FC<SnakeGameProps> = ({ onComplete, onClose }) => {
  const [snake, setSnake] = useState<Position[]>([{ x: 10, y: 10 }]);
  const [food, setFood] = useState<Position>({ x: 15, y: 15 });
  const [direction, setDirection] = useState<string>('RIGHT');
  const [score, setScore] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const [currentMessage, setCurrentMessage] = useState<string>('');
  const [showContinueOption, setShowContinueOption] = useState<boolean>(false);

  const BOARD_SIZE = 20;
  const TARGET_SCORE = 600;
  const MESSAGE_INTERVAL = 200;

  const desmotivationalMessages = [
    "Parabéns! Você está perdendo tempo jogando Snake...",
    "Wow, você realmente não tem nada melhor para fazer?",
    "Ainda não desistiu? Que persistente...",
    "Você sabe que isso é só um jogo, né?",
    "Será que você deveria estar estudando em vez disso?",
    "Impressionante como você consegue ser tão dedicado a coisas inúteis...",
    "Você já pensou em fazer algo produtivo?",
    "Ainda aqui? Que surpresa...",
    "Você realmente acha que isso vai te levar a algum lugar?",
    "Parabéns pela determinação em perder tempo!"
  ];

  // Função para vibração haptic (se suportada)
  const triggerHapticFeedback = useCallback(() => {
    if ('vibrate' in navigator) {
      navigator.vibrate(50); // Vibração de 50ms
    }
  }, []);

  const generateFood = useCallback(() => {
    const newFood = {
      x: Math.floor(Math.random() * BOARD_SIZE),
      y: Math.floor(Math.random() * BOARD_SIZE)
    };
    setFood(newFood);
  }, []);

  const wrapPosition = (pos: Position): Position => {
    return {
      x: pos.x < 0 ? BOARD_SIZE - 1 : pos.x >= BOARD_SIZE ? 0 : pos.x,
      y: pos.y < 0 ? BOARD_SIZE - 1 : pos.y >= BOARD_SIZE ? 0 : pos.y
    };
  };

  const checkCollision = useCallback((head: Position, body: Position[]) => {
    return body.some(segment => segment.x === head.x && segment.y === head.y);
  }, []);

  const moveSnake = useCallback(() => {
    if (gameOver || isPaused) return;

    setSnake(prevSnake => {
      const newSnake = [...prevSnake];
      const head = { ...newSnake[0] };

      switch (direction) {
        case 'UP':
          head.y -= 1;
          break;
        case 'DOWN':
          head.y += 1;
          break;
        case 'LEFT':
          head.x -= 1;
          break;
        case 'RIGHT':
          head.x += 1;
          break;
      }

      // Wrap around
      const wrappedHead = wrapPosition(head);

      // Check collision with self
      if (checkCollision(wrappedHead, newSnake.slice(1))) {
        setGameOver(true);
        return prevSnake;
      }

      newSnake.unshift(wrappedHead);

      // Check if food is eaten
      if (wrappedHead.x === food.x && wrappedHead.y === food.y) {
        setScore(prevScore => {
          const newScore = prevScore + 10;
          
          // Check for message interval
          if (newScore % MESSAGE_INTERVAL === 0) {
            const message = desmotivationalMessages[Math.floor(Math.random() * desmotivationalMessages.length)];
            setCurrentMessage(message);
            setShowMessage(true);
            setIsPaused(true);
          }

          // Check for target score
          if (newScore >= TARGET_SCORE) {
            setShowContinueOption(true);
            setIsPaused(true);
          }

          return newScore;
        });
        generateFood();
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [direction, food, gameOver, isPaused, generateFood, checkCollision, desmotivationalMessages]);

  const handleDirectionChange = useCallback((newDirection: string) => {
    console.log('handleDirectionChange called:', newDirection, 'Current direction:', direction, 'Game Over:', gameOver, 'Paused:', isPaused);
    
    if (gameOver || isPaused) {
      console.log('Direction change blocked - game state invalid');
      return;
    }

    const opposites = {
      'UP': 'DOWN',
      'DOWN': 'UP',
      'LEFT': 'RIGHT',
      'RIGHT': 'LEFT'
    };

    if (opposites[newDirection as keyof typeof opposites] !== direction) {
      console.log('Setting new direction:', newDirection);
      setDirection(newDirection);
      triggerHapticFeedback(); // Feedback haptic quando muda direção
    } else {
      console.log('Direction change ignored - opposite direction');
    }
  }, [direction, gameOver, isPaused, triggerHapticFeedback]);

  // Função para lidar com eventos touch
  const handleTouchControl = useCallback((newDirection: string, event: React.TouchEvent | React.MouseEvent) => {
    console.log('Touch control triggered:', newDirection, 'Event type:', event.type, 'Game Over:', gameOver, 'Paused:', isPaused);
    
    // Previne comportamento padrão apenas para eventos touch
    if (event.type.startsWith('touch')) {
      event.preventDefault();
    }
    event.stopPropagation();
    
    // Verifica se o jogo está em estado válido para aceitar comandos
    if (gameOver || isPaused) {
      console.log('Touch control blocked - game state invalid');
      return;
    }
    
    // Adiciona classe de feedback visual temporário
    const target = event.currentTarget as HTMLButtonElement;
    target.classList.add('button-pressed');
    setTimeout(() => {
      target.classList.remove('button-pressed');
    }, 150);
    
    console.log('Calling handleDirectionChange with:', newDirection);
    
    // Chama diretamente setDirection para garantir que funcione
    const opposites = {
      'UP': 'DOWN',
      'DOWN': 'UP',
      'LEFT': 'RIGHT',
      'RIGHT': 'LEFT'
    };

    if (opposites[newDirection as keyof typeof opposites] !== direction) {
      console.log('Setting direction directly:', newDirection);
      setDirection(newDirection);
      triggerHapticFeedback();
    }
  }, [direction, gameOver, isPaused, triggerHapticFeedback]);

  const handleContinueToNext = () => {
    onComplete();
  };

  const handleContinuePlaying = () => {
    setShowContinueOption(false);
    setIsPaused(false);
  };

  const handleCloseMessage = () => {
    setShowMessage(false);
    setIsPaused(false);
  };

  useEffect(() => {
    const gameLoop = setInterval(moveSnake, 150);
    return () => clearInterval(gameLoop);
  }, [moveSnake]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (gameOver || isPaused) return;

      switch (e.key) {
        case 'ArrowUp':
          e.preventDefault();
          handleDirectionChange('UP');
          break;
        case 'ArrowDown':
          e.preventDefault();
          handleDirectionChange('DOWN');
          break;
        case 'ArrowLeft':
          e.preventDefault();
          handleDirectionChange('LEFT');
          break;
        case 'ArrowRight':
          e.preventDefault();
          handleDirectionChange('RIGHT');
          break;
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [gameOver, isPaused, handleDirectionChange]);

  // Prevenir zoom e outros gestos indesejados em mobile
  useEffect(() => {
    const preventDefault = (e: TouchEvent) => {
      if (e.touches.length > 1) {
        e.preventDefault();
      }
    };

    const preventZoom = (e: TouchEvent) => {
      if (e.touches.length > 1) {
        e.preventDefault();
      }
    };

    document.addEventListener('touchstart', preventDefault, { passive: false });
    document.addEventListener('touchmove', preventZoom, { passive: false });

    return () => {
      document.removeEventListener('touchstart', preventDefault);
      document.removeEventListener('touchmove', preventZoom);
    };
  }, []);

  return (
    <div className="snake-game-container">
      <div className="snake-game-header">
        <h2>🐍 Snake Game - Desafio da Cobra 🐍</h2>
        <p>Colete as maçãs para ganhar pontos!</p>
        <div className="score">Pontuação: {score}</div>
        {/* Debug info */}
        <div style={{ fontSize: '12px', marginTop: '10px', color: '#ccc' }}>
          Debug: Direction: {direction} | Game Over: {gameOver.toString()} | Paused: {isPaused.toString()}
        </div>
        <button 
          onClick={() => {
            console.log('Test button clicked');
            setDirection('UP');
          }}
          style={{ 
            marginTop: '10px', 
            padding: '5px 10px', 
            backgroundColor: '#ff0000',
            color: 'white',
            border: 'none',
            borderRadius: '5px'
          }}
        >
          Test Direction Change
        </button>
      </div>

      <div className="game-board">
        {Array.from({ length: BOARD_SIZE }, (_, y) => (
          <div key={y} className="row">
            {Array.from({ length: BOARD_SIZE }, (_, x) => {
              const isSnake = snake.some(segment => segment.x === x && segment.y === y);
              const isFood = food.x === x && food.y === y;
              const isHead = snake[0]?.x === x && snake[0]?.y === y;

              return (
                <div
                  key={`${x}-${y}`}
                  className={`cell ${isSnake ? 'snake' : ''} ${isFood ? 'food' : ''} ${isHead ? 'head' : ''}`}
                />
              );
            })}
          </div>
        ))}
      </div>

      {/* Mobile Controls */}
      <div className="mobile-controls">
        <div className="control-row">
          <button
            className="control-button"
            onClick={() => {
              console.log('UP button clicked directly');
              if (!gameOver && !isPaused) {
                setDirection('UP');
              }
            }}
            onTouchStart={(e) => {
              e.preventDefault();
              console.log('UP touchstart');
              if (!gameOver && !isPaused) {
                setDirection('UP');
              }
            }}
            disabled={gameOver || isPaused}
            type="button"
            aria-label="Mover para cima"
          >
            <ArrowUp size={24} />
          </button>
        </div>
        <div className="control-row">
          <button
            className="control-button"
            onClick={() => {
              console.log('LEFT button clicked directly');
              if (!gameOver && !isPaused && direction !== 'RIGHT') {
                setDirection('LEFT');
              }
            }}
            onTouchStart={(e) => {
              e.preventDefault();
              console.log('LEFT touchstart');
              if (!gameOver && !isPaused && direction !== 'RIGHT') {
                setDirection('LEFT');
              }
            }}
            disabled={gameOver || isPaused}
            type="button"
            aria-label="Mover para esquerda"
          >
            <ArrowLeft size={24} />
          </button>
          <div className="center-space"></div>
          <button
            className="control-button"
            onClick={() => {
              console.log('RIGHT button clicked directly');
              if (!gameOver && !isPaused && direction !== 'LEFT') {
                setDirection('RIGHT');
              }
            }}
            onTouchStart={(e) => {
              e.preventDefault();
              console.log('RIGHT touchstart');
              if (!gameOver && !isPaused && direction !== 'LEFT') {
                setDirection('RIGHT');
              }
            }}
            disabled={gameOver || isPaused}
            type="button"
            aria-label="Mover para direita"
          >
            <ArrowRight size={24} />
          </button>
        </div>
        <div className="control-row">
          <button
            className="control-button"
            onClick={() => {
              console.log('DOWN button clicked directly');
              if (!gameOver && !isPaused && direction !== 'UP') {
                setDirection('DOWN');
              }
            }}
            onTouchStart={(e) => {
              e.preventDefault();
              console.log('DOWN touchstart');
              if (!gameOver && !isPaused && direction !== 'UP') {
                setDirection('DOWN');
              }
            }}
            disabled={gameOver || isPaused}
            type="button"
            aria-label="Mover para baixo"
          >
            <ArrowDown size={24} />
          </button>
        </div>
      </div>

      {gameOver && (
        <div className="game-over">
          <h3>Game Over!</h3>
          <p>Pontuação final: {score}</p>
          <button onClick={onClose}>Fechar</button>
        </div>
      )}

      {showMessage && (
        <div className="message-overlay">
          <div className="message-box">
            <h3>Mensagem Desmotivacional</h3>
            <p>{currentMessage}</p>
            <button onClick={handleCloseMessage}>Continuar</button>
          </div>
        </div>
      )}

      {showContinueOption && (
        <div className="message-overlay">
          <div className="message-box">
            <h3>Parabéns! Você chegou a {score} pontos!</h3>
            <p>Você pode continuar jogando até 1000 pontos ou avançar para o próximo enigma.</p>
            <div className="continue-buttons">
              <button onClick={handleContinueToNext}>Avançar para Próximo Enigma</button>
              <button onClick={handleContinuePlaying}>Continuar Jogando</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SnakeGame; 