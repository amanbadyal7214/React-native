import React, { useState, useEffect, useRef } from 'react';
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
import { Ionicons } from '@expo/vector-icons';

export default function StepOne({ onNext, onBack, initialData = {} }: any) {
  const isInitialized = useRef(false); // prevents re-initialization

  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');
  const [designation, setDesignation] = useState('');
  const [employeeType, setEmployeeType] = useState('');
  const [avatar, setAvatar] = useState<string | null>(null);

  useEffect(() => {
    // Only initialize once
    if (!isInitialized.current && initialData) {
      setName(initialData.name || '');
      setDepartment(initialData.department || '');
      setDesignation(initialData.designation || '');
      setEmployeeType(initialData.employeeType || '');
      setAvatar(initialData.avatar || null);
      isInitialized.current = true;
    }
  }, [initialData]);

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Please allow access to the photo library');
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

  const handleNext = () => {
    if (!name.trim()) {
      Alert.alert('Validation Error', 'Name is required');
      return;
    }

    const form = { name, department, designation, employeeType, avatar };
    onNext(form);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>
        Employee <Text style={{ color: 'green' }}>Details</Text>
      </Text>
      <Text style={styles.subtitle}>Fill out the Employee Details below</Text>

      <Text style={styles.label}>Name *</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter full name"
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>Department</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter department"
        value={department}
        onChangeText={setDepartment}
      />

      <Text style={styles.label}>Designation</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter designation"
        value={designation}
        onChangeText={setDesignation}
      />

      <Text style={styles.label}>Employee Type</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter type (e.g. Full-Time)"
        value={employeeType}
        onChangeText={setEmployeeType}
      />

      <Text style={styles.label}>Upload Profile Picture</Text>
      <TouchableOpacity onPress={pickImage} style={styles.imageButton}>
        <Text>Select Photo</Text>
      </TouchableOpacity>

      {avatar && <Image source={{ uri: avatar }} style={styles.image} />}

      <View style={styles.footer}>
        <TouchableOpacity style={styles.circleButton} onPress={onBack}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.circleButton} onPress={handleNext}>
          <Ionicons name="arrow-forward" size={24} color="#fff" />
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
    marginBottom: 6,
    fontWeight: '500',
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
  imageButton: {
    backgroundColor: '#eee',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginBottom: 20,
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
