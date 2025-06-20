
import React, { useEffect, useState } from 'react';
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
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';

export default function StepThree({ onBack, onSubmit, formData }: any) {
  const [address, setAddress] = useState('');
  const [pincode, setPincode] = useState('');
  const [spouse, setSpouse] = useState('');

  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedCountryId, setSelectedCountryId] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedStateId, setSelectedStateId] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedDistrictId, setSelectedDistrictId] = useState('');

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);

  // Fetch countries on mount
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(
          'https://project.pisofterp.com/realestate/restworld/countries'
        );
        setCountries(response.data);
      } catch (error) {
        console.error('Error fetching countries:', error);
        Alert.alert('Error', 'Could not load countries.');
      }
    };

    fetchCountries();
  }, []);

  // Fetch states by country ID
  const fetchStatesByCountry = async (countryId: number) => {
    try {
      const response = await axios.get(
        `https://project.pisofterp.com/realestate/restworld/getStatesByCountryId/${countryId}`
      );
      setStates(response.data);
    } catch (error) {
      console.error('Error fetching states:', error);
      Alert.alert('Error', 'Could not load states.');
    }
  };

  // Fetch districts by state ID
  const fetchDistrictsByState = async (stateId: number) => {
    try {
      const response = await axios.get(
        `https://project.pisofterp.com/realestate/restworld/getDistrictByStateId/${stateId}`
      );
      setDistricts(response.data);
    } catch (error) {
      console.error('Error fetching districts:', error);
      Alert.alert('Error', 'Could not load districts.');
    }
  };

  const handleSubmit = () => {
    if (!address.trim() || !pincode.trim()) {
      Alert.alert('Validation Error', 'Address and Pincode are required.');
      return;
    }

    const updatedForm = {
      ...formData,
      spouse,
      address,
      pincode,
      country: selectedCountry,
      countryId: selectedCountryId,
      state: selectedState,
      stateId: selectedStateId,
      district: selectedDistrict,
      districtId: selectedDistrictId,
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

      <Text style={styles.label}>Country</Text>
      <View style={styles.picker}>
        <Picker
          selectedValue={selectedCountry}
          onValueChange={(value) => {
            setSelectedCountry(value);
            setSelectedState('');
            setSelectedStateId('');
            
            const countryObj = countries.find((c) => c.country === value);
            if (countryObj) {
              setSelectedCountryId(countryObj.id);
              fetchStatesByCountry(countryObj.id);
            } else {
              setStates([]);
              setDistricts([]);
            }
          }}
        >
          <Picker.Item label="Select Country" value="" />
          {countries.map((c) => (
            <Picker.Item key={c.id} label={c.country} value={c.country} />
          ))}
        </Picker>
      </View>

      {selectedCountry !== '' && (
        <>
          <Text style={styles.label}>State</Text>
          <View style={styles.picker}>
            <Picker
              selectedValue={selectedStateId}
              onValueChange={(value) => {
                setSelectedStateId(value);
                setSelectedDistrict('');
                setSelectedDistrictId('');
                const stateObj = states.find((s) => s.id === value);
                if (stateObj) {
                  setSelectedState(stateObj.state);
                  fetchDistrictsByState(stateObj.id);
                }
              }}
            >
              <Picker.Item label="Select State" value="" />
              {states.map((s) => (
                <Picker.Item key={s.id} label={s.state} value={s.id} />
              ))}
            </Picker>
          </View>
        </>
      )}

      {selectedStateId !== '' && (
        <>
          <Text style={styles.label}>District</Text>
          <View style={styles.picker}>
            <Picker
              selectedValue={selectedDistrictId}
              onValueChange={(value) => {
                setSelectedDistrictId(value);
                const districtObj = districts.find((d) => d.id === value);
                if (districtObj) {
                  setSelectedDistrict(districtObj.district);
                }
              }}
            >
              <Picker.Item label="Select District" value="" />
              {districts.map((d) => (
                <Picker.Item key={d.id} label={d.district} value={d.id} />
              ))}
            </Picker>
          </View>
        </>
      )}

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
  picker: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    marginBottom: 16,
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