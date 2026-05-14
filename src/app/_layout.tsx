import React, { useEffect, useState } from 'react';
import { Stack } from 'expo-router';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Modal,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { UserProvider, useUser } from '../hooks/useUser';

function NameModal() {
  const { username, isEditing, isLoading, setUsername, cancelEditing } = useUser();
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');

  const visible = !isLoading && (!username || isEditing);
  const isFirstTime = !username;

  useEffect(() => {
    if (visible) {
      setInputValue(username ?? '');
      setError('');
    }
  }, [visible, username]);

  async function handleSave() {
    const trimmed = inputValue.trim();
    if (!trimmed) {
      setError('Ange ett namn');
      return;
    }
    await setUsername(trimmed);
  }

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={cancelEditing}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.modalBg}
      >
        <View style={styles.modal}>
          <Text style={styles.modalEmoji}>🎶</Text>
          <Text style={styles.modalTitle}>Eurovision 2026</Text>
          <Text style={styles.modalSubtitle}>
            {isFirstTime ? 'Vad heter du?' : 'Byt namn'}
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Ange ditt smeknamn"
            placeholderTextColor="#555"
            value={inputValue}
            onChangeText={(t) => {
              setInputValue(t);
              setError('');
            }}
            maxLength={20}
            returnKeyType="done"
            onSubmitEditing={handleSave}
            autoFocus
          />
          {error ? <Text style={styles.error}>{error}</Text> : null}
          <TouchableOpacity style={styles.saveBtn} onPress={handleSave} activeOpacity={0.8}>
            <Text style={styles.saveBtnText}>
              {isFirstTime ? 'Börja betygsätta →' : 'Spara'}
            </Text>
          </TouchableOpacity>
          {!isFirstTime && (
            <TouchableOpacity style={styles.cancelBtn} onPress={cancelEditing} activeOpacity={0.8}>
              <Text style={styles.cancelBtnText}>Avbryt</Text>
            </TouchableOpacity>
          )}
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

function LoadingGate({ children }: { children: React.ReactNode }) {
  const { isLoading } = useUser();
  if (isLoading) {
    return (
      <View style={styles.loading}>
        <Text style={styles.loadingText}>🎤</Text>
      </View>
    );
  }
  return <>{children}</>;
}

export default function RootLayout() {
  return (
    <UserProvider>
      <StatusBar style="light" />
      <LoadingGate>
        <Stack
          screenOptions={{
            headerStyle: { backgroundColor: '#1a0a2e' },
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: '700' },
            contentStyle: { backgroundColor: '#0d0620' },
          }}
        />
        <NameModal />
      </LoadingGate>
    </UserProvider>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    backgroundColor: '#0d0620',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    fontSize: 48,
  },
  modalBg: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.85)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  modal: {
    backgroundColor: '#1e0f3a',
    borderRadius: 20,
    padding: 28,
    width: '100%',
    maxWidth: 360,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#3a2a5e',
  },
  modalEmoji: {
    fontSize: 48,
    marginBottom: 8,
  },
  modalTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 4,
  },
  modalSubtitle: {
    color: '#aaa',
    fontSize: 15,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    backgroundColor: '#2a1a4e',
    borderRadius: 10,
    padding: 14,
    color: '#fff',
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#4a3a7e',
    marginBottom: 8,
  },
  error: {
    color: '#ff6b6b',
    fontSize: 13,
    marginBottom: 8,
  },
  saveBtn: {
    backgroundColor: '#e040fb',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 24,
    width: '100%',
    alignItems: 'center',
    marginTop: 8,
  },
  saveBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  cancelBtn: {
    paddingVertical: 10,
    marginTop: 4,
  },
  cancelBtnText: {
    color: '#888',
    fontSize: 14,
    fontWeight: '600',
  },
});
