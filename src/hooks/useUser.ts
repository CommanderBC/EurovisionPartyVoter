import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NAME_KEY = 'eurovision_username';
const ID_KEY = 'eurovision_userid';

function generateUserId(): string {
  return `u_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;
}

interface UserContextValue {
  userId: string | null;
  username: string | null;
  isLoading: boolean;
  isEditing: boolean;
  setUsername: (name: string) => Promise<void>;
  startEditing: () => void;
  cancelEditing: () => void;
}

const UserContext = createContext<UserContextValue | null>(null);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [userId, setUserId] = useState<string | null>(null);
  const [username, setUsernameState] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    (async () => {
      const [storedName, storedId] = await Promise.all([
        AsyncStorage.getItem(NAME_KEY),
        AsyncStorage.getItem(ID_KEY),
      ]);
      let id = storedId;
      if (!id) {
        id = generateUserId();
        await AsyncStorage.setItem(ID_KEY, id);
      }
      setUserId(id);
      setUsernameState(storedName);
      setIsLoading(false);
    })();
  }, []);

  async function setUsername(name: string) {
    const trimmed = name.trim().slice(0, 20);
    await AsyncStorage.setItem(NAME_KEY, trimmed);
    setUsernameState(trimmed);
    setIsEditing(false);
  }

  const value: UserContextValue = {
    userId,
    username,
    isLoading,
    isEditing,
    setUsername,
    startEditing: () => setIsEditing(true),
    cancelEditing: () => setIsEditing(false),
  };

  return React.createElement(UserContext.Provider, { value }, children);
}

export function useUser(): UserContextValue {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error('useUser must be used inside UserProvider');
  return ctx;
}
