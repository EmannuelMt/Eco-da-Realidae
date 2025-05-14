import { Stage, Layer, Rect, Circle } from 'react-konva';
import { useRef, useState } from 'react';
import './BattleGrid.css';

export const BattleGrid = () => {
  const [gridSize, setGridSize] = useState({ width: 20, height: 20 });
  const [cells, setCells] = useState(Array(20).fill().map(() => Array(20).fill(null)));
  const [characters, setCharacters] = useState([]);
  const stageRef = useRef(null);

  const handleCellClick = (x, y) => {
    // Lógica para adicionar/mover personagens
  };

  return (
    <div className="battle-grid-container">
      <Stage 
        width={800} 
        height={800} 
        ref={stageRef}
        className="battle-stage"
      >
        <Layer>
          {/* Renderizar grid */}
          {cells.map((row, y) => 
            row.map((cell, x) => (
              <Rect
                key={`${x}-${y}`}
                x={x * 40}
                y={y * 40}
                width={40}
                height={40}
                fill={(x + y) % 2 === 0 ? '#eee' : '#ddd'}
                stroke="#ccc"
                onClick={() => handleCellClick(x, y)}
              />
            ))
          )}

          {/* Renderizar personagens */}
          {characters.map((char, i) => (
            <Circle
              key={i}
              x={char.x * 40 + 20}
              y={char.y * 40 + 20}
              radius={15}
              fill={char.color}
              draggable
              onDragEnd={(e) => {
                const pos = {
                  x: Math.round(e.target.x() / 40),
                  y: Math.round(e.target.y() / 40)
                };
                // Atualizar posição do personagem
              }}
            />
          ))}
        </Layer>
      </Stage>

      <div className="battle-controls">
        <button>Adicionar NPC</button>
        <button>Calcular Iniciativa</button>
        <button>Efeitos de Área</button>
      </div>
    </div>
  );
};