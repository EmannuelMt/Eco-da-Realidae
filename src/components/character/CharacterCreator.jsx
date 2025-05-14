import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { OriginSelector } from '../components/character/OriginSelector';
import { ClassSelector } from '../components/character/ClassSelector';
import { AttributeAllocation } from '../components/character/AttributeAllocation';
import { CharacterSheet } from '../components/character/CharacterSheet';
import './CharacterCreator.css';

const steps = ['Origem', 'Classe', 'Atributos', 'Revisão'];

export function CharacterCreator() {
  const [currentStep, setCurrentStep] = useState(0);
  const [character, setCharacter] = useState({
    name: '',
    origin: null,
    class: null,
    attributes: {
      strength: 1,
      agility: 1,
      intellect: 1,
      presence: 1,
      vigor: 1
    },
    nex: 5
  });
  const navigate = useNavigate();

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Salvar personagem e redirecionar
      console.log('Personagem criado:', character);
      navigate('/dashboard');
    }
  };

  const handleBack = () => currentStep > 0 
    ? setCurrentStep(currentStep - 1) 
    : navigate('/dashboard');

  return (
    <div className="character-creator">
      <div className="creation-progress">
        {steps.map((step, index) => (
          <div
            key={step}
            className={`step ${index === currentStep ? 'active' : ''} ${index < currentStep ? 'completed' : ''}`}
          >
            {step}
          </div>
        ))}
      </div>

      <div className="creation-content">
        {currentStep === 0 && (
          <OriginSelector
            selected={character.origin}
            onSelect={(origin) => setCharacter({...character, origin})}
          />
        )}

        {currentStep === 1 && (
          <ClassSelector
            selected={character.class}
            onSelect={(cls) => setCharacter({...character, class: cls})}
          />
        )}

        {currentStep === 2 && (
          <AttributeAllocation
            attributes={character.attributes}
            onUpdate={(attrs) => setCharacter({...character, attributes: attrs})}
          />
        )}

        {currentStep === 3 && <CharacterSheet character={character} />}

        <div className="creation-actions">
          <button onClick={handleBack} className="back-button">
            Voltar
          </button>
          <button onClick={handleNext} className="next-button">
            {currentStep === steps.length - 1 ? 'Finalizar' : 'Próximo'}
          </button>
        </div>
      </div>
    </div>
  );
}