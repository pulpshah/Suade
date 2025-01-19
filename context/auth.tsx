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
    const inAuthGroup = segments[0] === "(auth)";
    const inOnboarding = segments[1] === "onBoarding";
    const inPersonaLab = segments[1] === "personaLab"; // Check for personaLab
    const inTabs = segments[0] === "(tabs)";

    console.log("Segments:", segments);
    console.log("User:", user);

    if (!user && !inAuthGroup) {
      console.log("Redirecting to /landing");
      router.replace("/landing");
    } else if (user && inAuthGroup && !inPersonaLab && !inOnboarding) {
      // Redirect to onboarding unless already in personaLab or onboarding
      console.log("Redirecting to /onBoarding");
      router.replace("/onBoarding");
    } else if (user && inPersonaLab) {
      console.log("User is in PersonaLab. No redirection.");
    }
  }, [user, segments]);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  useProtectedRoute(user);

  const signIn = (email: string, password: string) => {
    setUser({ email }); // Mock login
    router.replace('/onBoarding'); // After login, go to onboarding
  };

  const signUp = (email: string, password: string) => {
    setUser({ email }); // Mock signup
    router.replace('/onBoarding'); // After signup, go to onboarding
  };

  const signOut = () => {
    setUser(null);
    router.replace('/landing'); // Redirect to landing screen after logout
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



// import { createContext, useContext, useState, useEffect } from 'react';
// import { router } from 'expo-router';
// import { useSegments } from 'expo-router';

// type AuthContextType = {
//   signIn: (email: string, password: string) => void;
//   signUp: (email: string, password: string) => void;
//   signOut: () => void;
//   isLoading: boolean;
// };

// const AuthContext = createContext<AuthContextType | null>(null);

// function useProtectedRoute(user: any) {
//   const segments = useSegments();

//   useEffect(() => {
//     const inAuthGroup = segments[0] === '(auth)';

//     if (!user && !inAuthGroup) {
//       router.replace('/onBoarding'); // Correct path for login
//     } else if (user && inAuthGroup) {
//       router.replace('/(tutorial)/intro'); // Correct path to tutorial
//     }
//   }, [user, segments]);
// }

// export function AuthProvider({ children }: { children: React.ReactNode }) {
//   const [user, setUser] = useState<any>(null);
//   const [isLoading, setIsLoading] = useState(false);

//   useProtectedRoute(user);

//   const signIn = (email: string, password: string) => {
//     setUser({ email });
//     router.replace('/(tutorial)/intro'); // Correct path to tutorial
//   };

//   const signUp = (email: string, password: string) => {
//     setUser({ email });
//     router.replace('/(tutorial)/intro'); // Correct path to tutorial
//   };

//   const signOut = () => {
//     setUser(null);
//     router.replace('/login'); // Correct path to login
//   };

//   return (
//     <AuthContext.Provider value={{ signIn, signUp, signOut, isLoading }}>
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
