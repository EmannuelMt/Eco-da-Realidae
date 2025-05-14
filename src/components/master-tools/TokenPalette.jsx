// src/components/master-tools/TokenPalette.jsx
import { useState } from 'react';
import './TokenPalette.css';

const tokenTypes = [
  { id: 'player', label: 'Jogador', color: '#4CAF50', icon: '👤' },
  { id: 'npc', label: 'NPC', color: '#2196F3', icon: '💬' },
  { id: 'enemy', label: 'Inimigo', color: '#F44336', icon: '👹' },
  { id: 'object', label: 'Objeto', color: '#FF9800', icon: '🪑' },
];

export function TokenPalette({ onSelect }) {
  const [selected, setSelected] = useState(null);

  const handleSelect = (token) => {
    setSelected(token.id);
    onSelect(token);
  };

  return (
    <div className="token-palette">
      <h3>Tokens</h3>
      <div className="tokens-grid">
        {tokenTypes.map((token) => (
          <button
            key={token.id}
            className={`token-button ${selected === token.id ? 'selected' : ''}`}
            onClick={() => handleSelect(token)}
            style={{ backgroundColor: token.color }}
            title={token.label}
          >
            {token.icon}
          </button>
        ))}
      </div>
    </div>
  );
}