// UserContext.jsx

import { createContext, useContext, useEffect, useState } from 'react';
import supabase from '../Services/Supabase'; // Adjust the path based on your project structure

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data: session, error } = await supabase.auth.getSession();
        if (error) {
          throw error;
        }
        setUser(session ? session.user : null);
      } catch (error) {
        console.error('Error fetching session:', error.message);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session ? session.user : null);
    });

    return () => {
      authListener?.unsubscribe();
    };
  }, []);

  return (
    <UserContext.Provider value={{ user, loading, error }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
