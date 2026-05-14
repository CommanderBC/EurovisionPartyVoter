import React, { useState } from 'react';
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
import { useUser } from '../hooks/useUser';

export default function RootLayout() {
  const { username, setUsername, isLoading } = useUser();
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');

  if (isLoading) {
    return (
      <View style={styles.loading}>
        <Text style={styles.loadingText}>🎤</Text>
      </View>
    );
  }

  function handleSave() {
    const trimmed = inputValue.trim();
    if (!trimmed) {
      setError('Ange ett namn');
      return;
    }
    setUsername(trimmed);
  }

  return (
    <>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: '#1a0a2e' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: '700' },
          contentStyle: { backgroundColor: '#0d0620' },
        }}
      />
      <Modal visible={!username} transparent animationType="fade">
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.modalBg}
        >
          <View style={styles.modal}>
            <Text style={styles.modalEmoji}>🎶</Text>
            <Text style={styles.modalTitle}>Eurovision 2026</Text>
            <Text style={styles.modalSubtitle}>Vad heter du?</Text>
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
              <Text style={styles.saveBtnText}>Börja betygsätta →</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </>
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
});
