import React, { useState } from 'react';
import { View, Alert, ScrollView, StyleSheet } from 'react-native';
import StepOne from '../Components/Steps/StepOne';
import StepTwo from '../Components/Steps/StepTwo';
import StepThree from '../Components/Steps/StepThree';
import AsyncStorage from '@react-native-async-storage/async-storage';
import StepIndicator from '../Components/StepIndicator';

export default function EmployeeForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<any>({});

  const handleNext = (data: any) => {
    setFormData((prev: any) => ({ ...prev, ...data }));
    setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (finalStepData: any) => {
    const finalData = { ...formData, ...finalStepData };

    const employee = {
      id: Date.now(),
      name: finalData.name || 'N/A',
      department: finalData.department || 'N/A',
      designation: finalData.designation || 'N/A',
      employeeType: finalData.employeeType || 'N/A',
      email: finalData.email || 'N/A',
      phone: Number(finalData.mobile) || 0,
      gender: finalData.gender || 'N/A',
      category: finalData.category || 'N/A',
      age: finalData.age || 'N/A',
      spouse: finalData.spouse || 'N/A',
      child: finalData.child || 'N/A',
      education: finalData.education || 'N/A',
      experience: finalData.experience || 'N/A',
      address: finalData.address || 'N/A',
      pincode: Number(finalData.pincode) || 0,
      avatar: finalData.avatar || '',
    };

    try {
      const existing = await AsyncStorage.getItem('@employee_list');
      const list = existing ? JSON.parse(existing) : [];
      list.push(employee);
      await AsyncStorage.setItem('@employee_list', JSON.stringify(list));

      Alert.alert('Success', 'Employee added successfully');
      setFormData({});
      setStep(1);
    } catch (err) {
      Alert.alert('Error', 'Failed to save employee data');
    }
  };

  return (
    <ScrollView style={{ flex: 1, padding: 16, backgroundColor: 'white' }}>
      <StepIndicator step={step} />

      {/* All steps stay mounted but only one is visible */}
      <View style={styles.stepContainer}>
        <View style={[styles.step, step !== 1 && styles.hidden]}>
          <StepOne
            onNext={handleNext}
            onBack={handleBack}
            initialData={formData}
          />
        </View>

        <View style={[styles.step, step !== 2 && styles.hidden]}>
          <StepTwo
            onNext={handleNext}
            onBack={handleBack}
            initialData={formData}
          />
        </View>

        <View style={[styles.step, step !== 3 && styles.hidden]}>
          <StepThree
            onSubmit={handleSubmit}
            onBack={handleBack}
            initialData={formData}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  stepContainer: {
    flex: 1,
    minHeight: 600,
  },
  step: {
    flex: 1,
  },
  hidden: {
    display: 'none',
  },
});
