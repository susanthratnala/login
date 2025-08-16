import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, FlatList } from 'react-native';
import { theme } from '../theme';

const SpecializationSelector = ({ selectedSpecializations = [], onSelectionChange }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState('');
  
  const serviceCategories = {
    'General Medicine': ['Family Medicine', 'Internal Medicine', 'Emergency Medicine'],
    'Pediatrics': ['General Pediatrics', 'Pediatric Cardiology', 'Pediatric Neurology', 'Neonatology'],
    'Dermatology': ['General Dermatology', 'Cosmetic Dermatology', 'Dermatopathology'],
    'Cardiology': ['Interventional Cardiology', 'Electrophysiology', 'Heart Failure', 'Preventive Cardiology'],
    'Surgery': ['General Surgery', 'Cardiac Surgery', 'Neurosurgery', 'Orthopedic Surgery'],
    'Gynecology': ['Obstetrics', 'Reproductive Endocrinology', 'Gynecologic Oncology'],
    'Neurology': ['General Neurology', 'Stroke Medicine', 'Epilepsy', 'Movement Disorders'],
    'Orthopedics': ['Joint Replacement', 'Sports Medicine', 'Spine Surgery', 'Trauma Surgery']
  };

  const handleSubmit = () => {
    if (selectedCategory && selectedSpecialization) {
      const newSpec = `${selectedCategory} - ${selectedSpecialization}`;
      if (!selectedSpecializations.includes(newSpec)) {
        onSelectionChange([...selectedSpecializations, newSpec]);
      }
      setSelectedCategory('');
      setSelectedSpecialization('');
      setIsVisible(false);
    }
  };

  const handleCancel = () => {
    setSelectedCategory('');
    setSelectedSpecialization('');
    setIsVisible(false);
  };

  const removeSpecialization = (spec) => {
    const newSelection = selectedSpecializations.filter(s => s !== spec);
    onSelectionChange(newSelection);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.selector}
        onPress={() => setIsVisible(true)}
      >
        <Text style={styles.selectorText}>Add Specialization</Text>
        <Text style={styles.plusIcon}>+</Text>
      </TouchableOpacity>

      {selectedSpecializations.map((spec, index) => (
        <View key={index} style={styles.selectedItem}>
          <Text style={styles.selectedText}>{spec}</Text>
          <TouchableOpacity onPress={() => removeSpecialization(spec)}>
            <Text style={styles.removeIcon}>×</Text>
          </TouchableOpacity>
        </View>
      ))}

      <Modal
        visible={isVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setIsVisible(false)}
      >
        <View style={styles.overlay}>
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>Add Specialization</Text>
            
            {/* Service Category Dropdown */}
            <Text style={styles.dropdownLabel}>Service Category</Text>
            <TouchableOpacity 
              style={styles.dropdown}
              onPress={() => {}}
            >
              <Text style={[styles.dropdownText, !selectedCategory && styles.placeholderText]}>
                {selectedCategory || 'Select Service Category'}
              </Text>
              <Text style={styles.arrow}>▼</Text>
            </TouchableOpacity>
            
            <FlatList
              data={Object.keys(serviceCategories)}
              keyExtractor={(item) => item}
              style={styles.categoryList}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[styles.option, selectedCategory === item && styles.selectedOption]}
                  onPress={() => {
                    setSelectedCategory(item);
                    setSelectedSpecialization('');
                  }}
                >
                  <Text style={[styles.optionText, selectedCategory === item && styles.selectedOptionText]}>
                    {item}
                  </Text>
                </TouchableOpacity>
              )}
            />
            
            {/* Specialization Dropdown */}
            {selectedCategory && (
              <>
                <Text style={styles.dropdownLabel}>Specialization</Text>
                <TouchableOpacity 
                  style={styles.dropdown}
                  onPress={() => {}}
                >
                  <Text style={[styles.dropdownText, !selectedSpecialization && styles.placeholderText]}>
                    {selectedSpecialization || 'Select Specialization'}
                  </Text>
                  <Text style={styles.arrow}>▼</Text>
                </TouchableOpacity>
                
                <FlatList
                  data={serviceCategories[selectedCategory]}
                  keyExtractor={(item) => item}
                  style={styles.specializationList}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={[styles.option, selectedSpecialization === item && styles.selectedOption]}
                      onPress={() => setSelectedSpecialization(item)}
                    >
                      <Text style={[styles.optionText, selectedSpecialization === item && styles.selectedOptionText]}>
                        {item}
                      </Text>
                    </TouchableOpacity>
                  )}
                />
              </>
            )}
            
            {/* Action Buttons */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.submitButton, (!selectedCategory || !selectedSpecialization) && styles.disabledButton]} 
                onPress={handleSubmit}
                disabled={!selectedCategory || !selectedSpecialization}
              >
                <Text style={styles.submitButtonText}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: theme.spacing.md,
    width: '100%',
  },
  selector: {
    borderWidth: 1,
    borderColor: theme.colors.gray200,
    borderRadius: 25,
    backgroundColor: theme.colors.white,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.lg,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: 56,
    marginBottom: theme.spacing.sm,
  },
  selectorText: {
    fontSize: 16,
    color: theme.colors.gray400,
  },
  plusIcon: {
    fontSize: 20,
    color: theme.colors.primary,
    fontWeight: 'bold',
  },
  selectedItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: theme.colors.primarySoft,
    borderRadius: 20,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    marginBottom: theme.spacing.xs,
  },
  selectedText: {
    fontSize: 14,
    color: theme.colors.primary,
    fontWeight: '500',
  },
  removeIcon: {
    fontSize: 18,
    color: theme.colors.primary,
    fontWeight: 'bold',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: theme.colors.white,
    borderRadius: 12,
    width: '90%',
    maxHeight: '80%',
    padding: theme.spacing.lg,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.gray800,
    textAlign: 'center',
    marginBottom: theme.spacing.lg,
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray100,
  },
  selectedOption: {
    backgroundColor: theme.colors.primarySoft,
  },
  optionText: {
    fontSize: 16,
    color: theme.colors.gray800,
  },
  selectedOptionText: {
    color: theme.colors.primary,
    fontWeight: '500',
  },
  checkmark: {
    fontSize: 16,
    color: theme.colors.primary,
    fontWeight: 'bold',
  },
  dropdownLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.gray700,
    marginBottom: theme.spacing.xs,
    marginTop: theme.spacing.md,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: theme.colors.gray200,
    borderRadius: 8,
    backgroundColor: theme.colors.white,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  dropdownText: {
    fontSize: 14,
    color: theme.colors.gray800,
  },
  placeholderText: {
    color: theme.colors.gray400,
  },
  arrow: {
    fontSize: 12,
    color: theme.colors.gray400,
  },
  categoryList: {
    maxHeight: 120,
    marginBottom: theme.spacing.sm,
  },
  specializationList: {
    maxHeight: 100,
    marginBottom: theme.spacing.lg,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: theme.spacing.md,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: theme.colors.gray200,
    borderRadius: 8,
    paddingVertical: theme.spacing.md,
    marginRight: theme.spacing.sm,
  },
  cancelButtonText: {
    color: theme.colors.gray700,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  submitButton: {
    flex: 1,
    backgroundColor: theme.colors.primary,
    borderRadius: 8,
    paddingVertical: theme.spacing.md,
    marginLeft: theme.spacing.sm,
  },
  submitButtonText: {
    color: theme.colors.white,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  disabledButton: {
    backgroundColor: theme.colors.gray300,
  },
});

export default SpecializationSelector;