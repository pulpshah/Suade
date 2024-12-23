import { createContext, useContext, useState, useEffect } from 'react';
import { router } from 'expo-router';
import { useSegments } from 'expo-router';
type AuthContextType = {
  signIn: (email: string, password: string) => void;
  signUp: (email: string, password: string) => void;
  signOut: () => void;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);
function useProtectedRoute(user: any) {
  const segments = useSegments();

  useEffect(() => {
    const inAuthGroup = segments[0] === '(auth)';

    if (!user && !inAuthGroup) {
      router.replace('/login'); 
    } else if (user && inAuthGroup) {
      router.replace('/(tabs)');
    }
  }, [user, segments]);
}


export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  useProtectedRoute(user);

  const signIn = (email: string, password: string) => {
    setUser({ email });
    router.replace('/(tabs)');
  };

  const signUp = (email: string, password: string) => {
    setUser({ email });
    router.replace('/(tabs)');
  };

  const signOut = () => {
    setUser(null);
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