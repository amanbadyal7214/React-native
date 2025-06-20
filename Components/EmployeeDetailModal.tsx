
import React from 'react';
import {
  View, Text, Modal, TouchableOpacity, Image, StyleSheet
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

type Props = {
  visible: boolean;
  onClose: () => void;
  employee: any | null;
  imageVisible: boolean;
  setImageVisible: (visible: boolean) => void;
};

const EmployeeDetailModal = ({ visible, onClose, employee, imageVisible, setImageVisible }: Props) => {
  if (!employee) return null;

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.img}>
            {employee.avatar ? (
              <TouchableOpacity onPress={() => setImageVisible(true)}>
                <Image source={{ uri: employee.avatar }} style={styles.modalAvatar} />
              </TouchableOpacity>
            ) : (
              <FontAwesome name="user-circle" size={60} color="#ccc" />
            )}
            <Text style={styles.Name}>{employee.name}</Text>
          </View>

          {[
            ['Department', employee.department],
            ['Designation', employee.designation],
            ['Employee', employee.employee],
            ['Email', employee.email],
            ['Phone', employee.phone],
            ['Gender', employee.Gender],
            ['Category', employee.Category],
            ['Age', employee.Age],
            ['Spouse', employee.spouse],
            ['Child', employee.child],
            ['Education', employee.education],
            ['Experience', employee.Experience],
            ['Address', employee.Address],
            ['Pincode', employee.Pincode],
          ].map(([label, value], i) => (
            <View style={styles.rowBetween} key={i}>
              <Text style={styles.modalText}>{label}:</Text>
              <Text style={styles.modalRed}>{String(value)}</Text>
            </View>
          ))}

          {/* Fullscreen image */}
          <Modal visible={imageVisible} transparent animationType="fade" onRequestClose={() => setImageVisible(false)}>
            <TouchableOpacity
              style={styles.full}
              onPress={() => setImageVisible(false)}
              activeOpacity={1}
            >
              {employee?.avatar && (
                <Image
                  source={{ uri: employee.avatar }}
                  style={styles.fullImage}
                  resizeMode="contain"
                />
              )}
            </TouchableOpacity>
          </Modal>

          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <TouchableOpacity
              onPress={onClose}
              style={[styles.closeButton, { backgroundColor: 'green' }]}
            >
              <Text style={{ color: 'white' }}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default EmployeeDetailModal;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: 300,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
    elevation: 10,
  },
  img: { justifyContent: 'center', alignItems: 'center' },
  Name: { marginBottom: 40, fontSize: 18, fontWeight: 'bold' },
  modalAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginVertical: 10,
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
  full: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullImage: {
    width: '100%',
    height: '100%',
  },
  closeButton: {
    marginTop: 20,
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
});
