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
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

export default function StepOne({ onNext, onBack, initialData = {} }: any) {
  const isInitialized = useRef(false);

  const [name, setName] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedDepartmentId, setSelectedDepartmentId] = useState('');
  const [selectedDesignation, setSelectedDesignation] = useState('');
  const [selectedDesignationId, setSelectedDesignationId] = useState('');
  const [selectedsenior, setselectedsenior] = useState("")
  const [selectedseniorid, setselectedseniorid] = useState("")
  const [employeeType, setEmployeeType] = useState('');
  const [avatar, setAvatar] = useState<string | null>(null);

  const [departments, setDepartments] = useState([]);
  const [designations, setDesignations] = useState([]);
  const [seniors, setseniors] = useState([])

  useEffect(() => {
    if (!isInitialized.current && initialData) {
      setName(initialData.name || '');
      setSelectedDepartment(initialData.department || '');
      setSelectedDesignation(initialData.designation || '');
      setselectedsenior(initialData.senior || '');
      setEmployeeType(initialData.employeeType || '');
      setAvatar(initialData.avatar || null);
      isInitialized.current = true;
    }
  }, [initialData]);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const deptRes = await axios.get(
          'https://project.pisofterp.com/realestate/restworld/departments'
        );
        setDepartments(deptRes.data);
      } catch (error) {
        console.error('Dropdown fetch failed:', error);
        Alert.alert('Error', 'Could not load departments.');
      }
    };

    fetchDepartments();
  }, []);

  const getDesignationByDepartmentId = async (departmentId: number) => {
    try {
      const desgRes = await axios.get(
        `https://project.pisofterp.com/realestate/restworld/getDesignationByDepartmentId/${departmentId}`
      );
      console.log(desgRes.data)
      setDesignations(desgRes.data);
    } catch (error) {
      console.error('Designation fetch failed:', error);
      Alert.alert('Error', 'Could not load designations.');
    }
  };
  const getseniorsId = async (designationId: number) => {
    try {
      const seniorRes = await axios.get(
        `https://project.pisofterp.com/realestate/restworld/seniors/${designationId}`
      );
       console.log(seniorRes.data)
      setseniors(seniorRes.data);
    } catch (error) {
      console.error('Designation fetch failed:', error);
      Alert.alert('Error', 'Could not load designations.');
    }
  };

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

    const form = {
      name,
      department: selectedDepartment,
      departmentId: selectedDepartmentId,
      designation: selectedDesignation,
      seniors:selectedsenior,
      designationId: selectedDesignationId,
      seniorId: selectedseniorid,
      employeeType,
      avatar,
    };
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
      <View style={styles.picker}>
        <Picker
          selectedValue={selectedDepartment}
          onValueChange={(value) => {
            setSelectedDepartment(value);
            setSelectedDesignation('');
            setSelectedDesignationId('');
            if(value === ""){
                  setSelectedDepartment("");
                  setSelectedDesignation("")
                  setDesignations([]);
                  return;
                }
            const dept = departments.find((d) => d.department === value);
            if (dept) {
              setSelectedDepartmentId(dept.id);
              getDesignationByDepartmentId(dept.id);
            } else {
              setDesignations([]);
            }
          }}
        >
          <Picker.Item label="Select Department" value="" />
          {departments.map((dept) => (
            <Picker.Item
              key={dept.id}
              label={dept.department}
              value={dept.department}
            />
          ))}
        </Picker>
      </View>





      {selectedDepartment !== '' && (
        <>
          <Text style={styles.label}>Designation</Text>
          <View style={styles.picker}>
            <Picker
              selectedValue={selectedDesignationId}
              onValueChange={(value) => {
                setSelectedDesignationId(value);
                 setselectedsenior('');
                setselectedseniorid('');
                if(value === ""){
                  setSelectedDesignation("");
                  setseniors([]);
                  return;
                }
                const desg = designations.find((d) => d.id === value);
                if (desg) setSelectedDesignation(desg.name);
                getseniorsId(desg.id);
              
              }}
            >
              <Picker.Item label="Select Designation" value="" />
              {designations.map((desg) => (
                <Picker.Item key={desg.id} label={desg.name} value={desg.id} />
              ))}
            </Picker>
          </View>
        </>
      )}


     {selectedDesignation !== '' && (
      <>
      <Text style={styles.label}>Senior Asigned</Text>
      <View style={styles.picker}>
        <Picker
          selectedValue={selectedseniorid}
          onValueChange={(value) => {
            setselectedseniorid(value);
           
            const sen = seniors.find((s) => s.employeeId === value);
            if (sen) {
              setselectedsenior(sen.senior);
            }
          }}
        >
          <Picker.Item label="Senior Asigned" value="" />
          {seniors.map((sen) => (
            <Picker.Item
              key={sen.employeeId}
              label={sen.senior}
              value={sen.employeeId}
            />
          ))}
        </Picker>
      </View>
      </>
       )}


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
    borderColor: 'gray',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    height: 50,
  },
  picker: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    marginBottom: 16,
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
