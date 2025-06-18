import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ScrollView,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons'; // <-- Make sure this is installed

export default function StepOne({ onNext, onBack }: any) {
  const [name, setName] = useState('');
  const [Department, setDepartment] = useState('');
  const [Designation, setDesignation] = useState('');
  const [Employee, setEmployee] = useState('');
  const [avatar, setAvatar] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Please allow access to photo library');
      }
    })();
  }, []);

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        allowsEditing: true,
      });

      if (!result.canceled) {
        setAvatar(result.assets[0].uri);
      }
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'Failed to pick image');
    }
  };

  const form = { name, Department, Designation, Employee, avatar };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Employee <Text style={{ color: 'green' }}>Details</Text></Text>
      <Text style={styles.subtitle}>Fill out the Employee Details below</Text>

      <TextInput
        style={styles.input}
        placeholder="Name *"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Department"
        value={Department}
        onChangeText={setDepartment}
      />
      <TextInput
        style={styles.input}
        placeholder="Designation"
        value={Designation}
        onChangeText={setDesignation}
      />
      <TextInput
        style={styles.input}
        placeholder="Employee Type"
        value={Employee}
        onChangeText={setEmployee}
      />

      <TouchableOpacity onPress={pickImage} style={styles.imageButton}>
        <Text>Select Photo</Text>
      </TouchableOpacity>

      {avatar && (
        <Image
          source={{ uri: avatar }}
          style={styles.image}
        />
      )}

      <View style={styles.footer}>
        <TouchableOpacity style={styles.circleButton} onPress={onBack}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.circleButton}
          onPress={() => onNext(form)}
        >
          <Ionicons name="arrow-forward" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </ScrollView>
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
  imageButton: {
    backgroundColor: '#eee',
    padding: 10,
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginBottom: 10,
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
