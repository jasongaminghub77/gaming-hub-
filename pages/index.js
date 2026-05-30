import React from 'react';

export default function Home() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom right, #0f172a, #581c87)',
      padding: '20px',
      color: 'white',
      fontFamily: 'Arial, sans-serif',
      textAlign: 'center'
    }}>
      <h1 style={{ fontSize: '32px', marginBottom: '20px' }}>🎮 Gaming Hub</h1>
      <p style={{ fontSize: '18px', marginBottom: '40px' }}>Free Online Games - Coming Soon!</p>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
        gap: '15px',
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        {['🐍 Snake', '🧠 Memory', '🦅 Flappy', '⭕ TicTac', '🧱 Breakout', '🎲 Guess'].map((game, i) => (
          <div key={i} style={{
            padding: '20px',
            background: 'rgba(139, 92, 246, 0.2)',
            border: '2px solid #8b5cf6',
            borderRadius: '10px'
          }}>
            <div style={{ fontSize: '32px', marginBottom: '10px' }}>{game.split(' ')[0]}</div>
            <div>{game.split(' ')[1]}</div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '40px', opacity: 0.7 }}>
        <p>&copy; 2024 Gaming Hub | Built on Vercel</p>
      </div>
    </div>
  );
}
