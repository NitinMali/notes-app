import { useState, useEffect } from 'react';

const useSessionUsername = () => {
  const [username, setUsername] = useState<string | null>(() => {
    return sessionStorage.getItem('username');
  });

  useEffect(() => {
    if (username !== null) {
      sessionStorage.setItem('username', username);
    } else {
      sessionStorage.removeItem('username');
    }
  }, [username]);

  return [username, setUsername] as const;
};

export default useSessionUsername;
