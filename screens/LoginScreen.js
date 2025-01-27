import AuthContent from "../components/Auth/AuthContent";
import { useContext, useState } from 'react';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { login } from '../util/auth';
import { Alert } from "react-native";
import { AuthContext } from "../store/auth-contenxt";
import jwt_decode from "jwt-decode";
function LoginScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const authCtx = useContext(AuthContext);

  async function loginHandler({ email, password }) {
    setIsAuthenticating(true);
    try {
      const token = await login(email, password);
      console.log("in login: ", token)
      var decoded = jwt_decode(token);
      var isAdmin = decoded["admin"]
      if(isAdmin!=undefined)
        authCtx.setAdmin();

      authCtx.authenticate(token);
    } catch (error) {
      Alert.alert(
        'Autenticazione fallita!',
        'Perfavore ricontrolla le credenziali e riprova!'
      );
      setIsAuthenticating(false);
    }
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Accesso ..." />;
  }

  return <AuthContent isLogin onAuthenticate={loginHandler} />;
}

export default LoginScreen;