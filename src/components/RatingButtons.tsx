import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface Props {
  value: number | null;
  onChange: (score: number) => void;
}

export function RatingButtons({ value, onChange }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Mitt betyg</Text>
      <View style={styles.buttons}>
        {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
          <TouchableOpacity
            key={n}
            style={[styles.btn, value === n && styles.btnActive]}
            onPress={() => onChange(n)}
            activeOpacity={0.7}
          >
            <Text style={[styles.btnText, value === n && styles.btnTextActive]}>
              {n}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  label: {
    color: '#aaa',
    fontSize: 12,
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  buttons: {
    flexDirection: 'row',
    gap: 6,
    flexWrap: 'wrap',
  },
  btn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#2a1a4e',
    borderWidth: 1,
    borderColor: '#4a3a7e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnActive: {
    backgroundColor: '#e040fb',
    borderColor: '#e040fb',
  },
  btnText: {
    color: '#ccc',
    fontSize: 13,
    fontWeight: '600',
  },
  btnTextActive: {
    color: '#fff',
  },
});
