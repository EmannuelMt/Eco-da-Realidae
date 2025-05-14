// src/components/character/ClassSelector.jsx
import './ClassSelector.css';

const classes = [
  {
    id: 'combatente',
    name: 'Combatente',
    description: 'Especialista em combate físico',
    icon: '⚔️',
    perks: ['+5 PV por NEX', 'Ataques poderosos']
  },
  {
    id: 'especialista',
    name: 'Especialista',
    description: 'Habilidades técnicas variadas',
    icon: '🔧',
    perks: ['+3 PE por NEX', 'Versatilidade']
  },
  {
    id: 'ocultista',
    name: 'Ocultista',
    description: 'Manejo de energia paranormal',
    icon: '🔮', 
    perks: ['+5 PE por NEX', 'Rituais poderosos']
  }
];

export function ClassSelector({ selected, onSelect }) {
  return (
    <div className="class-selector">
      <h2>Escolha sua Classe</h2>
      <div className="classes-grid">
        {classes.map(cls => (
          <div
            key={cls.id}
            className={`class-card ${selected === cls.id ? 'selected' : ''}`}
            onClick={() => onSelect(cls.id)}
          >
            <div className="class-header">
              <div className="class-icon">{cls.icon}</div>
              <h3>{cls.name}</h3>
            </div>
            <p>{cls.description}</p>
            <ul className="class-perks">
              {cls.perks.map((perk, i) => (
                <li key={i}>{perk}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}