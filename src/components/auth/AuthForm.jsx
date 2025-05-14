// /components/auth/AuthForm.jsx
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signInWithGoogle } from '../../services/auth';
import { initAuthListener } from '../../store/slices/authSlice';
import './AuthForm.css';

export const AuthForm = () => {
  const dispatch = useDispatch();
  const { user, isLoading } = useSelector(state => state.auth);

  useEffect(() => {
    dispatch(initAuthListener());
  }, [dispatch]);

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="auth-container">
      <h2>Eco da Realidade</h2>
      {user ? (
        <div className="user-info">
          <img src={user.photoURL} alt="User" className="user-avatar" />
          <p>Bem-vindo, {user.displayName}</p>
        </div>
      ) : (
        <div className="auth-form">
          <button 
            className="auth-button google"
            onClick={handleGoogleLogin}
          >
            Entrar com Google
          </button>
        </div>
      )}
    </div>
  );
};