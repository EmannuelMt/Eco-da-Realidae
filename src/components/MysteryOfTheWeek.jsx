import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaEye, FaMoon, FaCalendarAlt, FaSnowflake } from 'react-icons/fa';
import { GiAncientSword, GiGlassHeart } from 'react-icons/gi'; 
import './MysteryOfTheWeek.css'; 
export function MysteryOfTheWeek() {
  const currentMystery = {
    title: "O Caso do Espelho Quebrado",
    description: "Vários relatos de pessoas que viram seu reflexo se mover independentemente em espelhos antigos...",
    clues: [
      { text: "Todos os incidentes ocorreram durante a lua cheia", icon: <FaMoon /> },
      { text: "Os espelhos eram todos fabricados antes de 1920", icon: <GiGlassHeart /> }, // Ícone substituto
      { text: "Testemunhas relatam sentir um frio intenso", icon: <FaSnowflake /> }
    ],
    status: "Investigação em andamento",
    dangerLevel: "Alto"
  };

  return (
    <motion.section 
      className="mystery-week-section"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true, margin: "-50px" }}
    >
      <div className="section-header">
        <GiAncientSword className="section-icon" />
        <h2>Mistério da Semana</h2>
        <div className="divider"></div>
      </div>
      
      <div className="mystery-container">
        <motion.div 
          className="mystery-header"
          whileHover={{ scale: 1.02 }}
        >
          <FaEye className="title-icon" />
          <h3>{currentMystery.title}</h3>
          <div className={`danger-badge ${currentMystery.dangerLevel.toLowerCase()}`}>
            {currentMystery.dangerLevel}
          </div>
        </motion.div>
        
        <p className="mystery-description">{currentMystery.description}</p>
        
        <div className="mystery-clues">
          <h4>
            <FaCalendarAlt className="clue-icon" />
            PISTAS RECOLHIDAS:
          </h4>
          <ul>
            {currentMystery.clues.map((clue, index) => (
              <motion.li 
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <span className="clue-icon">{clue.icon}</span>
                {clue.text}
              </motion.li>
            ))}
          </ul>
        </div>
        
        <div className="mystery-progress">
          <div className="progress-bar">
            <motion.div 
              className="progress-fill"
              initial={{ width: 0 }}
              whileInView={{ width: '65%' }}
              transition={{ duration: 1.5, delay: 0.3 }}
              viewport={{ once: true }}
            />
          </div>
          <div className="mystery-status">
            STATUS: <span>{currentMystery.status}</span>
          </div>
        </div>
        
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link to="/mysteries" className="cta-button">
            EXPLORAR MAIS MISTÉRIOS
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
}