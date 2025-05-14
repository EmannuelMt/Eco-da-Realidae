import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaSkull, 
  FaGhost, 
  FaTimes,
  FaMapMarkerAlt,
  FaHome,
  FaTree,
  FaMountain
} from 'react-icons/fa';
import { GiGraveyard, GiSpookyHouse, GiWoodCabin } from 'react-icons/gi';
import './InteractiveMap.css';


export function InteractiveMap() {
  const locations = [
    { 
      id: 1, 
      name: "Mansão Derleth", 
      coordinates: [40.7128, -74.0060], 
      description: "Local de vários desaparecimentos inexplicáveis. Os relatos incluem vozes sussurrantes, portas que se fecham sozinhas e aparições de figuras sombrias nos corredores.",
      dangerLevel: "Alto",
      icon: <GiSpookyHouse className="location-icon haunted" />
    },
    { 
      id: 2, 
      name: "Cemitério Oakwood", 
      coordinates: [34.0522, -118.2437], 
      description: "Avistamentos frequentes da Senhora de Branco. Visitantes relatam cantos de ninar perturbadores e uma figura feminina que desaparece quando abordada.",
      dangerLevel: "Médio",
      icon: <GiGraveyard className="location-icon graveyard" />
    },
    { 
      id: 3, 
      name: "Floresta Blackwood", 
      coordinates: [45.5231, -122.6765], 
      description: "Área conhecida por desaparecimentos misteriosos. Os poucos que retornam falam de 'árvores que se movem' e uma névoa que parece seguir as pessoas.",
      dangerLevel: "Crítico",
      icon: <FaTree className="location-icon forest" />
    },
    { 
      id: 4, 
      name: "Cabana do Lenhador", 
      coordinates: [47.6062, -122.3321], 
      description: "Antiga cabana abandonada onde ocorreram rituais sombrios. Moradores relatam luzes estranhas e gritos à noite.",
      dangerLevel: "Alto",
      icon: <GiWoodCabin className="location-icon cabin" />
    }
  ];

  const [selectedLocation, setSelectedLocation] = useState(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMapLoaded(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="map-container">
      <div className="map-visual">
        <div className={`map-background ${mapLoaded ? 'loaded' : ''}`}>
          <div className="map-grid" />
          <div className="map-fog-effect" />
          
          {locations.map(loc => (
            <motion.button
              key={loc.id}
              className={`map-marker ${selectedLocation?.id === loc.id ? 'active' : ''}`}
              style={{
                left: `${((loc.coordinates[0] + 180) % 360) / 3.6}%`,
                top: `${((loc.coordinates[1] + 90) % 180) / 1.8}%`
              }}
              onClick={() => setSelectedLocation(loc)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: loc.id * 0.2 }}
            >
              <FaMapMarkerAlt className="marker-icon" />
              <span className="pulse-effect" />
            </motion.button>
          ))}
        </div>
      </div>
      
      <AnimatePresence>
        {selectedLocation && (
          <motion.div
            className="map-details"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="details-header">
              <div className="icon-container">
                {selectedLocation.icon}
              </div>
              <h3>{selectedLocation.name}</h3>
              <motion.button 
                onClick={() => setSelectedLocation(null)}
                className="close-button"
                whileHover={{ rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaTimes />
              </motion.button>
            </div>
            
            <div className={`danger-level ${selectedLocation.dangerLevel.toLowerCase()}`}>
              Nível de Perigo: {selectedLocation.dangerLevel}
            </div>
            
            <p>{selectedLocation.description}</p>
            
            <div className="location-coordinates">
              <span>Coordenadas:</span>
              <div className="coordinates-value">
                {selectedLocation.coordinates[0].toFixed(4)}, {selectedLocation.coordinates[1].toFixed(4)}
              </div>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="investigate-button"
            >
              INVESTIGAR LOCAL
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}