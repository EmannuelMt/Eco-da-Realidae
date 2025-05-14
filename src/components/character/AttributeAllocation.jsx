// src/components/character/AttributeAllocation.jsx
import { useState } from 'react';
import './AttributeAllocation.css';

const attributesList = [
  { id: 'strength', name: 'Força', icon: '💪' },
  { id: 'agility', name: 'Agilidade', icon: '🏃‍♂️' },
  { id: 'intellect', name: 'Intelecto', icon: '🧠' },
  { id: 'presence', name: 'Presença', icon: '🎭' },
  { id: 'vigor', name: 'Vigor', icon: '❤️' }
];

export function AttributeAllocation({ attributes: initialAttributes, onUpdate }) {
  const [points, setPoints] = useState(10);
  const [attributes, setAttributes] = useState(initialAttributes);

  const handleIncrease = (attr) => {
    if (points > 0) {
      const newAttributes = {
        ...attributes,
        [attr]: attributes[attr] + 1
      };
      setAttributes(newAttributes);
      setPoints(points - 1);
      onUpdate(newAttributes);
    }
  };

  const handleDecrease = (attr) => {
    if (attributes[attr] > 1) {
      const newAttributes = {
        ...attributes,
        [attr]: attributes[attr] - 1
      };
      setAttributes(newAttributes);
      setPoints(points + 1);
      onUpdate(newAttributes);
    }
  };

  return (
    <div className="attribute-allocation">
      <h2>Distribuição de Atributos</h2>
      <div className="points-remaining">
        Pontos disponíveis: <span>{points}</span>
      </div>
      
      <div className="attributes-grid">
        {attributesList.map((attr) => (
          <div key={attr.id} className="attribute-card">
            <div className="attribute-icon">{attr.icon}</div>
            <div className="attribute-name">{attr.name}</div>
            <div className="attribute-controls">
              <button 
                onClick={() => handleDecrease(attr.id)}
                disabled={attributes[attr.id] <= 1}
              >
                -
              </button>
              <span className="attribute-value">{attributes[attr.id]}</span>
              <button 
                onClick={() => handleIncrease(attr.id)}
                disabled={points <= 0}
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}