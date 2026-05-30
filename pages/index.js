import React, { useState, useEffect } from 'react';

export default function Home() {
  const [page, setPage] = useState('home');
  const [score, setScore] = useState(0);

  if (page === 'home') {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(to bottom right, #0f172a, #581c87, #0f172a)',
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
        color: 'white'
      }}>
        <h1 style={{ textAlign: 'center', fontSize: '36px', marginBottom: '30px' }}>🎮 Gaming Hub</h1>
        
        <div style={{
          maxWidth: '800px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '15px'
        }}>
          {[
            { name: 'Snake', emoji: '🐍', id: 'snake' },
            { name: 'Memory', emoji: '🧠', id: 'memory' },
            { name: 'Flappy', emoji: '🦅', id: 'flappy' },
            { name: 'Tic Tac Toe', emoji: '⭕', id: 'tictac' },
            { name: 'Breakout', emoji: '🧱', id: 'breakout' },
            { name: 'Number Guess', emoji: '🎲', id: 'guess' }
          ].map((game) => (
            <button
              key={game.id}
              onClick={() => setPage(game.id)}
              style={{
                padding: '20px',
                background: 'rgba(139, 92, 246, 0.3)',
                border: '2px solid #8b5cf6',
                borderRadius: '10px',
                color: 'white',
                cursor: 'pointer',
                fontSize: '14px',
                transition: 'all 0.3s'
              }}
            >
              <div style={{ fontSize: '40px', marginBottom: '10px' }}>{game.emoji}</div>
              <div>{game.name}</div>
            </button>
          ))}
        </div>

        <div style={{
          marginTop: '60px',
          textAlign: 'center',
          opacity: 0.7,
          fontSize: '12px'
        }}>
          <p>&copy; 2024 Gaming Hub | Free Games for Everyone!</p>
        </div>
      </div>
    );
  }

  // Snake Game
  if (page === 'snake') {
    return (
      <SnakeGame onBack={() => setPage('home')} />
    );
  }

  // Memory Game
  if (page === 'memory') {
    return (
      <MemoryGame onBack={() => setPage('home')} />
    );
  }

  // Flappy Game
  if (page === 'flappy') {
    return (
      <FlappyGame onBack={() => setPage('home')} />
    );
  }

  // Tic Tac Toe
  if (page === 'tictac') {
    return (
      <TicTacGame onBack={() => setPage('home')} />
    );
  }

  // Number Guess
  if (page === 'guess') {
    return (
      <GuessGame onBack={() => setPage('home')} />
    );
  }

  return null;
}

