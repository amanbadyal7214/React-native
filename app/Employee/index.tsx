import React, { useState, useEffect } from 'react';
import {
  View, Text, FlatList, TextInput, StyleSheet, TouchableOpacity,
  Image, Alert
} from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import axios from 'axios';
import EmployeeDetailModal from '../../Components/EmployeeDetailModal';

type Employee = {
  id: number;
  name: string;
  avatar?: string;
  department: string;
  designation: string;
  employee: string;
  email: string;
  phone: number;
  Gender: string;
  Category: string;
  Age: number;
  spouse: string;
  child: string;
  education: string;
  Experience: string;
  Address: string;
  Pincode: number;
};

export default function ViewEmployeesScreen() {
  const [search, setSearch] = useState('');
  const [imageVisible, setImageVisible] = useState(false);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  const loadEmployees = async () => {
    try {
      const response = await axios.get('https://project.pisofterp.com/pipl/restworld/employees');
      const rawData = response.data;

      const transformed = rawData.map((emp: any): Employee => ({
        id: emp.id,
        name: emp.employeeName,
        avatar: emp.employeePic ? `data:image/jpeg;base64,${emp.employeePic}` : undefined,
        department: emp.department || '',
        designation: emp.designation || '',
        employee: emp.employee || '',
        email: emp.email || '',
        phone: emp.phone || '',
        Gender: emp.gender || '',
        Category: emp.category || '',
        Age: emp.age || 0,
        spouse: emp.spouse || '',
        child: emp.child || '',
        education: emp.education || '',
        Experience: emp.experience || '',
        Address: emp.address || '',
        Pincode: emp.pincode || '',
      }));

      setEmployees(transformed);
    } catch (err) {
      console.error('Load error:', err);
      Alert.alert('Error', 'Could not load employee data.');
    }
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  const filtered = employees.filter((emp) =>
    emp.name?.toLowerCase().includes(search.toLowerCase()) ||
    emp.department?.toLowerCase().includes(search.toLowerCase())
  );

  const renderItem = ({ item, index }: { item: Employee; index: number }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => {
        setSelectedEmployee(item);
        setModalVisible(true);
      }}
    >
      <Text style={styles.Number}>{index + 1}</Text>
      {item.avatar ? (
        <Image source={{ uri: item.avatar }} style={styles.Image} />
      ) : (
        <FontAwesome name="user-circle" size={32} color="#ccc" style={styles.Image} />
      )}
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.department}>{item.department}</Text>
      </View>
      <FontAwesome name="edit" size={18} color="green" style={styles.iconButton} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>View</Text>
      <Text style={{ color: 'green', fontSize: 30 }}>Employees</Text>
      <Text style={{ fontSize: 8, marginLeft: 10 }}>
        Search for the employee in the Search Bar!
      </Text>

      <View style={styles.search}>
        <Ionicons name="search" size={20} style={{ color: 'green' }} />
        <TextInput
          placeholder="Search by name, department..."
          value={search}
          onChangeText={setSearch}
          style={{ flex: 1, marginLeft: 10 }}
        />
      </View>

      {filtered.length === 0 ? (
        <Text style={{ textAlign: 'center', marginTop: 20, color: 'gray' }}>
          No employees found
        </Text>
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
      )}

      <EmployeeDetailModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        employee={selectedEmployee}
        imageVisible={imageVisible}
        setImageVisible={setImageVisible}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingTop: 10, paddingHorizontal: 20, flex: 1, backgroundColor: 'white' },
  header: { fontSize: 30 },
  search: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFA',
    padding: 10,
    borderRadius: 15,
    marginVertical: 15,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#ddd',
    borderBottomWidth: 0.5,
    paddingVertical: 12,
  },
  Number: { width: 20, textAlign: 'center', color: '#888' },
  Image: { width: 35, height: 35, borderRadius: 20, marginLeft: 30 },
  info: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  name: { fontWeight: '600', fontSize: 16 },
  department: { fontSize: 12, color: 'green' },
  iconButton: { padding: 6, marginRight: 10 },
});
