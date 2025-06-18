
import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function StepThree({ onBack, onSubmit, formData }: any) {
  const [address, setAddress] = useState('');
  const [pincode, setPincode] = useState('');
  const [spouse, setSpouse] = useState('');

  const handleSubmit = () => {
    onSubmit({ ...formData, address, pincode, spouse });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Address <Text style={{ color: 'green' }}>Details</Text></Text>
      <Text style={styles.subtitle}>Complete the final step of the form</Text>

      <TextInput
        style={styles.input}
        placeholder="Spouse Name"
        value={spouse}
        onChangeText={setSpouse}
      />
      <TextInput
        style={styles.input}
        placeholder="Address"
        value={address}
        onChangeText={setAddress}
      />
      <TextInput
        style={styles.input}
        placeholder="Pincode"
        value={pincode}
        onChangeText={setPincode}
        keyboardType="numeric"
      />

      {/* Footer navigation buttons */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.circleButton} onPress={onBack}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.circleButton} onPress={handleSubmit}>
          <Ionicons name="checkmark-done" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, paddingBottom: 80 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 4 },
  subtitle: { fontSize: 14, color: '#666', marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
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
