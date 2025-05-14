import { motion } from 'framer-motion';
import { FaGithub, FaTwitter, FaInstagram, FaReddit } from 'react-icons/fa';
import { RiBookMarkedLine } from 'react-icons/ri';
import './Footer.css'; // Arquivo de estilos específico para o footer

export function Footer() {
  return (
    <motion.footer 
      className="site-footer"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="footer-content">
        {/* Seção de informações */}
        <div className="footer-section">
          <h4>
            <RiBookMarkedLine className="footer-icon" />
            CONHECIMENTO
          </h4>
          <p>Explore os mistérios do paranormal com responsabilidade. O conhecimento custa caro.</p>
        </div>

        {/* Seção de links rápidos */}
        <div className="footer-section">
          <h4>CAMINHOS</h4>
          <ul className="footer-links">
            <li><a href="/">Início</a></li>
            <li><a href="/about">O Enigma</a></li>
            <li><a href="/rituals">Rituais</a></li>
            <li><a href="/entities">Entidades</a></li>
            <li><a href="/contact">Contato</a></li>
          </ul>
        </div>

        {/* Seção de redes sociais */}
        <div className="footer-section">
          <h4>SIGA A ORDEM</h4>
          <div className="social-icons">
            <a href="https://github.com" aria-label="GitHub">
              <FaGithub className="social-icon" />
            </a>
            <a href="https://twitter.com" aria-label="Twitter">
              <FaTwitter className="social-icon" />
            </a>
            <a href="https://instagram.com" aria-label="Instagram">
              <FaInstagram className="social-icon" />
            </a>
            <a href="https://reddit.com" aria-label="Reddit">
              <FaReddit className="social-icon" />
            </a>
          </div>
        </div>
      </div>

      {/* Rodapé inferior */}
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Eco Da Realidade. Todos os direitos reservados.</p>
        <p className="footer-warning">AVISO: O conteúdo deste site é fictício e parte de um universo de RPG.</p>
      </div>
    </motion.footer>
  );
}