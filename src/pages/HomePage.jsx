import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaSkull, 
  FaBookDead, 
  FaGhost, 
  FaScroll, 
  FaSearch, 
  FaUserSecret,
  FaArrowRight,
  FaRegEye,
  FaRegLightbulb
} from 'react-icons/fa';
import { 
  GiSpellBook, 
  GiCrystalBall,
  GiStonePath,
  GiAbstract024,
  GiCrossedBones,
  GiCandleSkull,
  GiBookmarklet
} from 'react-icons/gi';
import { Logo } from '../components/Logo';
import { Footer } from '../components/Footer'; // Importe Footer, não MainMenu
import { ParanormalQuiz } from '../components/ParanormalQuiz';
import { InteractiveMap } from '../components/InteractiveMap';
import { MysteryOfTheWeek } from '../components/MysteryOfTheWeek';
import { ParanormalRiddles } from '../components/ParanormalRiddles';
import './HomePage.css';

// Componente SVG customizado para substituir GiPentagram
const PentagramIcon = ({ className = "" }) => (
  <svg 
    className={`pentagram-icon ${className}`} 
    width="24" 
    height="24" 
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M12 2L9 12L2 12L8 17L5 22L12 18L19 22L16 17L22 12L15 12L12 2Z" />
  </svg>
);

