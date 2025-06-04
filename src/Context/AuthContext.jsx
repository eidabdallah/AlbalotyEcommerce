import { createContext, useContext } from "react";

const AuthContext = createContext({ isGuest: true });

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children, isGuest }) => {
  return (
    <AuthContext.Provider value={{ isGuest }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