// Snake Game Component
function SnakeGame({ onBack }) {
  const [snake, setSnake] = useState([[10, 10]]);
  const [food, setFood] = useState([15, 15]);
  const [direction, setDirection] = useState([1, 0]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (gameOver) return;

    const interval = setInterval(() => {
      setSnake((prev) => {
        const head = prev[0];
        const newHead = [head[0] + direction[0], head[1] + direction[1]];

        if (newHead[0] < 0 || newHead[0] >= 20 || newHead[1] < 0 || newHead[1] >= 20) {
          setGameOver(true);
          return prev;
        }

        if (prev.some((seg) => seg[0] === newHead[0] && seg[1] === newHead[1])) {
          setGameOver(true);
          return prev;
        }

        let newSnake = [newHead, ...prev];
        if (newHead[0] === food[0] && newHead[1] === food[1]) {
          setFood([Math.floor(Math.random() * 20), Math.floor(Math.random() * 20)]);
          setScore((s) => s + 10);
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [direction, food, gameOver]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'ArrowUp' || e.key === 'w') setDirection([0, -1]);
      if (e.key === 'ArrowDown' || e.key === 's') setDirection([0, 1]);
      if (e.key === 'ArrowLeft' || e.key === 'a') setDirection([-1, 0]);
      if (e.key === 'ArrowRight' || e.key === 'd') setDirection([1, 0]);
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom right, #0f172a, #581c87)',
      padding: '20px',
      color: 'white',
      fontFamily: 'Arial, sans-serif',
      textAlign: 'center'
    }}>
      <h1>🐍 Snake Game</h1>
      <p>Score: {score}</p>

      <svg width="500" height="500" style={{ background: '#000', margin: '20px auto', display: 'block', border: '2px solid #0f0' }}>
        {snake.map((seg, idx) => (
          <rect key={idx} x={seg[0] * 25} y={seg[1] * 25} width="25" height="25" fill={idx === 0 ? '#0f0' : '#0a0'} />
        ))}
        <circle cx={food[0] * 25 + 12.5} cy={food[1] * 25 + 12.5} r="12" fill="#f00" />
      </svg>

      {gameOver && (
        <div>
          <p style={{ fontSize: '20px', color: '#f00' }}>Game Over!</p>
          <p>Final Score: {score}</p>
        </div>
      )}

      <button onClick={onBack} style={{
        padding: '10px 20px',
        background: '#8b5cf6',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        marginTop: '20px'
      }}>
        ← Back to Games
      </button>
    </div>
  );
}

// Memory Game Component
function MemoryGame({ onBack }) {
  const [cards, setCards] = useState(() => {
    const symbols = ['🌟', '🎨', '🎭', '🎪', '🎬', '🎸', '🎯', '🎲'];
    return [...symbols, ...symbols].sort(() => Math.random() - 0.5);
  });
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);

  const handleFlip = (idx) => {
    if (flipped.includes(idx) || matched.includes(idx) || flipped.length === 2) return;

    const newFlipped = [...flipped, idx];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      if (cards[newFlipped[0]] === cards[newFlipped[1]]) {
        setMatched([...matched, ...newFlipped]);
        setFlipped([]);
      } else {
        setTimeout(() => setFlipped([]), 600);
      }
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom right, #0f172a, #581c87)',
      padding: '20px',
      color: 'white',
      fontFamily: 'Arial, sans-serif',
      textAlign: 'center'
    }}>
      <h1>🧠 Memory Match</h1>
      <p>Find matching pairs!</p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '10px',
        maxWidth: '400px',
        margin: '20px auto'
      }}>
        {cards.map((card, idx) => (
          <button
            key={idx}
            onClick={() => handleFlip(idx)}
            style={{
              padding: '30px',
              background: flipped.includes(idx) || matched.includes(idx) ? '#8b5cf6' : '#5a4d7f',
              border: 'none',
              borderRadius: '5px',
              color: 'white',
              fontSize: '24px',
              cursor: 'pointer'
            }}
          >
            {flipped.includes(idx) || matched.includes(idx) ? card : '?'}
          </button>
        ))}
      </div>

      {matched.length === cards.length && (
        <p style={{ fontSize: '20px', color: '#0f0' }}>You Won! 🎉</p>
      )}

      <button onClick={onBack} style={{
        padding: '10px 20px',
        background: '#8b5cf6',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        marginTop: '20px'
      }}>
        ← Back to Games
      </button>
    </div>
  );
}

// Flappy Game Component
function FlappyGame({ onBack }) {
  const [birdY, setBirdY] = useState(150);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    let velocity = 0;
    const gameLoop = setInterval(() => {
      setBirdY((prev) => {
        velocity += 0.4;
        const newY = prev + velocity;
        if (newY > 280 || newY < 0) setGameOver(true);
        return newY;
      });
    }, 30);

    const handleJump = () => {
      setBirdY((prev) => Math.max(prev - 8, 0));
    };

    window.addEventListener('click', handleJump);
    window.addEventListener('keydown', (e) => {
      if (e.key === ' ') {
        e.preventDefault();
        handleJump();
      }
    });

    return () => {
      clearInterval(gameLoop);
      window.removeEventListener('click', handleJump);
    };
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom right, #0f172a, #581c87)',
      padding: '20px',
      color: 'white',
      fontFamily: 'Arial, sans-serif',
      textAlign: 'center'
    }}>
      <h1>🦅 Flappy Bird</h1>
      <p>Score: {score} | Click or press SPACE to fly!</p>

      <svg width="400" height="300" style={{ background: '#87CEEB', margin: '20px auto', display: 'block', border: '2px solid #333' }}>
        <circle cx="50" cy={birdY} r="15" fill="#FFD700" />
      </svg>

      {gameOver && (
        <div>
          <p style={{ fontSize: '20px', color: '#f00' }}>Game Over!</p>
          <button onClick={() => window.location.reload()} style={{
            padding: '10px 20px',
            background: '#ff6b6b',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}>
            Play Again
          </button>
        </div>
      )}

      <button onClick={onBack} style={{
        padding: '10px 20px',
        background: '#8b5cf6',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        marginTop: '20px'
      }}>
        ← Back to Games
      </button>
    </div>
  );
}

