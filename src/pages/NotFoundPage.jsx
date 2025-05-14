// src/pages/NotFoundPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaExclamationTriangle, FaHome } from 'react-icons/fa';
import './NotFoundPage.css'; // Create this file for styling

const NotFoundPage = () => {
  return (
    <motion.div
      className="not-found-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="not-found-content">
        <motion.div
          className="warning-icon"
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 10, -10, 0]
          }}
          transition={{ 
            duration: 1.5,
            repeat: Infinity,
            repeatType: "mirror"
          }}
        >
          <FaExclamationTriangle size={80} />
        </motion.div>
        <h1>404 - Página Não Encontrada</h1>
        <p>A página que você está procurando não existe ou foi movida.</p>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link to="/" className="home-link">
            <FaHome /> Voltar para a página inicial
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default NotFoundPage; // Add this default export