import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';

export default function GeneralDetails({ onBack, onNext, formData }: any) {
  const [form, setForm] = useState({
    mobile: '',
    email: '',
    gender: '',
    nationality: '',
    category: '',
    officialEmail: '',
    officialMobile: '',
    salary: '',
    motherTongue: '',
    dob: new Date(),
  });
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    if (formData) {
      setForm({
        mobile: formData.mobile || '',
        email: formData.email || '',
        gender: formData.gender || '',
        nationality: formData.nationality || '',
        category: formData.category || '',
        officialEmail: formData.officialEmail || '',
        officialMobile: formData.officialMobile || '',
        salary: formData.salary || '',
        motherTongue: formData.motherTongue || '',
        dob: formData.dob ? new Date(formData.dob) : new Date(),
      });
    }
  }, [formData]);

  const handleChange = (key: string, value: any) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>General <Text style={{ color: 'green' }}>Details</Text></Text>
      <Text style={styles.subtitle}>Fill out the General Details below</Text>

      <View style={styles.row}>
        <View style={styles.up}>
          <Text style={styles.label}>Mobile *</Text>
          <TextInput
            style={styles.input}
            placeholder="Mobile"
            keyboardType="phone-pad"
            value={form.mobile}
            onChangeText={(val) => handleChange('mobile', val)}
          />
        </View>
        <View style={styles.up}>
          <Text style={styles.label}>Email *</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            value={form.email}
            onChangeText={(val) => handleChange('email', val)}
          />
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.up}>
          <Text style={styles.label}>Gender</Text>
          <View style={styles.bg}>
            <Picker
              selectedValue={form.gender}
              onValueChange={(val) => handleChange('gender', val)}
              style={styles.picker}
            >
              <Picker.Item label="Select Gender" value="" />
              <Picker.Item label="Male" value="male" />
              <Picker.Item label="Female" value="female" />
              <Picker.Item label="Other" value="other" />
            </Picker>
          </View>
        </View>
        <View style={styles.up}>
          <Text style={styles.label}>Nationality</Text>
          <View style={styles.bg}>
            <Picker
              selectedValue={form.nationality}
              onValueChange={(val) => handleChange('nationality', val)}
              style={styles.picker}
            >
              <Picker.Item label="Select Nationality" value="" />
              <Picker.Item label="Indian" value="indian" />
              <Picker.Item label="Other" value="other" />
            </Picker>
          </View>
        </View>
      </View>

      <Text style={styles.label}>Category</Text>
      <View style={styles.bg}>
        <Picker
          selectedValue={form.category}
          onValueChange={(val) => handleChange('category', val)}
          style={styles.picker}
        >
          <Picker.Item label="Select Category" value="" />
          <Picker.Item label="General" value="general" />
          <Picker.Item label="OBC" value="obc" />
          <Picker.Item label="SC/ST" value="scst" />
        </Picker>
      </View>

      <Text style={styles.label}>Official Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Official Email"
        value={form.officialEmail}
        onChangeText={(val) => handleChange('officialEmail', val)}
      />

      <Text style={styles.label}>Official Mobile</Text>
      <TextInput
        style={styles.input}
        placeholder="Official Mobile"
        keyboardType="phone-pad"
        value={form.officialMobile}
        onChangeText={(val) => handleChange('officialMobile', val)}
      />

      <Text style={styles.label}>Salary</Text>
      <TextInput
        style={styles.input}
        placeholder="Salary"
        keyboardType="numeric"
        value={form.salary}
        onChangeText={(val) => handleChange('salary', val)}
      />

      <View style={styles.row}>
        <View style={styles.up}>
          <Text style={styles.label}>Mother Tongue</Text>
          <TextInput
            style={styles.input}
            placeholder="Mother Tongue"
            value={form.motherTongue}
            onChangeText={(val) => handleChange('motherTongue', val)}
          />
        </View>

        <View style={styles.up}>
          <Text style={styles.label}>DOB</Text>
          <TouchableOpacity
            style={styles.dateInput}
            onPress={() => setShowDatePicker(true)}
          >
            <Text>{form.dob.toDateString()}</Text>
          </TouchableOpacity>
        </View>
      </View>

      {showDatePicker && (
        <DateTimePicker
          mode="date"
          value={form.dob}
          display="default"
          onChange={(event: any, date?: Date) => {
            setShowDatePicker(false);
            if (date) handleChange('dob', date);
          }}
        />
      )}

      <View style={styles.navContainer}>
        <TouchableOpacity style={styles.navButton} onPress={onBack}>
          <Ionicons name="arrow-back-circle" size={50} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => onNext(form)}>
          <Ionicons name="arrow-forward-circle" size={50} color="black" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#fff', paddingBottom: 50 },
  title: { fontSize: 24, fontWeight: 'bold', },
  subtitle: { fontSize: 14, color: 'black', marginBottom: 20 },
  label: { marginVertical: 7, color: 'green', fontWeight: '500' },
  input: {
    borderWidth: 1, borderColor: 'gray', borderRadius: 6,
    padding: 10, marginBottom: 5, height: 45,
  },
  picker: {
    height: 55,
    color: 'gray',
  },
  dateInput: {
    borderWidth: 1, borderColor: 'gray', borderRadius: 6,
    padding: 12, justifyContent: 'center', marginBottom: 5, height: 45,
  },
  up: {
    flex: 1,
  },
  bg: {
    borderWidth: 1, borderColor: 'gray', borderRadius: 6,
    backgroundColor: 'white', marginBottom: 10, overflow: 'hidden',
  },
  row: {
    flexDirection: 'row', gap: 12,
  },
  navContainer: {
    flexDirection: 'row', justifyContent: 'space-between', marginTop: 30
  },
  navButton: {
    padding: 10,
  }
});
