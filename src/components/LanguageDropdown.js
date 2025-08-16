import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, FlatList, Animated } from 'react-native';
import { theme } from '../theme';

const LanguageDropdown = ({ value, onSelect, placeholder = "Your preferred language" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(-20)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  
  const languages = [
    { id: 1, label: 'English', value: 'en' },
    { id: 2, label: 'Hindi', value: 'hi' },
    { id: 3, label: 'Tamil', value: 'ta' },
    { id: 4, label: 'Telugu', value: 'te' },
    { id: 5, label: 'Bengali', value: 'bn' },
  ];

  const selectedLanguage = languages.find(lang => lang.value === value);

  const openModal = () => {
    setIsVisible(true);
  };

  const closeModal = () => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: -20,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setIsVisible(false);
    });
  };

  const selectLanguage = (langValue) => {
    onSelect(langValue);
    closeModal();
  };

  useEffect(() => {
    if (isVisible) {
      slideAnim.setValue(-20);
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
  }, [isVisible]);

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.dropdown}
        onPress={openModal}
      >
        <Text style={[
          styles.dropdownText,
          !selectedLanguage && styles.placeholderText
        ]}>
          {selectedLanguage ? selectedLanguage.label : placeholder}
        </Text>
        <Text style={styles.arrow}>▼</Text>
      </TouchableOpacity>

      <Modal
        visible={isVisible}
        transparent
        animationType="none"
        onRequestClose={closeModal}
      >
        <TouchableOpacity 
          style={styles.overlay}
          onPress={closeModal}
        >
          <Animated.View style={[styles.modal, {
            opacity: opacityAnim,
            transform: [{ translateY: slideAnim }]
          }]}>
            <FlatList
              data={languages}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.option}
                  onPress={() => selectLanguage(item.value)}
                >
                  <Text style={styles.optionText}>{item.label}</Text>
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
  },
  dropdownText: {
    fontSize: 16,
    color: theme.colors.gray800,
  },
  placeholderText: {
    color: theme.colors.gray400,
  },
  arrow: {
    fontSize: 12,
    color: theme.colors.gray400,
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
    width: '80%',
    maxHeight: 300,
  },
  option: {
    padding: theme.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray100,
  },
  optionText: {
    fontSize: 16,
    color: theme.colors.gray800,
  },
});

export default LanguageDropdown;