import React, { useState, useEffect } from 'react';
import {
  View, Text, FlatList, TextInput, StyleSheet, TouchableOpacity,
  Image, Modal
} from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import list from '../../assets/list.json';

type Employee = {
  id: number;
  name: string;
  department: string;
  avatar?: string;
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
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  useEffect(() => {
    const loadEmployees = async () => {
      try {
        const json = await AsyncStorage.getItem('@employee_list');
        const stored: Employee[] = json ? JSON.parse(json) : [];
        const merged = [...list, ...stored]; // Combine dummy + saved
        setEmployees(merged);
      } catch (err) {
        console.error('Failed to load employees:', err);
        setEmployees(list); // fallback
      }
    };

    loadEmployees();
  }, []);

  const filtered = employees.filter((emp) =>
    emp.name.toLowerCase().includes(search.toLowerCase()) ||
    emp.department.toLowerCase().includes(search.toLowerCase())
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
      <TouchableOpacity style={styles.editButton}>
        <FontAwesome name="edit" size={18} color="green" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.header}>View</Text>
        <Text style={{ color: 'green', fontSize: 30 }}> Employees </Text>
      </View>

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

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedEmployee && (
              <>
                <View style={styles.img}>
                  {selectedEmployee.avatar ? (
                    <Image source={{ uri: selectedEmployee.avatar }} style={styles.modalAvatar} />
                  ) : (
                    <FontAwesome name="user-circle" size={60} color="#ccc" />
                  )}
                  <Text style={styles.Name}>{selectedEmployee.name}</Text>
                </View>
                {[
                  ['Department', selectedEmployee.department],
                  ['Designation', selectedEmployee.designation],
                  ['Employee', selectedEmployee.employee],
                  ['Email', selectedEmployee.email],
                  ['Phone', selectedEmployee.phone],
                  ['Gender', selectedEmployee.Gender],
                  ['Category', selectedEmployee.Category],
                  ['Age', selectedEmployee.Age],
                  ['Spouse', selectedEmployee.spouse],
                  ['Child', selectedEmployee.child],
                  ['Education', selectedEmployee.education],
                  ['Experience', selectedEmployee.Experience],
                  ['Address', selectedEmployee.Address],
                  ['Pincode', selectedEmployee.Pincode],
                ].map(([label, value], i) => (
                  <View style={styles.rowBetween} key={i}>
                    <Text style={styles.modalText}>{label}:</Text>
                    <Text style={styles.modalRed}>{value}</Text>
                  </View>
                ))}
              </>
            )}
            <View style={styles.center}>
              <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
                <Text style={{ color: 'white' }}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  Number: {
     width: 20,
     textAlign: 'center',
      color: '#888'
     },
  img: {
     justifyContent: 'center', 
     alignItems: 'center' 
    },
  Image: {
     width: 35,
      height: 35,
       borderRadius: 20,
        marginLeft: 30 
      },
  info: { flex: 1,
     alignItems: 'center',
      justifyContent: 'center'
     },
  name: { 
    fontWeight: '600',
     fontSize: 16 
    },
  department: {
     fontSize: 12,
      color: 'green'
     },
  editButton: { 
    padding: 6 
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  center: { justifyContent: 'center', alignItems: 'center' },
  Name: { marginBottom: 40 },
  modalContent: {
    width: 300,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
    elevation: 10,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 2,
  },
  modalText: {
    fontSize: 14,
    marginVertical: 4,
    color: 'gray',
    flex: 1,
  },
  modalRed: {
    fontSize: 14,
    flex: 1,
    textAlign: 'right',
    color: 'gray',
  },
  modalAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginVertical: 10,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: 'green',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 10,
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

