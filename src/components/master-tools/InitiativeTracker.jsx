// src/components/master-tools/InitiativeTracker.jsx
import './InitiativeTracker.css';

export function InitiativeTracker({ tokens = [] }) {
  // Ordena os tokens por iniciativa (maior primeiro)
  const sortedTokens = [...tokens].sort((a, b) => b.initiative - a.initiative);

  return (
    <div className="initiative-tracker">
      <h3>Ordem de Iniciativa</h3>
      <div className="initiative-list">
        {sortedTokens.map((token, index) => (
          <div key={token.id || index} className="initiative-item">
            <span className="position">{index + 1}</span>
            <span 
              className="token-color" 
              style={{ backgroundColor: token.color || '#4a148c' }}
            />
            <span className="token-name">
              {token.name || `Token ${index + 1}`}
            </span>
            <span className="initiative-value">
              {token.initiative || 0}
            </span>
          </div>
        ))}
        
        {sortedTokens.length === 0 && (
          <div className="empty-message">
            Adicione tokens ao grid para ver a iniciativa
          </div>
        )}
      </div>
    </div>
  );
}