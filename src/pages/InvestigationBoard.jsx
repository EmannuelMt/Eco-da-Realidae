import { useState } from 'react'
import { ClueCard } from '../components/investigation/ClueCard'
import { ConnectionLine } from '../components/investigation/ConnectionLine'
import './InvestigationBoard.css'

export function InvestigationBoard() {
  const [clues, setClues] = useState([])
  const [connections, setConnections] = useState([])
  const [newClueText, setNewClueText] = useState('')

  const handleAddClue = () => {
    if (newClueText.trim()) {
      setClues([...clues, {
        id: Date.now().toString(),
        text: newClueText,
        x: 100,
        y: 100
      }])
      setNewClueText('')
    }
  }

  return (
    <div className="investigation-board">
      <div className="board-controls">
        <input
          type="text"
          value={newClueText}
          onChange={(e) => setNewClueText(e.target.value)}
          placeholder="Nova pista..."
        />
        <button onClick={handleAddClue}>Adicionar Pista</button>
      </div>

      <div className="board-canvas">
        {clues.map((clue) => (
          <ClueCard
            key={clue.id}
            clue={clue}
            onMove={(x, y) => {
              setClues(clues.map(c => 
                c.id === clue.id ? { ...c, x, y } : c
              ))
            }}
          />
        ))}

        {connections.map((conn, index) => (
          <ConnectionLine
            key={index}
            from={conn.from}
            to={conn.to}
          />
        ))}
      </div>
    </div>
  )
}