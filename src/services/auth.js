// /src/services/auth.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

// Configuração do Firebase - substitua pelos seus dados reais
const firebaseConfig = {
  apiKey: "SUA_API_KEY_AQUI",
  authDomain: "SEU_PROJETO.firebaseapp.com",
  projectId: "SEU_PROJETO",
  storageBucket: "SEU_PROJETO.appspot.com",
  messagingSenderId: "SEU_SENDER_ID",
  appId: "SEU_APP_ID"
};

// Inicialize o Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();

// Configurações adicionais do provedor Google (opcional)
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

// Função de login com Google
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return {
      user: result.user,
      token: await result.user.getIdToken()
    };
  } catch (error) {
    console.error("Erro no login com Google:", error);
    throw error;
  }
};

// Função de logout
export const signOutUser = async () => {
  try {
    await auth.signOut();
  } catch (error) {
    console.error("Erro ao fazer logout:", error);
    throw error;
  }
};

// Observador de estado de autenticação
export const onAuthStateChanged = (callback) => {
  return auth.onAuthStateChanged(callback);
};