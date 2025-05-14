// PentagramIcon.jsx
import { motion } from 'framer-motion';

export const PentagramIcon = ({ className = '', animate = false }) => (
  <motion.svg 
    className={`pentagram ${className}`} 
    width="24" 
    height="24" 
    viewBox="0 0 24 24"
    aria-hidden="true"
    animate={animate ? {
      rotate: 360,
      scale: [1, 1.1, 1],
    } : {}}
    transition={animate ? {
      duration: 5,
      repeat: Infinity,
      ease: "linear"
    } : {}}
  >
    <path 
      d="M12 2L9 12L2 12L8 17L5 22L12 18L19 22L16 17L22 12L15 12L12 2Z" 
      fill="currentColor"
    />
  </motion.svg>
);