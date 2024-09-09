// // src/context/AuthContext.tsx

// import React, {
//   createContext,
//   useState,
//   useContext,
//   ReactNode,
//   useEffect,
// } from 'react';

// interface AuthContextType {
//   authData: AuthData | null;
//   login: (data: AuthData) => void;
//   logout: () => void;
// }

// interface AuthData {
//   user: {
//     id: string;
//     name: string;
//     email: string;
//   };
//   token: string;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider = ({ children }: { children: ReactNode }) => {
//   const [authData, setAuthData] = useState<AuthData | null>(null);

//   useEffect(() => {
//     const savedAuthData = localStorage.getItem('authData');
//     if (savedAuthData) {
//       setAuthData(JSON.parse(savedAuthData));
//     }
//   }, []);

//   const login = (data: AuthData) => {
//     setAuthData(data);
//     localStorage.setItem('authData', JSON.stringify(data));
//   };

//   const logout = () => {
//     setAuthData(null);
//     localStorage.removeItem('authData');
//   };

//   return (
//     <AuthContext.Provider value={{ authData, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = (): AuthContextType => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };
