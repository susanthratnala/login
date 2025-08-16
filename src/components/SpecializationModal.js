import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, Modal } from 'react-native';
import { theme } from '../theme';

const categories = {
  'General Medicine': ['Family Medicine', 'Internal Medicine', 'General Practice'],
  'Pediatrics': ['Child Health', 'Neonatology', 'Pediatric Surgery'],
  'Dermatology': ['Skin Care', 'Cosmetic Dermatology', 'Dermatopathology'],
  'Cardiology': ['Heart Surgery', 'Interventional Cardiology', 'Electrophysiology'],
  'Orthopedics': ['Joint Replacement', 'Sports Medicine', 'Spine Surgery'],
  'Gynecology': ['Obstetrics', 'Reproductive Health', 'Gynecologic Surgery']
};

const SpecializationModal = ({ visible, onClose, onSubmit }) => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState('');
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showSpecializationDropdown, setShowSpecializationDropdown] = useState(false);

  const availableSpecializations = useMemo(() => {
    return categories[selectedCategory] || [];
  }, [selectedCategory]);

  const handleSubmit = () => {
    if (!selectedCategory || !selectedSpecialization) {
      Alert.alert('Error', 'Please select both fields');
      return;
    }
    onSubmit({ category: selectedCategory, specialization: selectedSpecialization });
    setSelectedCategory('');
    setSelectedSpecialization('');
  };

  const handleCancel = () => {
    setSelectedCategory('');
    setSelectedSpecialization('');
    onClose();
  };

  return (
    <Modal 
      visible={visible} 
      transparent
      animationType="slide"
      onRequestClose={handleCancel}
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>Add Specialization</Text>
          
          <View style={styles.dropdownContainer}>
            <Text style={styles.label}>Service Category</Text>
            <TouchableOpacity 
              style={styles.dropdown}
              onPress={() => setShowCategoryDropdown(!showCategoryDropdown)}
            >
              <Text style={[styles.dropdownText, selectedCategory && styles.selectedText]}>
                {selectedCategory || 'Select Category'}
              </Text>
              <Text style={styles.arrow}>▼</Text>
            </TouchableOpacity>
            
            {showCategoryDropdown && (
              <ScrollView style={styles.dropdownList} keyboardShouldPersistTaps="handled">
                {Object.keys(categories).map((category) => (
                  <TouchableOpacity
                    key={category}
                    style={styles.dropdownItem}
                    onPress={() => {
                      setSelectedCategory(category);
                      setSelectedSpecialization('');
                      setShowCategoryDropdown(false);
                    }}
                  >
                    <Text style={styles.dropdownItemText}>{category}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            )}
          </View>

          {selectedCategory && (
            <View style={styles.dropdownContainer}>
              <Text style={styles.label}>Specialization</Text>
              <TouchableOpacity 
                style={styles.dropdown}
                onPress={() => setShowSpecializationDropdown(!showSpecializationDropdown)}
              >
                <Text style={[styles.dropdownText, selectedSpecialization && styles.selectedText]}>
                  {selectedSpecialization || 'Select Specialization'}
                </Text>
                <Text style={styles.arrow}>▼</Text>
              </TouchableOpacity>
              
              {showSpecializationDropdown && (
                <ScrollView style={styles.dropdownList} keyboardShouldPersistTaps="handled">
                  {availableSpecializations.map((spec) => (
                    <TouchableOpacity
                      key={spec}
                      style={styles.dropdownItem}
                      onPress={() => {
                        setSelectedSpecialization(spec);
                        setShowSpecializationDropdown(false);
                      }}
                    >
                      <Text style={styles.dropdownItemText}>{spec}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              )}
            </View>
          )}

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={handleCancel}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.submitButton]}
              onPress={handleSubmit}
            >
              <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: theme.colors.white,
    borderRadius: 16,
    padding: theme.spacing.xl,
    width: '90%',
    maxHeight: '80%',
  },
  title: {
    fontSize: theme.typography.fontSize.xl,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.gray800,
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
  },
  dropdownContainer: {
    marginBottom: theme.spacing.lg,
  },
  label: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.gray700,
    marginBottom: theme.spacing.sm,
  },
  dropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: theme.colors.gray300,
    borderRadius: 12,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.lg,
    backgroundColor: theme.colors.white,
  },
  dropdownText: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.gray400,
  },
  selectedText: {
    color: theme.colors.gray800,
    fontWeight: theme.typography.fontWeight.medium,
  },
  arrow: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.gray500,
  },
  dropdownList: {
    maxHeight: 150,
    borderWidth: 1,
    borderColor: theme.colors.gray300,
    borderRadius: 8,
    backgroundColor: theme.colors.white,
    marginTop: theme.spacing.xs,
  },
  dropdownItem: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray200,
  },
  dropdownItemText: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.gray700,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: theme.spacing.xl,
  },
  button: {
    flex: 1,
    marginHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.lg,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButton: {
    backgroundColor: theme.colors.white,
    borderWidth: 1,
    borderColor: theme.colors.primary,
  },
  submitButton: {
    backgroundColor: theme.colors.primary,
  },
  cancelButtonText: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.primary,
  },
  submitButtonText: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.white,
  },
});

export default SpecializationModal;