const HomePage = () => {
  const [showSecret, setShowSecret] = useState(false);
  const [currentMystery, setCurrentMystery] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [activeRiddle, setActiveRiddle] = useState(0);

  const mysteries = [
    "O que está escondido no porão da Mansão Derleth?",
    "O ritual foi realizado, mas algo deu errado...",
    "As marcas na parede não são humanas",
  ];

  const newsItems = [
    { 
      id: 1, 
      title: "O Enigma do Espelho", 
      excerpt: "Vítimas relatam reflexos que se movem independentemente em espelhos antigos...", 
      date: "10/05/2025",
      icon: <GiAbstract024 className="news-icon floating-icon" />
    },
    { 
      id: 2, 
      title: "Ritual da Lua Cheia", 
      excerpt: "Preparativos para o próximo ritual de contenção dimensional começam...", 
      date: "08/05/2025",
      icon: <GiStonePath className="news-icon floating-icon" />
    },
  ];

  const entities = [
    { 
      name: "O Sussurrador", 
      description: "Entidade que corrompe mentes com sons inaudíveis, deixando vítimas em estado catatônico", 
      danger: "Alto",
      icon: <FaSkull className="entity-icon pulse-icon" />
    },
    { 
      name: "A Senhora de Branco", 
      description: "Aparição que atrai vítimas com cantos de ninar perturbadores em cemitérios antigos", 
      danger: "Médio",
      icon: <FaGhost className="entity-icon floating-icon" />
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentMystery((prev) => (prev + 1) % mysteries.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [mysteries.length]);

  useEffect(() => {
    const riddleTimer = setInterval(() => {
      setActiveRiddle((prev) => (prev + 1) % 3);
    }, 10000);
    return () => clearInterval(riddleTimer);
  }, []);

  const revealSecret = (e) => {
    if (e.clientX < 50 && e.clientY < 50) {
      setShowSecret(true);
      setTimeout(() => setShowSecret(false), 3000);
    }
  };

  return (
    <div className="home-container" onClick={revealSecret}>
      <AnimatePresence>
        {showSecret && (
          <motion.div 
            className="secret-message"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p>Você está sendo observado...</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <motion.header 
        className="hero-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <Logo />
          <motion.h1
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            ECO DA REALIDADE
          </motion.h1>
          <motion.p 
            className="tagline"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
          >
            DESVENDE OS SEGREDOS QUE A REALIDADE ESCONDE
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 1 }}
          >
            <Link to="/login" className="cta-button">
              INICIE SUA INVESTIGAÇÃO
            </Link>
          </motion.div>
        </div>

        <motion.div 
          className="mystery-tracker"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <PentagramIcon className="rotate-icon" />
          <p>Mistério atual: {mysteries[currentMystery]}</p>
        </motion.div>
      </motion.header>

      {/* Features Section */}
      <motion.section 
        className="features-section"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.div className="section-header" variants={itemVariants}>
          <PentagramIcon className="rotate-icon" />
          <h2>RECURSOS OCULTOS</h2>
          <div className="divider"></div>
        </motion.div>
        
        <div className="features-grid">
          <motion.div className="feature-card" variants={itemVariants}>
            <div className="feature-icon">
              <FaUserSecret className="floating-icon" />
            </div>
            <h3>CRIAÇÃO DE PERSONAGENS</h3>
            <p>Desenvolva agentes com habilidades únicas para enfrentar o paranormal</p>
            <div className="feature-border"></div>
          </motion.div>
          
          <motion.div className="feature-card" variants={itemVariants}>
            <div className="feature-icon">
              <GiSpellBook className="floating-icon" />
            </div>
            <h3>RITUAIS E HABILIDADES</h3>
            <p>Domine técnicas esotéricas para combater entidades sobrenaturais</p>
            <div className="feature-border"></div>
          </motion.div>
          
          <motion.div className="feature-card" variants={itemVariants}>
            <div className="feature-icon">
              <FaSearch className="pulse-icon" />
            </div>
            <h3>SISTEMA DE INVESTIGAÇÃO</h3>
            <p>Colete pistas, resolva enigmas e desvende mistérios ocultos</p>
            <div className="feature-border"></div>
          </motion.div>
          
          <motion.div className="feature-card" variants={itemVariants}>
            <div className="feature-icon">
              <FaBookDead className="glow-icon" />
            </div>
            <h3>BIBLIOTECA OCULTISTA</h3>
            <p>Acervo completo de rituais, entidades e fenômenos paranormais</p>
            <div className="feature-border"></div>
          </motion.div>
        </div>
      </motion.section>

      {/* News Section */}
      <motion.section 
        className="news-section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="section-header">
          <FaScroll className="section-icon floating-icon" />
          <h2>ÚLTIMAS DESCOBERTAS</h2>
          <div className="divider"></div>
        </div>
        
        <div className="news-grid">
          {newsItems.map((item, index) => (
            <motion.div 
              className="news-card"
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className="news-icon-container">{item.icon}</div>
              <div className="news-tag">{item.date}</div>
              <h3>{item.title}</h3>
              <p>{item.excerpt}</p>
              <div className="news-footer">
                <Link to={`/news/${item.id}`} className="news-link">
                  INVESTIGAR <FaArrowRight className="arrow-icon" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Paranormal Riddles Section */}
      <section className="riddles-section">
        <div className="section-header">
          <GiBookmarklet className="section-icon floating-icon" />
          <h2>ENIGMAS PARANORMAIS</h2>
          <div className="divider"></div>
        </div>
        <ParanormalRiddles activeIndex={activeRiddle} />
      </section>

      {/* Interactive Quiz Section */}
      <section className="interactive-section">
        <div className="section-header">
          <GiCrystalBall className="section-icon floating-icon" />
          <h2>TESTE SEU CONHECIMENTO</h2>
          <div className="divider"></div>
        </div>
        
        <motion.button 
          className="quiz-button"
          onClick={() => setShowQuiz(!showQuiz)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {showQuiz ? 'OCULTAR QUIZ' : 'QUAL ENTIDADE SE CONECTA COM VOCÊ?'}
        </motion.button>
        
        {showQuiz && <ParanormalQuiz />}
      </section>

      {/* Map Section */}
      <section className="map-section">
        <div className="section-header">
          <GiStonePath className="section-icon floating-icon" />
          <h2>LOCAIS MISTERIOSOS</h2>
          <div className="divider"></div>
        </div>
        <InteractiveMap />
      </section>

      {/* Mystery of the Week */}
      <MysteryOfTheWeek />

      {/* Entities Section */}
      <motion.section 
        className="entities-section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="section-header">
          <GiCrossedBones className="section-icon pulse-icon" />
          <h2>ENTIDADES CONHECIDAS</h2>
          <div className="divider"></div>
        </div>
        
        <div className="entities-grid">
          {entities.map((entity, index) => (
            <motion.div 
              className="entity-card"
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.03 }}
            >
              <div className="entity-icon-container">{entity.icon}</div>
              <div className="entity-header">
                <h3>{entity.name}</h3>
                <div className={`danger-level ${entity.danger.toLowerCase()}`}>
                  PERIGO: {entity.danger}
                </div>
              </div>
              <p>{entity.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
};

export default HomePage;