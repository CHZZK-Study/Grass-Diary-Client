import { useState, useEffect } from 'react';
import { checkAuth } from '../utils/authUtils';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loggedIn = async () => {
      try {
        const isLoggedIn = await checkAuth();
        setIsAuthenticated(isLoggedIn);
        setIsLoading(false);
      } catch (error) {
        console.error(`로그인되지 않은 사용자입니다. ${error}`);
      }
    };

    loggedIn();
  }, []);

  return { isAuthenticated, isLoading };
};
