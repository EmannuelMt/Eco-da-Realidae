import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { 
  FaGoogle, 
  FaUser, 
  FaLock, 
  FaEnvelope, 
  FaSignInAlt,
  FaUserPlus,
  FaEye,
  FaEyeSlash,
  FaMagic,
  FaTimes,
  FaCheck,
  FaArrowRight
} from 'react-icons/fa';
import { SiAuth0 } from 'react-icons/si';
import { Logo } from '../components/Logo';
import './AuthPage.css';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [authStage, setAuthStage] = useState('initial');
  const [errorMessage, setErrorMessage] = useState('');
  const controls = useAnimation();
  const formControls = useAnimation();

  const authenticate = async () => {
    const shouldFail = Math.random() < 0.3;
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        shouldFail 
          ? reject(new Error(isLogin ? 'Credenciais inválidas' : 'Email já cadastrado')) 
          : resolve();
      }, 2000);
    });
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setAuthStage('processing');
    await controls.start("processing");
    
    try {
      await authenticate();
      await controls.start("success");
      setTimeout(() => {}, 1500);
    } catch (error) {
      setErrorMessage(error.message);
      await controls.start("error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setAuthStage('processing');
    await controls.start("processing");
    
    try {
      await authenticate();
      await controls.start("success");
      setTimeout(() => {}, 1500);
    } catch (error) {
      setErrorMessage(error.message);
      await controls.start("error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const resetAuthState = async () => {
    setAuthStage('initial');
    await controls.start("initial");
    setErrorMessage('');
  };

  const toggleAuthMode = async () => {
    await formControls.start("exit");
    setIsLogin(!isLogin);
    resetAuthState();
    formControls.start("enter");
  };

  useEffect(() => {
    if (authStage === 'success' || authStage === 'error') {
      const timer = setTimeout(() => resetAuthState(), 3000);
      return () => clearTimeout(timer);
    }
  }, [authStage]);

  return (
    <motion.div 
      className="auth-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <motion.div 
        className="auth-bg-element orb-1"
        initial={{ x: -100, y: -50, opacity: 0 }}
        animate={{ x: 0, y: 0, opacity: 0.15 }}
        transition={{ delay: 0.5, duration: 1.5, ease: "backOut" }}
      />
      <motion.div 
        className="auth-bg-element orb-2"
        initial={{ x: 100, y: 100, opacity: 0 }}
        animate={{ x: 0, y: 0, opacity: 0.1 }}
        transition={{ delay: 0.7, duration: 1.5, ease: "backOut" }}
      />

      <motion.div
        className="logo-container"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8, ease: "circOut" }}
      >
        <Logo />
        <motion.p 
          className="app-tagline"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 0.8, duration: 1 }}
        >
          O portal para o desconhecido
        </motion.p>
      </motion.div>

      <motion.div 
        className="auth-form-wrapper"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.7, ease: "backOut" }}
      >
        <motion.div 
          className="auth-form"
          animate={controls}
          variants={{
            initial: { 
              boxShadow: "0 15px 35px rgba(0, 0, 0, 0.5)",
              borderColor: "rgba(111, 66, 193, 0.3)"
            },
            processing: { 
              boxShadow: "0 15px 35px rgba(111, 66, 193, 0.5)",
              borderColor: "rgba(111, 66, 193, 0.8)"
            },
            success: { 
              boxShadow: "0 15px 35px rgba(46, 204, 113, 0.5)",
              borderColor: "rgba(46, 204, 113, 0.8)"
            },
            error: {
              boxShadow: "0 15px 35px rgba(220, 20, 60, 0.5)",
              borderColor: "rgba(220, 20, 60, 0.8)"
            }
          }}
        >
          <AnimatePresence mode="wait">
            {authStage === 'initial' ? (
              <motion.div
                key="form"
                initial="enter"
                animate="enter"
                exit="exit"
                variants={{
                  enter: { opacity: 1, y: 0 },
                  exit: { opacity: 0, y: -20 }
                }}
                transition={{ duration: 0.4 }}
              >
                {/* ... (rest of your form JSX remains exactly the same) ... */}
              </motion.div>
            ) : authStage === 'processing' ? (
              <motion.div
                key="processing"
                className="auth-animation-container"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                {/* ... (processing animation JSX) ... */}
              </motion.div>
            ) : authStage === 'success' ? (
              <motion.div
                key="success"
                className="auth-animation-container"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                {/* ... (success animation JSX) ... */}
              </motion.div>
            ) : (
              <motion.div
                key="error"
                className="auth-animation-container"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                {/* ... (error animation JSX) ... */}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default AuthPage;