
import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function StepThree({ onBack, onSubmit, formData }: any) {
  const [address, setAddress] = useState('');
  const [pincode, setPincode] = useState('');
  const [spouse, setSpouse] = useState('');

  const handleSubmit = () => {
    if (!address.trim() || !pincode.trim()) {
      Alert.alert('Validation Error', 'Address and Pincode are required.');
      return;
    }

    const updatedForm = {
      ...formData,
      address,
      pincode,
      spouse,
    };
    onSubmit(updatedForm);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>
        Address <Text style={{ color: 'green' }}>Details</Text>
      </Text>
      <Text style={styles.subtitle}>Complete the final step of the form</Text>

      <Text style={styles.label}>Spouse Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter spouse's name (optional)"
        value={spouse}
        onChangeText={setSpouse}
      />

      <Text style={styles.label}>Address *</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter address"
        value={address}
        onChangeText={setAddress}
      />

      <Text style={styles.label}>Pincode *</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter pincode"
        value={pincode}
        onChangeText={setPincode}
        keyboardType="numeric"
        maxLength={6}
      />

      <View style={styles.footer}>
        <TouchableOpacity style={styles.circleButton} onPress={onBack}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.circleButton} onPress={handleSubmit}>
          <Ionicons name="checkmark-done" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 80,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  label: {
    fontWeight: '500',
    marginBottom: 6,
    color: 'green',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    height: 50,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  circleButton: {
    backgroundColor: 'black',
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
