import React, { useState, useEffect, useCallback } from 'react';
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';
// import './SnakeGame.css'; // CSS removido - arquivo não existe

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
    const preventZoom = (e: TouchEvent) => {
      // Apenas previne gestos de multi-touch (zoom, pinch)
      if (e.touches.length > 1) {
        e.preventDefault();
      }
    };

    const preventScrollOnGameArea = (e: TouchEvent) => {
      // Previne scroll apenas se o toque for na área do jogo
      const target = e.target as Element;
      if (target.closest('.game-board') || target.closest('.mobile-controls')) {
        // Permite toques únicos nos botões, mas previne scroll
        if (e.touches.length === 1 && target.closest('.mobile-controls')) {
          return; // Não previne toques nos botões de controle
        }
        e.preventDefault();
      }
    };

    // Usar touchmove para prevenir scroll, não touchstart
    document.addEventListener('touchmove', preventZoom, { passive: false });
    document.addEventListener('touchmove', preventScrollOnGameArea, { passive: false });

    return () => {
      document.removeEventListener('touchmove', preventZoom);
      document.removeEventListener('touchmove', preventScrollOnGameArea);
    };
  }, []);

  return (
    <div style={{
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
      borderRadius: '20px',
      padding: '30px',
      maxWidth: '500px',
      width: '100%',
      border: '2px solid #FFD700',
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5)',
      color: 'white',
      position: 'relative',
      margin: '0 auto',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh'
    }}>
      <div style={{
        textAlign: 'center',
        marginBottom: '20px',
        paddingBottom: '15px',
        borderBottom: '2px solid rgba(255, 215, 0, 0.3)',
        width: '100%'
      }}>
        <h2>🐍 Snake Game - Desafio da Cobra 🐍</h2>
        <p>Colete as maçãs para ganhar pontos!</p>
        <div style={{
          fontSize: '18px',
          fontWeight: '600',
          color: '#FFD700',
          background: 'rgba(255, 215, 0, 0.1)',
          padding: '8px 16px',
          borderRadius: '8px',
          display: 'inline-block'
        }}>Pontuação: {score}</div>
        {/* Debug info */}
        <div style={{ fontSize: '12px', marginTop: '10px', color: '#ccc' }}>
          Debug: Direction: {direction} | Game Over: {gameOver.toString()} | Paused: {isPaused.toString()}
        </div>
        <button 
          onClick={() => {
            console.log('🔴 TESTE: Botão vermelho clicado!');
            alert('Botão vermelho funcionou!');
            console.log('🔴 TESTE: Tentando mudar direção para UP');
            setDirection('UP');
            console.log('🔴 TESTE: setDirection chamado');
          }}
          onTouchStart={() => {
            console.log('🔴 TESTE: Touch no botão vermelho!');
            alert('Touch no botão vermelho funcionou!');
          }}
          style={{ 
            marginTop: '10px', 
            padding: '10px 15px', 
            backgroundColor: '#ff0000',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            fontSize: '14px',
            cursor: 'pointer'
          }}
        >
          🔴 TESTE BÁSICO
        </button>
        <button 
          onClick={() => {
            console.log('🟢 TESTE: Botão verde clicado!');
            alert('Clique funcionou! Direction atual: ' + direction);
          }}
          style={{ 
            marginTop: '5px', 
            padding: '10px 15px', 
            backgroundColor: '#00ff00',
            color: 'black',
            border: 'none',
            borderRadius: '5px',
            fontSize: '14px',
            cursor: 'pointer'
          }}
        >
          🟢 TESTE ALERT
        </button>
      </div>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: '20px',
        border: '2px solid #FFD700',
        borderRadius: '10px',
        overflow: 'hidden',
        background: '#0a0a0a',
        width: '300px',
        height: '300px'
      }}>
        {Array.from({ length: BOARD_SIZE }, (_, y) => (
          <div key={y} style={{ display: 'flex', height: '15px' }}>
            {Array.from({ length: BOARD_SIZE }, (_, x) => {
              const isSnake = snake.some(segment => segment.x === x && segment.y === y);
              const isFood = food.x === x && food.y === y;
              const isHead = snake[0]?.x === x && snake[0]?.y === y;

              let bgColor = '#000';
              if (isHead) bgColor = '#FFD700';
              else if (isSnake) bgColor = '#4CAF50';
              else if (isFood) bgColor = '#FF6B6B';

              return (
                <div
                  key={`${x}-${y}`}
                  style={{
                    width: '15px',
                    height: '15px',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    background: bgColor,
                    borderRadius: isFood ? '50%' : '2px'
                  }}
                />
              );
            })}
          </div>
        ))}
      </div>

      {/* Mobile Controls - SUPER SIMPLIFICADO */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h3 style={{ color: '#FFD700', marginBottom: '15px' }}>CONTROLES DE TESTE</h3>
        <div style={{ margin: '10px 0' }}>
          <button
            onClick={() => {
              console.log('🔵 UP CLICADO!');
              alert('UP clicado! Direction: ' + direction);
              if (!gameOver && !isPaused && direction !== 'DOWN') {
                setDirection('UP');
              }
            }}
            style={{
              display: 'block',
              margin: '5px auto',
              padding: '15px 30px',
              backgroundColor: '#0066ff',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              fontSize: '16px',
              cursor: 'pointer',
              minHeight: '50px',
              minWidth: '120px'
            }}
          >
            ⬆️ UP
          </button>
        </div>
        <div style={{ margin: '10px 0' }}>
          <button
            onClick={() => {
              console.log('🟡 LEFT CLICADO!');
              alert('LEFT clicado! Direction: ' + direction);
              if (!gameOver && !isPaused && direction !== 'RIGHT') {
                setDirection('LEFT');
              }
            }}
            style={{
              padding: '15px 20px',
              backgroundColor: '#ffaa00',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              fontSize: '16px',
              cursor: 'pointer',
              marginRight: '10px',
              minHeight: '50px',
              minWidth: '100px'
            }}
          >
            ⬅️ LEFT
          </button>
          <button
            onClick={() => {
              console.log('🟢 RIGHT CLICADO!');
              alert('RIGHT clicado! Direction: ' + direction);
              if (!gameOver && !isPaused && direction !== 'LEFT') {
                setDirection('RIGHT');
              }
            }}
            style={{
              padding: '15px 20px',
              backgroundColor: '#00aa00',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              fontSize: '16px',
              cursor: 'pointer',
              marginLeft: '10px',
              minHeight: '50px',
              minWidth: '100px'
            }}
          >
            ➡️ RIGHT
          </button>
        </div>
        <div style={{ margin: '10px 0' }}>
          <button
            onClick={() => {
              console.log('🟣 DOWN CLICADO!');
              alert('DOWN clicado! Direction: ' + direction);
              if (!gameOver && !isPaused && direction !== 'UP') {
                setDirection('DOWN');
              }
            }}
            style={{
              display: 'block',
              margin: '5px auto',
              padding: '15px 30px',
              backgroundColor: '#aa00aa',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              fontSize: '16px',
              cursor: 'pointer',
              minHeight: '50px',
              minWidth: '120px'
            }}
          >
            ⬇️ DOWN
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