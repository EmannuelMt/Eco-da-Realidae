// src/components/character/CharacterPreview.jsx
import './CharacterPreview.css';

export function CharacterPreview() {
  return (
    <div className="character-preview">
      <h2>Seus Personagens</h2>
      <div className="characters-list">
        <div className="character-card">
          <div className="character-avatar">👤</div>
          <div className="character-info">
            <h3>Novo Personagem</h3>
            <p>NEX: 5%</p>
          </div>
        </div>
      </div>
    </div>
  );
}