// src/components/character/CharacterSheet.jsx
import './CharacterSheet.css';

export function CharacterSheet({ character }) {
  return (
    <div className="character-sheet">
      <header className="sheet-header">
        <h2>{character.name || 'Novo Personagem'}</h2>
        <div className="basic-info">
          <span>Origem: {character.origin || 'Não selecionada'}</span>
          <span>Classe: {character.class || 'Não selecionada'}</span>
          <span>NEX: {character.nex || 5}%</span>
        </div>
      </header>

      <div className="attributes-section">
        <h3>Atributos</h3>
        <div className="attributes-grid">
          {Object.entries(character.attributes || {}).map(([attr, value]) => (
            <div key={attr} className="attribute-item">
              <span className="attr-name">{attr}</span>
              <span className="attr-value">{value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="skills-section">
        <h3>Perícias</h3>
        {/* Implementar lista de perícias */}
      </div>
    </div>
  );
}