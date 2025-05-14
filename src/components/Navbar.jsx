import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  GiSpellBook,
  GiStonePath,
  GiSwordman,
  GiSkullCrossedBones,
  GiSecretDoor,
  GiScrollQuill,
  GiPentagramRose,
  GiMagnifyingGlass
} from 'react-icons/gi';
import { FaSignInAlt } from 'react-icons/fa';
import './Navbar.css';

export function Navbar() {
  const navigate = useNavigate();
  const [hoveredItem, setHoveredItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [isLoginHovered, setIsLoginHovered] = useState(false);

  // Order Paranormal color palette
  const colors = {
    dark: '#0f0a1a',
    darker: '#070510',
    accent: '#8a2be2', // Purple
    accentLight: '#b57edc',
    text: '#e2d9f9',
    textDim: '#b8a9e6',
    danger: '#d62828',
    warning: '#f77f00'
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setShowSearch(false);
    }
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const iconVariants = {
    rest: { 
      color: colors.textDim,
      scale: 1,
      y: 0,
      filter: 'drop-shadow(0 0 0px transparent)'
    },
    hover: {
      color: colors.accent,
      scale: 1.3,
      y: -5,
      filter: 'drop-shadow(0 0 8px var(--color-accent))',
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  const navLinks = [
    { to: "/", icon: <GiPentagramRose />, text: "Início", name: "home" },
    { to: "/dashboard", icon: <GiSpellBook />, text: "Grimório", name: "grimoire" },
    { to: "/character-creator", icon: <GiSwordman />, text: "Personagens", name: "characters" },
    { to: "/campaign", icon: <GiStonePath />, text: "Campanha", name: "campaing" },
    { to: "/battle", icon: <GiSkullCrossedBones />, text: "Rituais", name: "rituals" }
  ];

  return (
    <motion.nav 
      className="navbar"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, type: "spring" }}
      style={{ backgroundColor: colors.darker }}
    >
      {/* Logo */}
      <motion.div 
        className="logo-container"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate('/')}
      >
        <GiSecretDoor className="logo-icon" />
        <motion.span 
          className="logo-text"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Eco Da Realidade
        </motion.span>
      </motion.div>

      {/* Navigation Links */}
      <div className="nav-links">
        {navLinks.map((link, index) => (
          <motion.div
            key={link.to}
            className="nav-item"
            onHoverStart={() => setHoveredItem(index)}
            onHoverEnd={() => setHoveredItem(null)}
            whileHover={{ scale: 1.05 }}
          >
            <NavLink 
              to={link.to} 
              className={({ isActive }) => 
                isActive ? 'nav-link active' : 'nav-link'
              }
            >
              <motion.span
                className="nav-icon"
                variants={iconVariants}
                animate={hoveredItem === index ? "hover" : "rest"}
                whileTap={{ scale: 0.9 }}
              >
                {link.icon}
              </motion.span>
              <motion.span 
                className="nav-text"
                animate={{
                  color: hoveredItem === index ? colors.text : colors.textDim,
                  x: hoveredItem === index ? 3 : 0
                }}
              >
                {link.text}
              </motion.span>
              <AnimatePresence>
                {({ isActive }) => isActive && (
                  <motion.div 
                    className="active-indicator"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    exit={{ scaleX: 0 }}
                  />
                )}
              </AnimatePresence>
            </NavLink>
          </motion.div>
        ))}
      </div>

      {/* Search and Login */}
      <div className="nav-actions">
        <AnimatePresence>
          {showSearch && (
            <motion.form
              className="search-form"
              onSubmit={handleSearch}
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 200 }}
              exit={{ opacity: 0, width: 0 }}
            >
              <input
                type="text"
                placeholder="Pesquisar conhecimento..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
              <button type="submit">
                <GiMagnifyingGlass />
              </button>
            </motion.form>
          )}
        </AnimatePresence>

        <motion.button 
          className="search-button"
          onClick={() => setShowSearch(!showSearch)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <GiMagnifyingGlass />
        </motion.button>
        
        <motion.div
          className="login-container"
          onHoverStart={() => setIsLoginHovered(true)}
          onHoverEnd={() => setIsLoginHovered(false)}
        >
          <motion.button
            className="login-button"
            onClick={handleLogin}
            initial={{ 
              backgroundColor: 'transparent',
              borderColor: colors.accent
            }}
            animate={{ 
              backgroundColor: isLoginHovered ? colors.accent : 'transparent',
              boxShadow: isLoginHovered ? `0 0 15px ${colors.accent}80` : 'none'
            }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.span
              animate={{
                x: isLoginHovered ? [0, 5, -3, 0] : 0
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatDelay: 1
              }}
            >
              <GiScrollQuill />
            </motion.span>
            <span>Entrar na Ordem</span>
          </motion.button>
        </motion.div>
      </div>
    </motion.nav>
  );
}