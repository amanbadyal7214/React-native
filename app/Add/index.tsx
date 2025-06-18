// app/employee/index.tsx
import React, { useState } from 'react';
import { View, Alert, ScrollView } from 'react-native';
import StepOne from '../../Components/Steps/StepOne';
import StepTwo from '../../Components/Steps/StepTwo';
import StepThree from '../../Components/Steps/StepThree';
import AsyncStorage from '@react-native-async-storage/async-storage';
import StepIndicator from '../../Components/StepIndicator'; 

export default function EmployeeForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<any>({});

  const handleNext = (data: any) => {
    setFormData((prev: any) => ({ ...prev, ...data }));
    setStep((prev) => prev + 1);
  };

  const handleBack = () => setStep((prev) => prev - 1);

  const handleSubmit = async (finalData: any) => {
    const employee = {
      id: Date.now(),
      name: formData.name || 'N/A',
      department: formData.Department || 'N/A',
      designation: formData.Designation || 'N/A',
      employee: formData.Employee || 'N/A',
      email: formData.email || 'N/A',
      phone: Number(formData.mobile) || 0,
      Gender: formData.gender || 'N/A',
      Category: formData.category,
      Age: formData.age || "N/A",
      spouse: formData.spouse || 'N/A',
      child: formData.child || 'N/A',
      education: formData.education || 'N/A',
      Experience: formData.Experience || 'N/A',
      Address: finalData.address || 'N/A',
      Pincode: Number(finalData.pincode),
      avatar: '',
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
    <ScrollView style={{ flex: 1, padding: 16, backgroundColor: "white" }}>
      <StepIndicator step={step} /> {/* ✅ Inserted here */}
      {step === 1 && <StepOne onNext={handleNext} />}
      {step === 2 && <StepTwo onNext={handleNext} onBack={handleBack} />}
      {step === 3 && (
        <StepThree
          onBack={handleBack}
          onSubmit={(data: any) => handleSubmit(data)}
          formData={formData}
        />
      )}
    </ScrollView>
  );
}