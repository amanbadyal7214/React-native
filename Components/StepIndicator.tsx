import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default function StepIndicator({ step }: { step: number }) {
  return (
    <View style={styles.container}>
      <View style={styles.white}>
        <View style={[styles.circle, step >= 1 && styles.activeCircle]}>
          {step > 1 ? (
            <FontAwesome name="check" size={16} color="white" />
          ) : (
            <Text style={styles.stepText}></Text>
          )}
        </View>
        <Text style={[styles.label, step >= 1 && styles.activeLabel]}>Employee</Text>
      </View>

      <View style={[styles.line, step >= 2 && styles.activeLine]} />

      
      <View style={styles.white}>
        <View style={[styles.circle, step >= 2 && styles.activeCircle]}>
          {step > 2 ? (
            <FontAwesome name="check" size={16} color="white" />
          ) : (
            <Text style={styles.stepText}></Text>
          )}
        </View>
        <Text style={[styles.label, step >= 2 && styles.activeLabel]}>General</Text>
      </View>

      <View style={[styles.line, step >= 3 && styles.activeLine]} />

      <View style={styles.white}>
        <View style={[styles.circle, step === 3 && styles.activeCircle]}>
          <Text style={styles.stepText}></Text>
        </View>
        <Text style={[styles.label, step === 3 && styles.activeLabel]}>Address</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:"center",
  },
  white:{
    alignItems: 'center',
    justifyContent:"center",
  },
  circle: {
    backgroundColor: '#ccc',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeCircle: {
    backgroundColor: '#4CAF50',
  },
  stepText: {
    color: 'white',
    fontWeight: 'bold',
  },
  label: {
    marginTop: 5,
    fontSize: 12,
    color: '#999',
  },
  activeLabel: {
    color: '#4CAF50',
    fontWeight: '600',
  },
  line: {
    width: 140,
    height: 2,
    backgroundColor: '#ccc',
    marginBottom:15,
  },
  activeLine: {
    backgroundColor: '#4CAF50',
  },
});