// src/components/character/OriginSelector.jsx
import './OriginSelector.css';

const origins = [
  { id: 'academico', name: 'Acadêmico', description: 'Você sempre foi estudioso', icon: '📚' },
  { id: 'artista', name: 'Artista', description: 'Expressão criativa é seu dom', icon: '🎨' },
  { id: 'atleta', name: 'Atleta', description: 'Condicionamento físico excepcional', icon: '🏅' },
  { id: 'criminoso', name: 'Criminoso', description: 'Vida nas sombras', icon: '🕶️' },
  { id: 'cultista', name: 'Cultista', description: 'Conhecimento obscuro', icon: '🔮' }
];

export function OriginSelector({ selected, onSelect }) {
  return (
    <div className="origin-selector">
      <h2>Selecione sua Origem</h2>
      <div className="origins-grid">
        {origins.map(origin => (
          <div 
            key={origin.id}
            className={`origin-card ${selected === origin.id ? 'selected' : ''}`}
            onClick={() => onSelect(origin.id)}
          >
            <div className="origin-icon">{origin.icon}</div>
            <h3>{origin.name}</h3>
            <p>{origin.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}