import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'eurovision_username';

export function useUser() {
  const [username, setUsernameState] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((value) => {
      setUsernameState(value);
      setIsLoading(false);
    });
  }, []);

  async function setUsername(name: string) {
    const trimmed = name.trim().slice(0, 20);
    await AsyncStorage.setItem(STORAGE_KEY, trimmed);
    setUsernameState(trimmed);
  }

  return { username, setUsername, isLoading };
}
