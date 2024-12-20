// // context/auth.tsx
// import { createContext, useContext, useState, useEffect } from 'react';
// import { router, useSegments, useRootNavigationState } from 'expo-router';

// type AuthContextType = {
//   signIn: (email: string, password: string) => Promise<void>;
//   signUp: (email: string, password: string) => Promise<void>;
//   signOut: () => void;
//   isLoading: boolean;
//   user: any | null;
// };

// const AuthContext = createContext<AuthContextType | null>(null);

// // This hook will protect the route access based on user authentication
// function useProtectedRoute(user: any) {
//   const segments = useSegments();
//   const navigationState = useRootNavigationState();

//   useEffect(() => {
//     if (!navigationState?.key) return;

//     const inAuthGroup = segments[0] === '(auth)';

//     if (!user && !inAuthGroup) {
//       // If the user is not signed in and the initial segment is not in the auth group,
//       // redirect to the sign-in page.
//       router.replace('/login');
//     } else if (user && inAuthGroup) {
//       // If the user is signed in and the initial segment is in the auth group,
//       // redirect away from the sign-in page.
//       router.replace('/(tabs)');
//     }
//   }, [user, segments, navigationState?.key]);
// }

// export function AuthProvider({ children }: { children: React.ReactNode }) {
//   const [user, setUser] = useState<any>(null);
//   const [isLoading, setIsLoading] = useState(true);

//   useProtectedRoute(user);

//   const signIn = async (email: string, password: string) => {
//     router.replace('/(tabs)');
//   };

//   const signUp = async (email: string, password: string) => {
//     router.replace('/(tabs)');
//   };

//   const signOut = () => {
//     setUser(null);
//     router.replace('/login');
//   };

//   return (
//     <AuthContext.Provider value={{ signIn, signUp, signOut, isLoading, user }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };
import { createContext, useContext, useState } from 'react';
import { router } from 'expo-router';

type AuthContextType = {
  signIn: (email: string, password: string) => void;
  signUp: (email: string, password: string) => void;
  signOut: () => void;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);

  const signIn = (email: string, password: string) => {
    router.replace('/(tabs)');
  };

  const signUp = (email: string, password: string) => {
    router.replace('/(tabs)');
  };

  const signOut = () => {
    router.replace('/login');
  };

  return (
    <AuthContext.Provider value={{ signIn, signUp, signOut, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};