import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaGhost, 
  FaSkull, 
  FaUser, 
  FaRedo,
  FaArrowRight
} from 'react-icons/fa';
import './ParanormalQuiz.css'; 

export function ParanormalQuiz() {
  const questions = [
    {
      question: "Como você reagiria a um som estranho à noite?",
      options: [
        { text: "Investigaria imediatamente", icon: <FaArrowRight /> },
        { text: "Esperaria até de manhã", icon: <FaUser /> },
        { text: "Ignoraria completamente", icon: null },
        { text: "Gritaria por ajuda", icon: <FaSkull /> }
      ],
      scores: [3, 2, 1, 0]
    },
    {
      question: "O que você faria se visse um objeto se movendo sozinho?",
      options: [
        { text: "Tentaria se comunicar com o fenômeno", icon: <FaGhost /> },
        { text: "Observaria à distância e anotaria tudo", icon: null },
        { text: "Sairia correndo do local", icon: <FaSkull /> },
        { text: "Buscaria uma explicação lógica", icon: <FaUser /> }
      ],
      scores: [3, 2, 0, 1]
    },
    {
      question: "Como você se sente em cemitérios à noite?",
      options: [
        { text: "Confortável, como se estivesse em casa", icon: <FaGhost /> },
        { text: "Alerto, mas não necessariamente assustado", icon: null },
        { text: "Extremamente desconfortável", icon: <FaSkull /> },
        { text: "Indiferente, é só um lugar", icon: <FaUser /> }
      ],
      scores: [3, 2, 0, 1]
    }
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleAnswer = (selectedScore, index) => {
    setSelectedOption(index);
    
    setTimeout(() => {
      setScore(score + selectedScore);
      setSelectedOption(null);
      
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setShowResult(true);
      }
    }, 800);
  };

  const getResult = () => {
    const maxScore = questions.length * 3;
    const percentage = (score / maxScore) * 100;

    if (percentage >= 75) {
      return {
        title: "O Sussurrador",
        description: "Você tem uma conexão intensa com o paranormal. Cuidado com o que ouve...",
        icon: <FaGhost className="result-icon" />,
        color: "#9e1b1b"
      };
    } else if (percentage >= 50) {
      return {
        title: "A Senhora de Branco",
        description: "Você percebe presenças, mas mantém uma distância segura.",
        icon: <FaUser className="result-icon" />,
        color: "#6f42c1"
      };
    } else if (percentage >= 25) {
      return {
        title: "Observador Cético",
        description: "Você prefere explicações lógicas, mas já teve suas dúvidas.",
        icon: <FaUser className="result-icon" />,
        color: "#003f5c"
      };
    } else {
      return {
        title: "Humano Comum",
        description: "Nenhuma conexão paranormal detectada. Você vive no mundo real.",
        icon: <FaUser className="result-icon" />,
        color: "#c4a000"
      };
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
  };

  return (
    <div className="quiz-container">
      <AnimatePresence mode='wait'>
        {!showResult ? (
          <motion.div
            key={`question-${currentQuestion}`}
            className="quiz-question"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.5 }}
          >
            <div className="quiz-header">
              <h3>{questions[currentQuestion].question}</h3>
              <div className="question-counter">
                <span>{currentQuestion + 1}</span> / {questions.length}
              </div>
            </div>
            
            <div className="quiz-options">
              {questions[currentQuestion].options.map((option, index) => (
                <motion.button
                  key={index}
                  onClick={() => handleAnswer(questions[currentQuestion].scores[index], index)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0,
                    transition: { delay: index * 0.1 }
                  }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className={selectedOption === index ? "selected" : ""}
                >
                  {option.icon && <span className="option-icon">{option.icon}</span>}
                  {option.text}
                </motion.button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            className="quiz-result"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="result-header" style={{ borderColor: getResult().color }}>
              <div className="result-icon-container" style={{ backgroundColor: getResult().color }}>
                {getResult().icon}
              </div>
              <h3>SEU RESULTADO</h3>
            </div>
            
            <div className="result-content">
              <h4 style={{ color: getResult().color }}>{getResult().title}</h4>
              <p>{getResult().description}</p>
              
              <div className="score-meter">
                <div 
                  className="score-fill" 
                  style={{ 
                    width: `${(score / (questions.length * 3)) * 100}%`,
                    backgroundColor: getResult().color
                  }}
                />
              </div>
              
              <motion.button
                onClick={resetQuiz}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="retry-button"
              >
                <FaRedo /> REFAZER TESTE
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}