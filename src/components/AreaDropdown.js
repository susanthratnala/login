import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Modal, Animated } from 'react-native';
import { theme } from '../theme';

const AreaDropdown = ({ selectedArea, onAreaSelect }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchText, setSearchText] = useState('');
  const slideAnim = useRef(new Animated.Value(50)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  const areas = [
    'Dwaraka Nagar',
    'MVP Colony',
    'Gajuwaka',
    'Seethammadhara',
    'Patamata',
    'Siripuram',
    'Madhurawada',
    'Beach Road'
  ];

  const filteredAreas = areas.filter(area =>
    area.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleAreaSelect = (area) => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 50,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onAreaSelect(area);
      setShowDropdown(false);
      setSearchText('');
    });
  };

  const closeDropdown = () => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 50,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setShowDropdown(false);
      setSearchText('');
    });
  };

  useEffect(() => {
    if (showDropdown) {
      slideAnim.setValue(50);
      opacityAnim.setValue(0);
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [showDropdown]);

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.dropdown}
        onPress={() => setShowDropdown(true)}
      >
        <Text style={[styles.dropdownText, selectedArea && styles.selectedText]}>
          {selectedArea || 'Select Area'}
        </Text>
        <Text style={styles.arrow}>▼</Text>
      </TouchableOpacity>

      <Modal
        visible={showDropdown}
        transparent={true}
        animationType="none"
        onRequestClose={closeDropdown}
      >
        <TouchableOpacity 
          style={styles.overlay}
          onPress={closeDropdown}
        >
          <Animated.View style={[styles.modalContent, {
            opacity: opacityAnim,
            transform: [{ translateY: slideAnim }]
          }]}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search area..."
              value={searchText}
              onChangeText={setSearchText}
            />
            <FlatList
              data={filteredAreas}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.areaItem}
                  onPress={() => handleAreaSelect(item)}
                >
                  <Text style={styles.areaText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </Animated.View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: theme.spacing.md,
    width: '100%',
  },
  dropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.gray200,
    borderRadius: 25,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.lg,
    backgroundColor: theme.colors.white,
    minHeight: 56,
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
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.gray400,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: theme.colors.white,
    borderRadius: 12,
    padding: theme.spacing.lg,
    width: '80%',
    maxHeight: '60%',
  },
  searchInput: {
    borderWidth: 1,
    borderColor: theme.colors.gray300,
    borderRadius: 8,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    marginBottom: theme.spacing.md,
    fontSize: theme.typography.fontSize.base,
  },
  areaItem: {
    paddingVertical: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray200,
  },
  areaText: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.gray800,
  },
});

export default AreaDropdown;