import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaRegEye, 
  FaRegLightbulb, 
  FaClock,
  FaMask,
  FaBook,
  FaHands,
  FaChevronLeft,
  FaChevronRight,
  FaSkull,
  FaCompass,
  FaBookDead,
  FaKey,
  FaWater,
  FaFire,
  FaStar,
  FaTimes,
  FaCheck
} from 'react-icons/fa';
import { GiCandleSkull, GiStonePath, GiBloodySword } from 'react-icons/gi';
import './ParanormalRiddles.css';

const PentagramIcon = ({ className = "" }) => (
  <svg className={`pentagram-icon ${className}`} width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2L9 12L2 12L8 17L5 22L12 18L19 22L16 17L22 12L15 12L12 2Z" />
  </svg>
);

const riddles = [
  // ... (seus enigmas existentes)
  {
    id: 15,
    title: "O Portal das Sombras",
    question: `Uma porta com três fechaduras mostra a inscrição:
    
    "A primeira chave é o silêncio,
    a segunda é a paciência,
    a terceira você deve adivinhar."
    
    Há três objetos: um sino, um relógio e um espelho.`,
    answer: "Não tocar no sino (silêncio), observar o relógio (paciência) e quebrar o espelho (adivinhar o medo).",
    solution: "quebrar espelho",
    icon: <FaStar className="riddle-icon pulse-icon" />,
    difficulty: "Difícil"
  }
];

export function ParanormalRiddles() {
  const [activeRiddle, setActiveRiddle] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState({ show: false, correct: false });
  const [attempts, setAttempts] = useState(0);
  const [hint, setHint] = useState('');

  const currentRiddle = riddles[activeRiddle];

  const verifyAnswer = () => {
    const normalizedAnswer = userAnswer.toLowerCase().trim();
    const normalizedSolution = currentRiddle.solution.toLowerCase();
    
    if (normalizedAnswer === normalizedSolution) {
      setFeedback({ show: true, correct: true });
      setAttempts(0);
      setTimeout(() => {
        setFeedback({ show: false, correct: false });
        goToNextRiddle();
      }, 2000);
    } else {
      setAttempts(prev => prev + 1);
      setFeedback({ show: true, correct: false });
      
      // Dicas progressivas
      if (attempts >= 1) {
        const solutionWords = currentRiddle.solution.split(' ');
        setHint(`Dica: A resposta contém a palavra "${solutionWords[0]}"`);
      }
      
      setTimeout(() => {
        setFeedback({ show: false, correct: false });
      }, 2000);
    }
  };

  const goToNextRiddle = useCallback(() => {
    setActiveRiddle(prev => (prev + 1) % riddles.length);
    setUserAnswer('');
    setFeedback({ show: false, correct: false });
    setAttempts(0);
    setHint('');
  }, []);

  const goToPrevRiddle = useCallback(() => {
    setActiveRiddle(prev => (prev - 1 + riddles.length) % riddles.length);
    setUserAnswer('');
    setFeedback({ show: false, correct: false });
    setAttempts(0);
    setHint('');
  }, []);

  return (
    <div className="riddles-container">
      <motion.div
        key={currentRiddle.id}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="riddle-card"
      >
        <div className="riddle-header">
          <div className="riddle-meta">
            <span className={`difficulty-badge ${currentRiddle.difficulty.toLowerCase()}`}>
              {currentRiddle.difficulty}
            </span>
            <span className="attempts">Tentativas: {attempts}</span>
          </div>
          <div className="icon-title-wrapper">
            {currentRiddle.icon}
            <h3>{currentRiddle.title}</h3>
          </div>
        </div>

        <div className="riddle-content">
          <pre>{currentRiddle.question}</pre>
          
          {hint && <div className="hint-box">{hint}</div>}

          <div className="answer-section">
            <input
              type="text"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Digite sua resposta..."
              className="answer-input"
              onKeyPress={(e) => e.key === 'Enter' && verifyAnswer()}
            />
            <button 
              onClick={verifyAnswer}
              className="submit-button"
              disabled={!userAnswer.trim()}
            >
              Verificar
            </button>
          </div>

          <AnimatePresence>
            {feedback.show && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className={`feedback-message ${feedback.correct ? 'correct' : 'incorrect'}`}
              >
                {feedback.correct ? (
                  <>
                    <FaCheck /> Correto!
                  </>
                ) : (
                  <>
                    <FaTimes /> Incorreto. Tente novamente!
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="navigation-controls">
          <button onClick={goToPrevRiddle} className="nav-button">
            <FaChevronLeft /> Anterior
          </button>
          <button onClick={goToNextRiddle} className="nav-button">
            Próximo <FaChevronRight />
          </button>
        </div>
      </motion.div>
    </div>
  );
}