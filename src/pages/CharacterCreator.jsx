import React, { useState, useEffect } from 'react';
import './CharacterCreator.css'; 

const CharacterCreator = () => {
  // Estados do aplicativo
  const [creationStep, setCreationStep] = useState(1);
  const [characterComplete, setCharacterComplete] = useState(false);
  
  // Dados do personagem
  const [character, setCharacter] = useState({
    // Atributos básicos
    name: '',
    player: '',
    nex: 5,
    photo: null,
    photoUrl: '',
    
    // Atributos
    attributes: {
      agility: 1,
      strength: 1,
      intellect: 1,
      presence: 1,
      vigor: 1
    },
    attributePoints: 4,
    
    // Origem
    origin: null,
    originSkills: [],
    originPower: null,
    
    // Classe
    class: null,
    classSkills: [],
    classAbilities: [],
    classProficiencies: [],
    
    // Detalhes finais
    appearance: '',
    personality: '',
    background: '',
    goals: '',
    
    // Status
    health: 0,
    maxHealth: 0,
    sanity: 0,
    maxSanity: 0,
    effort: 0,
    maxEffort: 0,
    
    // Perícias
    skills: [],
    
    // Inventário
    inventory: [],
    
    // Combate
    attacks: [],
    defenses: {
      block: 0,
      dodge: 0,
      armor: 0
    },
    
    // Resistências
    resistances: {
      physical: 0,
      mental: 0,
      paranormal: 0
    }
  });

  // Dados das origens
  const origins = [
    {
      id: 'academic',
      name: 'Acadêmico',
      description: 'Você era um pesquisador ou professor universitário. De forma proposital ou não, seus estudos tocaram em assuntos misteriosos e chamaram a atenção da Ordo Realitas.',
      skills: ['Ciências', 'Investigação'],
      power: {
        name: 'Saber é Poder',
        description: 'Quando faz um teste usando Intelecto, você pode gastar 2 PE para receber +5 nesse teste.'
      }
    },
    {
      id: 'health-agent',
      name: 'Agente de Saúde',
      description: 'Você era um profissional da saúde como um enfermeiro, farmacêutico, médico, psicólogo ou socorrista, treinado no atendimento e cuidado de pessoas.',
      skills: ['Intuição', 'Medicina'],
      power: {
        name: 'Técnica Medicinal',
        description: 'Sempre que cura um personagem, você adiciona seu Intelecto no total de PV curados.'
      }
    },
    // Adicione outras origens conforme necessário
  ];

  // Dados das classes
  const classes = [
    {
      id: 'combatant',
      name: 'Combatente',
      description: 'Treinado para lutar com todo tipo de armas, e com a força e a coragem para encarar os perigos de frente.',
      health: 20,
      effort: 2,
      sanity: 12,
      skills: ['Luta ou Pontaria', 'Fortitude ou Reflexos'],
      proficiencies: ['Armas simples', 'Armas táticas', 'Proteções leves'],
      abilities: ['Ataque especial']
    },
    {
      id: 'specialist',
      name: 'Especialista',
      description: 'Um agente que confia mais em esperteza do que em força bruta.',
      health: 16,
      effort: 3,
      sanity: 16,
      skills: ['7 + Intelecto perícias à escolha'],
      proficiencies: ['Armas simples', 'Proteções leves'],
      abilities: ['Eclético', 'Perito']
    },
    {
      id: 'occultist',
      name: 'Ocultista',
      description: 'O Outro Lado é misterioso, perigoso e, de certa forma, cativante.',
      health: 12,
      effort: 4,
      sanity: 20,
      skills: ['Ocultismo', 'Vontade', '3 + Intelecto perícias à escolha'],
      proficiencies: ['Armas simples'],
      abilities: ['Escolhido pelo Outro Lado']
    }
  ];

  // Estados para UI
  const [selectedOrigin, setSelectedOrigin] = useState(null);
  const [expandedOrigin, setExpandedOrigin] = useState(null);
  const [selectedClass, setSelectedClass] = useState(null);
  const [expandedClass, setExpandedClass] = useState(null);

  // Efeito para calcular atributos derivados
  useEffect(() => {
    if (character.class) {
      const classData = classes.find(c => c.name === character.class);
      if (classData) {
        const maxHealth = classData.health + character.attributes.vigor;
        const maxEffort = classData.effort + character.attributes.presence;
        const maxSanity = classData.sanity;
        
        setCharacter(prev => ({
          ...prev,
          maxHealth,
          health: maxHealth,
          maxEffort,
          effort: maxEffort,
          maxSanity,
          sanity: maxSanity,
          classSkills: classData.skills,
          classProficiencies: classData.proficiencies,
          classAbilities: classData.abilities
        }));
      }
    }
  }, [character.class, character.attributes.vigor, character.attributes.presence]);

  // Manipuladores de atributos
  const handleIncreaseAttribute = (attr) => {
    if (character.attributePoints > 0 && character.attributes[attr] < 3) {
      setCharacter(prev => ({
        ...prev,
        attributes: {
          ...prev.attributes,
          [attr]: prev.attributes[attr] + 1
        },
        attributePoints: prev.attributePoints - 1
      }));
    }
  };

  const handleDecreaseAttribute = (attr) => {
    if (character.attributes[attr] > 1) {
      setCharacter(prev => ({
        ...prev,
        attributes: {
          ...prev.attributes,
          [attr]: prev.attributes[attr] - 1
        },
        attributePoints: prev.attributePoints + 1
      }));
    } else if (character.attributes[attr] === 1) {
      // Reduzir para 0 dá 1 ponto extra
      setCharacter(prev => ({
        ...prev,
        attributes: {
          ...prev.attributes,
          [attr]: 0
        },
        attributePoints: prev.attributePoints + 2
      }));
    }
  };

  // Manipuladores de origem
  const handleSelectOrigin = (origin) => {
    setSelectedOrigin(origin);
    setCharacter(prev => ({
      ...prev,
      origin: origin.name,
      originSkills: origin.skills,
      originPower: origin.power
    }));
  };

  const toggleExpandOrigin = (originId) => {
    setExpandedOrigin(expandedOrigin === originId ? null : originId);
  };

  // Manipuladores de classe
  const handleSelectClass = (cls) => {
    setSelectedClass(cls);
    setCharacter(prev => ({
      ...prev,
      class: cls.name
    }));
  };

  const toggleExpandClass = (classId) => {
    setExpandedClass(expandedClass === classId ? null : classId);
  };

  // Manipuladores de foto
  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCharacter(prev => ({
          ...prev,
          photo: file,
          photoUrl: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Manipuladores de formulário
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCharacter(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Navegação
  const nextStep = () => setCreationStep(prev => prev + 1);
  const prevStep = () => setCreationStep(prev => prev - 1);
  const completeCreation = () => {
    setCharacterComplete(true);
    setCreationStep(5);
  };

  // Renderização condicional
  if (characterComplete) {
    return (
      <div className="character-sheet">
        <div className="sheet-header">
          <div className="character-photo">
            {character.photoUrl ? (
              <img src={character.photoUrl} alt="Personagem" />
            ) : (
              <div className="photo-placeholder">Foto do Personagem</div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              className="photo-upload"
            />
          </div>
          
          <div className="character-info">
            <h1>{character.name || 'Nome do Personagem'}</h1>
            <p>Jogador: {character.player || 'Nome do Jogador'}</p>
            <div className="character-meta">
              <span>Origem: {character.origin || 'Não selecionada'}</span>
              <span>Classe: {character.class || 'Não selecionada'}</span>
              <span>NEX: {character.nex}%</span>
            </div>
          </div>
        </div>

        <div className="sheet-body">
          <div className="status-section">
            <div className="status-box">
              <h3>Vida</h3>
              <div className="status-controls">
                <button>-</button>
                <span>{character.health}/{character.maxHealth}</span>
                <button>+</button>
              </div>
            </div>
            
            <div className="status-box">
              <h3>Sanidade</h3>
              <div className="status-controls">
                <button>-</button>
                <span>{character.sanity}/{character.maxSanity}</span>
                <button>+</button>
              </div>
            </div>
            
            <div className="status-box">
              <h3>Esforço</h3>
              <div className="status-controls">
                <button>-</button>
                <span>{character.effort}/{character.maxEffort}</span>
                <button>+</button>
              </div>
            </div>
          </div>

          <div className="attributes-section">
            <h2>Atributos</h2>
            <div className="attributes-grid">
              {Object.entries(character.attributes).map(([key, value]) => (
                <div key={key} className="attribute-card">
                  <div className="attribute-name">{key.charAt(0).toUpperCase() + key.slice(1)}</div>
                  <div className="attribute-value">{value}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="skills-section">
            <h2>Perícias</h2>
            <div className="skills-list">
              {/* Lista de perícias aqui */}
              <div className="skill-item">
                <span>Acrobacia (AGI)</span>
                <input type="text" placeholder="Bônus" />
              </div>
              {/* Adicione outras perícias conforme necessário */}
            </div>
          </div>

          <div className="abilities-section">
            <h2>Habilidades</h2>
            <div className="abilities-list">
              {character.originPower && (
                <div className="ability-card">
                  <h3>{character.originPower.name}</h3>
                  <p>{character.originPower.description}</p>
                </div>
              )}
              {character.classAbilities.map((ability, index) => (
                <div key={index} className="ability-card">
                  <h3>{ability}</h3>
                  <p>Descrição da habilidade...</p>
                </div>
              ))}
            </div>
          </div>

          <button 
            onClick={() => setCharacterComplete(false)}
            className="edit-button"
          >
            Editar Personagem
          </button>
        </div>
      </div>
    );
  }

  // Fluxo de criação
  return (
    <div className="character-creator">
      {creationStep === 1 && (
        <div className="step-container">
          <h2>Distribuição de Atributos</h2>
          <div className="instructions">
            <p>Todos os atributos começam em 1 e você recebe 4 pontos para distribuir entre eles.</p>
            <p>Você pode reduzir um atributo para 0 para receber 1 ponto adicional.</p>
            <p>O valor máximo inicial que você pode ter em cada atributo é 3.</p>
            <div className="points-remaining">
              Pontos restantes: <strong>{character.attributePoints}</strong>
            </div>
          </div>
          
          <div className="attributes-grid">
            {Object.entries(character.attributes).map(([key, value]) => (
              <div key={key} className="attribute-card">
                <div className="attribute-name">
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </div>
                <div className="attribute-controls">
                  <button 
                    onClick={() => handleDecreaseAttribute(key)}
                    disabled={character.attributes[key] <= 0}
                  >
                    -
                  </button>
                  <div className="attribute-value">{value}</div>
                  <button 
                    onClick={() => handleIncreaseAttribute(key)}
                    disabled={character.attributePoints <= 0 || character.attributes[key] >= 3}
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="navigation-buttons">
            <button 
              onClick={nextStep}
              disabled={character.attributePoints > 0}
              className="next-button"
            >
              Próximo
            </button>
          </div>
        </div>
      )}

      {creationStep === 2 && (
        <div className="step-container">
          <h2>Escolha sua Origem</h2>
          <p className="instructions">
            Sua origem representa como a vida pregressa influencia sua carreira de investigador. 
            Escolha uma origem que se encaixe com o conceito de seu personagem.
          </p>
          
          <div className="origins-grid">
            {origins.map((origin) => (
              <div 
                key={origin.id}
                className={`origin-card ${selectedOrigin?.id === origin.id ? 'selected' : ''}`}
                onClick={() => handleSelectOrigin(origin)}
              >
                <div className="origin-header">
                  <h3>{origin.name}</h3>
                  <button 
                    className="expand-button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleExpandOrigin(origin.id);
                    }}
                  >
                    {expandedOrigin === origin.id ? '▲' : '▼'}
                  </button>
                </div>
                
                {expandedOrigin === origin.id && (
                  <div className="origin-details">
                    <p>{origin.description}</p>
                    <div className="origin-skills">
                      <strong>Perícias Treinadas:</strong>
                      <ul>
                        {origin.skills.map(skill => (
                          <li key={skill}>{skill}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="origin-power">
                      <strong>Poder:</strong>
                      <p><em>{origin.power.name}</em> - {origin.power.description}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="navigation-buttons">
            <button onClick={prevStep} className="back-button">
              Voltar
            </button>
            <button 
              onClick={nextStep}
              disabled={!selectedOrigin}
              className="next-button"
            >
              Próximo
            </button>
          </div>
        </div>
      )}

      {creationStep === 3 && (
        <div className="step-container">
          <h2>Escolha sua Classe</h2>
          <p className="instructions">
            Sua classe indica o treinamento que você recebeu na Ordem para enfrentar os perigos do Outro Lado.
          </p>
          
          <div className="classes-grid">
            {classes.map((cls) => (
              <div 
                key={cls.id}
                className={`class-card ${selectedClass?.id === cls.id ? 'selected' : ''}`}
                onClick={() => handleSelectClass(cls)}
              >
                <div className="class-header">
                  <h3>{cls.name}</h3>
                  <button 
                    className="expand-button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleExpandClass(cls.id);
                    }}
                  >
                    {expandedClass === cls.id ? '▲' : '▼'}
                  </button>
                </div>
                
                {expandedClass === cls.id && (
                  <div className="class-details">
                    <p>{cls.description}</p>
                    <div className="class-stats">
                      <p><strong>PV Iniciais:</strong> {cls.health} + VIGOR</p>
                      <p><strong>PE Iniciais:</strong> {cls.effort} + PRESENÇA</p>
                      <p><strong>Sanidade Inicial:</strong> {cls.sanity}</p>
                    </div>
                    <div className="class-skills">
                      <strong>Perícias Treinadas:</strong>
                      <ul>
                        {cls.skills.map(skill => (
                          <li key={skill}>{skill}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="class-proficiencies">
                      <strong>Proficiências:</strong>
                      <ul>
                        {cls.proficiencies.map(prof => (
                          <li key={prof}>{prof}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="class-abilities">
                      <strong>Habilidades Iniciais:</strong>
                      <ul>
                        {cls.abilities.map(ability => (
                          <li key={ability}>{ability}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="navigation-buttons">
            <button onClick={prevStep} className="back-button">
              Voltar
            </button>
            <button 
              onClick={nextStep}
              disabled={!selectedClass}
              className="next-button"
            >
              Próximo
            </button>
          </div>
        </div>
      )}

      {creationStep === 4 && (
        <div className="step-container">
          <h2>Toques Finais</h2>
          <p className="instructions">
            Complete os detalhes do seu personagem para finalizar a criação.
          </p>
          
          <div className="final-details-form">
            <div className="form-group">
              <label>Nome do Personagem</label>
              <input
                type="text"
                name="name"
                value={character.name}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="form-group">
              <label>Nome do Jogador</label>
              <input
                type="text"
                name="player"
                value={character.player}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="form-group">
              <label>Foto do Personagem</label>
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
              />
              {character.photoUrl && (
                <img 
                  src={character.photoUrl} 
                  alt="Preview" 
                  className="photo-preview"
                />
              )}
            </div>
            
            <div className="form-group">
              <label>Aparência</label>
              <textarea
                name="appearance"
                value={character.appearance}
                onChange={handleInputChange}
                placeholder="Descreva a aparência física do seu personagem..."
              />
            </div>
            
            <div className="form-group">
              <label>Personalidade</label>
              <textarea
                name="personality"
                value={character.personality}
                onChange={handleInputChange}
                placeholder="Descreva os traços de personalidade do seu personagem..."
              />
            </div>
            
            <div className="form-group">
              <label>Histórico</label>
              <textarea
                name="background"
                value={character.background}
                onChange={handleInputChange}
                placeholder="Descreva o histórico do seu personagem..."
              />
            </div>
            
            <div className="form-group">
              <label>Objetivos</label>
              <textarea
                name="goals"
                value={character.goals}
                onChange={handleInputChange}
                placeholder="Quais são os objetivos do seu personagem? Por que ele se juntou à Ordem?..."
              />
            </div>
          </div>
          
          <div className="navigation-buttons">
            <button onClick={prevStep} className="back-button">
              Voltar
            </button>
            <button 
              onClick={completeCreation}
              disabled={!character.name}
              className="complete-button"
            >
              Finalizar Criação
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CharacterCreator;