// Tic Tac Toe Component
function TicTacGame({ onBack }) {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  const calculateWinner = (squares) => {
    const lines = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
    for (let [a, b, c] of lines) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const winner = calculateWinner(board);

  const handleClick = (idx) => {
    if (board[idx] || winner) return;
    const newBoard = [...board];
    newBoard[idx] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom right, #0f172a, #581c87)',
      padding: '20px',
      color: 'white',
      fontFamily: 'Arial, sans-serif',
      textAlign: 'center'
    }}>
      <h1>⭕ Tic Tac Toe</h1>
      <p>{winner ? `Winner: ${winner}` : `Player: ${isXNext ? 'X' : 'O'}`}</p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 80px)',
        gap: '5px',
        margin: '20px auto',
        width: '260px'
      }}>
        {board.map((cell, idx) => (
          <button
            key={idx}
            onClick={() => handleClick(idx)}
            style={{
              padding: '20px',
              fontSize: '24px',
              background: '#8b5cf6',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            {cell}
          </button>
        ))}
      </div>

      {winner && (
        <button onClick={() => window.location.reload()} style={{
          padding: '10px 20px',
          background: '#0f0',
          color: '#000',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          marginTop: '20px'
        }}>
          Play Again
        </button>
      )}

      <button onClick={onBack} style={{
        padding: '10px 20px',
        background: '#8b5cf6',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        marginTop: '20px',
        display: 'block',
        margin: '20px auto 0'
      }}>
        ← Back to Games
      </button>
    </div>
  );
}

// Guess Game Component
function GuessGame({ onBack }) {
  const [secret, setSecret] = useState(() => Math.floor(Math.random() * 100) + 1);
  const [guess, setGuess] = useState('');
  const [message, setMessage] = useState('Guess a number between 1-100');
  const [attempts, setAttempts] = useState(0);
  const [won, setWon] = useState(false);

  const handleGuess = () => {
    const num = parseInt(guess);
    if (isNaN(num)) return;

    setAttempts(a => a + 1);

    if (num === secret) {
      setMessage(`🎉 You got it in ${attempts + 1} attempts!`);
      setWon(true);
    } else if (num < secret) {
      setMessage('Too low! Go higher ⬆️');
    } else {
      setMessage('Too high! Go lower ⬇️');
    }

    setGuess('');
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom right, #0f172a, #581c87)',
      padding: '20px',
      color: 'white',
      fontFamily: 'Arial, sans-serif',
      textAlign: 'center'
    }}>
      <h1>🎲 Number Guess</h1>
      <p>{message}</p>
      <p>Attempts: {attempts}</p>

      {!won && (
        <div style={{ margin: '20px 0' }}>
          <input
            type="number"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleGuess()}
            placeholder="Enter number"
            style={{
              padding: '10px',
              fontSize: '16px',
              width: '150px',
              marginRight: '10px',
              borderRadius: '5px',
              border: 'none'
            }}
          />
          <button onClick={handleGuess} style={{
            padding: '10px 20px',
            background: '#8b5cf6',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px'
          }}>
            Guess
          </button>
        </div>
      )}

      {won && (
        <button onClick={() => window.location.reload()} style={{
          padding: '10px 20px',
          background: '#0f0',
          color: '#000',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          marginTop: '20px'
        }}>
          Play Again
        </button>
      )}

      <button onClick={onBack} style={{
        padding: '10px 20px',
        background: '#8b5cf6',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        marginTop: '20px',
        display: 'block',
        margin: '20px auto 0'
      }}>
        ← Back to Games
      </button>
    </div>
  );
}
